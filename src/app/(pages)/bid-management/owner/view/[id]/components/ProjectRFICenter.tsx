import { Popups } from '@/app/(pages)/bid-management/components/Popups';
import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import { InputComponent } from '@/app/component/customInput/Input';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { TextAreaComponent } from '@/app/component/textarea';
import { IRFI } from '@/app/interfaces/rfi.interface';
import { CreateRFIData, rfiService } from '@/app/services/rfi.service';
import AwsS3 from '@/app/utils/S3Intergration';
import { SearchOutlined } from '@ant-design/icons';
import { Avatar, Radio, Skeleton, Spin } from 'antd';
import type { RcFile } from 'antd/es/upload';
import Dragger from 'antd/es/upload/Dragger';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import moment from 'moment';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

type Props = {
  projectId: string
};

const ValidationSchema = Yup.object().shape({
  description: Yup.string().required('Description is required'),
  type: Yup.string().required('Type is required'),
  file: Yup.mixed(),
});


export function ProjectRFICenter({ projectId }: Props) {
  const [rfis, setRfis] = useState<IRFI[]>([]);
  const [showRfiModal, setShowRfiModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [search, setSearch] = useState('');



  function toggleRfiModal() {
    setShowRfiModal(!showRfiModal);
  }


  useEffect(() => {
    fetchRFIs();
  }, [projectId])

  async function fetchRFIs() {
    if (projectId) {
      setIsFetching(true);
      rfiService.httpGetAllProjectRFIs(projectId)
        .then(res => {
          if (res.data) {
            setRfis(res.data.rfis);
          }
        })
        .catch(err => {
          const error = err as AxiosError<{ message: string }>;
          toast.error(error.response?.data.message || 'An error occurred');
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  }



  const rfiFormik = useFormik<Omit<CreateRFIData, "projectId">>({
    initialValues: {
      description: '',
      type: 'private',
      file: undefined,
    },
    async onSubmit(values, helpers) {
      setIsSubmitting(true);
      try {
        const res = await rfiService.httpCreateRFI({
          ...values,
          projectId
        });
        if (res.data) {
          toast.success('RFI created successfully');
          setRfis([res.data.createdRFI, ...rfis]);
        }
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data.message || 'An error occurred');
      }
      finally {
        setIsSubmitting(false);
        setShowRfiModal(false);
        helpers.resetForm();
      }
    },
    validationSchema: ValidationSchema
  })

  async function handleFileUpload(file: RcFile) {
    setIsFileUploading(true);
    try {


      const url = await new AwsS3(file, 'documents/bids/').getS3URL();
      let fileData = {
        url,
        extension: file.name.split('.').pop() || '',
        type: file.type as string,
        name: file.name,
      };
      rfiFormik.setFieldValue('file', fileData);

    } catch (error) {
      console.error('Error uploading file to S3:', error);
      toast.error(`Unable to upload Files`);
    } finally {
      setIsFileUploading(false);
    }
  }

  if (isFetching) {
    return <Skeleton />
  }

  return (
    <div className="mb-4 md:ms-[69px] md:me-[59px] mx-4  ">
      <div className="flex items-center justify-between">
        <TertiaryHeading
          title="RFI Center"
          className="text-[20px] leading-[30px]"
        />

        <div className="flex items-center space-x-2">
          <div className="pt-1">
            <WhiteButton
              text="Export"
              icon="/uploadcloud.svg"
              iconwidth={20}
              iconheight={20}
            />
          </div>

          <div className="w-96">
            <InputComponent
              label=""
              placeholder="Search"
              name="search"
              type="text"
              field={{
                prefix: <SearchOutlined className="text-xl" />,
                value: search,
                onChange: (e) => {
                  setSearch(e.target.value);
                },
              }}
            />
          </div>
        </div>
      </div>

      {rfis.filter(rfi => {
        if (!search) {
          return true;
        }
        return rfi.description.toLowerCase().includes(search.toLowerCase());
      }).map(rfi => {
        const user = rfi.user;

        return <div key={rfi._id} className="mt-4 px-2 flex bg-white rounded-lg shadow">
          <Avatar
            src={typeof rfi.user !== 'string' ? rfi.user.avatar || rfi.user.companyLogo : ""}
            size={40}
            className='mt-4'
          />

          <div className="py-4 flex-1 px-4 space-y-2">
            <div className="flex justify-between">
              <TertiaryHeading
                title={`${typeof user !== 'string' ? user.companyName : ""} | ${moment(rfi.createdAt).format('MMM DD, YYYY, hh:mm A')}`}
                className="text-[14px] leading-5 font-semibold text-[#667085]"
              />
              <div className="flex items-center space-x-4">
                {rfi.type === 'private' ? <p className="py-[5px] rounded-full px-[11px] bg-[#E9EBF8] text-[#7138DF] text-xs leading-4">
                  Private
                </p> : null}

                {/* current date === createdAt then display */}

                {moment().isSame(rfi.createdAt, 'day') ? <p className="py-[5px] rounded-full px-[11px] bg-[#E9EBF8] text-[#7138DF] text-xs leading-4">
                  New
                </p> : null
                }
                <div className="cursor-pointer flex items-center space-x-1 hover:bg-gray-100 hover:px-1 hover:py-1 hover:rounded-lg hover:transition-all hover:translate-x-1
              relative
              "
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    toggleRfiModal();
                  }}
                >
                  <Image
                    src={'/message-circle.svg'}
                    alt="message-circle icon"
                    width={17}
                    height={18}
                  />
                  <TertiaryHeading
                    title="Reply"
                    className="text-[#475467] text-[14px] leading-6 font-normal "
                  />
                  {showRfiModal ? <div className='absolute z-10 right-20' onClick={e => {
                    e.stopPropagation()
                  }}>
                    <Popups
                      title='RFI'
                      onClose={() => {
                        setShowRfiModal(false);
                        rfiFormik.resetForm();
                        setIsSubmitting(false);
                        setIsFileUploading(false);
                      }}
                    >
                      <Spin
                        spinning={isSubmitting}
                      >
                        <div className='space-y-3'>
                          <TextAreaComponent
                            label='Description'
                            name='description'
                            field={{
                              rows: 7,
                              value: rfiFormik.values.description,
                              onChange: rfiFormik.handleChange,
                              onBlur: rfiFormik.handleBlur,
                            }}
                            hasError={rfiFormik.touched.description && !!rfiFormik.errors.description}
                            errorMessage={rfiFormik.errors.description}
                          />
                          <div className='space-y-1'>
                            <TertiaryHeading
                              title='Type'
                              className='text-sm font-medium leading-6 capitalize text-graphiteGray '
                            />
                            <Radio.Group
                              onChange={rfiFormik.handleChange}
                              value={rfiFormik.values.type}
                              name='type'
                            >
                              <Radio value={'private'}>Private</Radio>
                              <Radio value={'public'}>Public</Radio>
                            </Radio.Group>
                          </div>

                          <div>
                            <Spin
                              spinning={isFileUploading}
                            >
                              <Dragger
                                name={'file'}
                                accept="image/*,gif,application/pdf"

                                beforeUpload={(file) => {
                                  handleFileUpload(file);
                                  return false;
                                }}
                                style={{
                                  borderStyle: 'dashed',
                                  borderWidth: 6,
                                }}
                                itemRender={() => {
                                  return null;
                                }}
                              >
                                <p className="ant-upload-drag-icon">
                                  <Image
                                    src={'/uploadcloud.svg'}
                                    width={50}
                                    height={50}
                                    alt="upload"
                                  />
                                </p>
                                <p className="text-[12px] py-2 leading-3 text-[#98A2B3]">
                                  Drop your image here, or browse
                                </p>
                                <p className="text-[12px] leading-3 text-[#98A2B3]">
                                  PNG, GIF, JPG, Max size: 2MB
                                </p>
                              </Dragger>
                              {rfiFormik.values.file ?
                                <p>{rfiFormik.values.file.name}</p>
                                : null}
                            </Spin>
                          </div>

                          <CustomButton
                            text='Send'
                            isLoading={isSubmitting}
                            onClick={rfiFormik.handleSubmit}
                          />
                        </div>
                      </Spin>

                    </Popups>
                  </div> : null}
                </div>
              </div>
            </div>
            <TertiaryHeading
              title={rfi.description}
              className="text-[#475467] text-[14px] leading-6 font-normal "
            />
          </div>
        </div>
      })}
    </div>
  );
}
