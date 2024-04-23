import { DownOutlined, LoadingOutlined } from '@ant-design/icons';

import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import { useQuery } from 'react-query';
import { bidManagementService } from '@/app/services/bid-management.service';
import { Skeleton, Spin } from 'antd';
import momentTimezone from 'moment-timezone';
import { getTimezoneFromCountryAndState } from '@/app/utils/date.utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { bidManagementOwnerActions } from '@/redux/bid-management/owner.slice';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Popups } from '@/app/(pages)/bid-management/components/Popups';
import { InputComponent } from '@/app/component/customInput/Input';
import { TextAreaComponent } from '@/app/component/textarea';
import Image from 'next/image';
import Dragger from 'antd/es/upload/Dragger';
import { postProjectActions, setFormStepAction, setPostProjectAction } from '@/redux/post-project/post-project.slice';
import { Routes } from '@/app/utils/plans.utils';
import { useRouter } from 'next/navigation';
import ModalComponent from '@/app/component/modal';

type Props = {
  id: string;
};
export function ProjectIntro({ id }: Props) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const bid = useSelector(
    (state: RootState) => state.bidManagementOwner.project
  );

  const query = useQuery(
    ['getOwnerProjectById', id],
    () => {
      return bidManagementService.httpGetOwnerProjectById(id);
    },
    {
      onSuccess(data) {
        if (data.data && data.data.project) {
          dispatch(
            bidManagementOwnerActions.setProjectAction(data.data.project)
          );
        }
      },
      onError(error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data.message);
      },
    }
  );

  if (query.isLoading) {
    return <Skeleton />;
  }


  function updateBidStatus(status: string) {
    // Call the API to update the bid status
    setIsLoading(true);
    bidManagementService.httpUpdateProjectStatus(id, status)
      .then(response => {
        // Handle the successful response
        toast.success('Bid status updated successfully');
        // Update the bid status in the Redux store
        if (response.data && bid) {
          dispatch(bidManagementOwnerActions.setProjectAction({
            ...bid,
            status: response.data.updatedBid.status
          }));
          toggleStatusModal();
        }
      })
      .catch(error => {
        // Handle the error response
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data.message);
      }).finally(() => {
        setIsLoading(false);
      });
  }


  function toggleStatusModal() {
    setShowStatusModal(!showStatusModal);
  }

  return (
    <div className="flex justify-between items-center">
      <div className="space-y-3">
        <SenaryHeading
          title={bid ? bid.projectName : ''}
          className="text-[#1D2939] text-2xl font-semibold leading-9"
        />
        <div className="flex space-x-4 items-center text-[#667085] text-base leading-6 font-normal">
          <SenaryHeading
            title={`Creation Date: ${bid ? momentTimezone(bid.createdAt).format('MM/DD/YYYY hh:mm A') : ''}`}
          />
          <SenaryHeading
            title={`Bid Date: ${bid ? momentTimezone(bid.bidDueDate).format('MM/DD/YYYY hh:mm A') + ' ' + getTimezoneFromCountryAndState(bid.country, bid.state) : ''}  `}
          />
        </div>
      </div>

      <div className="flex items-center space-x-3 flex-1 justify-end">
        <div className="flex items-center justify-between p-3 w-[234px] bg-[#FFF2F0] rounded-lg">
          <SenaryHeading
            title="Project Status"
            className="text-[#1D2939] font-normal text-[14px] leading-4"
          />

          <div className="flex relative cursor-pointer items-center border border-[#DC6803] py-1 pr-[10px] pl-3 rounded-full space-x-2"
            onClick={toggleStatusModal}>
            <SenaryHeading
              title={bid ? bid.status : ''}
              className="text-[#B54708] capitalize text-[14px] font-medium leading-6"
            />
            {
              isLoading ? <Spin indicator={<LoadingOutlined />} size='small' />
                :
                <DownOutlined className="text-xs text-[#B54708]" />
            }
            {showStatusModal ? <div className='space-y-1 py-1 cursor-default w-64 border rounded-lg shadow-md right-5 bg-white z-10 top-9 absolute'
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {['active', 'archived',].map(status => {
                return <p key={status} className={`text-[#344054] hover:bg-gray-50 px-2 py-1 cursor-pointer rounded-lg  font-normal capitalize text-medium leading-6 ${bid && bid.status === status ? "bg-gray-100" : ""}`}
                  onClick={() => {
                    updateBidStatus(status);
                  }}
                >
                  {status}
                </p>
              })}

            </div> : null}
          </div>
        </div>
        <WhiteButton
          text="Edit"
          className="!w-28"
          icon="/edit-05.svg"
          iconwidth={20}
          iconheight={20}
          onClick={() => {
            if (bid) {
              dispatch(setPostProjectAction(bid));
              dispatch(setFormStepAction(0));
              dispatch(postProjectActions.setTeamMemers(bid.teamMembers));
              router.push(`${Routes['Bid Management'].Post_A_Project}`);
            }
          }}
        />

        <div className='w-fit'>
          <CustomButton
            text="Update"
            className="!w-32"
            icon={'/plus.svg'}
            iconwidth={20}
            iconheight={20}
            onClick={() => setShowUpdateModal(true)}
          />
          <ModalComponent
            open={showUpdateModal}
            setOpen={setShowUpdateModal}
          >
            <div>
              <Popups
                title='Update'
                onClose={() => {
                  setShowUpdateModal(false);
                }}
              >
                <div className='space-y-3'>
                  <InputComponent
                    label='Title'
                    name='title'
                    placeholder='Enter title'
                    type='text'
                  />

                  <TextAreaComponent
                    label='Description'
                    name='description'
                    field={{
                      rows: 7
                    }}
                  />

                  <div>
                    <Dragger
                      name={'file'}
                      accept="image/*,gif,application/pdf"

                      beforeUpload={() => {

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
                  </div>

                  <CustomButton
                    text='Update'
                  />
                </div>
              </Popups>
            </div>
          </ModalComponent>
        </div>
      </div>
    </div>
  );
}
