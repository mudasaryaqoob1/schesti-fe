'use client';
import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react';
import * as Yup from 'yup';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { toast } from 'react-toastify';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

// module imports

import CustomButton from '@/app/component/customButton/button';
import { minHeading, senaryHeading } from '@/globals/tailwindvariables';
import TertiaryHeading from '@/app/component/headings/tertiary';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import CustomWhiteButton from '@/app/component/customButton/white';
import ModalComponent from '@/app/component/modal';
import FormControl from '@/app/component/formControl';
import { IEstimateRequest } from '@/app/interfaces/estimateRequests/estimateRequests.interface';
import ExistingClient from '../existingClient';
import { estimateRequestService } from '@/app/services/estimateRequest.service';
import { IClient } from '@/app/interfaces/companyInterfaces/companyClient.interface';
import AwsS3 from '@/app/utils/S3Intergration';
import { AppDispatch } from '@/redux/store';
import { fetchUsers } from '@/redux/userSlice/user.thunk';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';
import { byteConverter } from '@/app/utils/byteConverter';
import { DeleteOutlined } from '@ant-design/icons';

const clientInfoSchema: any = Yup.object({
  clientName: Yup.string().required('Client is required!'),
  companyName: Yup.string().required('Company name is required!'),
  email: Yup.string()
    .required('Email is required!')
    .email('Email should be valid'),
  phone: Yup.string().required('Phone is required!'),
  projectName: Yup.string().required('Project name is required!'),
  leadSource: Yup.string().required('Load source is required!'),
  projectValue: Yup.string().required('Project value is required!'),
  projectInformation: Yup.string().required('Project info is required!'),
  salePerson: Yup.string().required('Sale person is required!'),
  estimator: Yup.string().required('Estimator is required!'),
  // architectureDocuments: Yup.array(
  //   Yup.object({
  //     name: Yup.string().required(),
  //     size: Yup.string().required(),
  //     ext: Yup.string().required(),
  //     url: Yup.string().required(),
  //   })
  // ).min(1, 'architectureDocuments required'),
  // otherDocuments: Yup.array(
  //   Yup.object({
  //     name: Yup.string().required(),
  //     size: Yup.string().required(),
  //     ext: Yup.string().required(),
  //     url: Yup.string().required(),
  //   })
  // ).min(1, 'otherDocuments required'),
});

const initialValues: IEstimateRequest = {
  clientName: '',
  companyName: '',
  email: '',
  phone: '',
  projectName: '',
  leadSource: '',
  projectValue: '',
  projectInformation: '',
  salePerson: '',
  estimator: '',
};
const CreateEstimateRequest = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [salePersonsOption, setSalePersonsOption] = useState([]);
  const [estimatorsOption, setEstimatorsOption] = useState([]);
  const [uploadDocumentsError, setuploadDocumentsError] = useState('');
  const [drawingsDocuments, setDrawingsDocuments] = useState<any>([]);
  const [takeOffReports, setTakeOffReports] = useState<any>([]);
  const [otherDocuments, setOtherDocuments] = useState<any>([]);

  const fetchUsersHandler = useCallback(async () => {
    let result: any = await dispatch(
      fetchUsers({ limit: 9, page: 1, queryRoles: 'Estimator,Sales Manager' })
    );
    const estimatorData = result.payload.data?.employees
      .filter((user: any) => user.roles.includes('Estimator'))
      .map((option: any) => {
        return {
          label: `${option.firstName} ${option.lastName}`,
          value: `${option._id}`,
        };
      });
    setEstimatorsOption(estimatorData);
    const saleManagers = result.payload.data?.employees
      .filter((user: any) => user.roles.includes('Sales Manager'))
      .map((option: any) => {
        return {
          label: `${option.firstName} ${option.lastName}`,
          value: `${option._id}`,
        };
      });
    setSalePersonsOption(saleManagers);
  }, []);

  useEffect(() => {
    fetchUsersHandler();
  }, []);

  const submitHandler = async (values: IEstimateRequest) => {
    if (drawingsDocuments.length == 0) {
      setuploadDocumentsError('Drawings Document Required');
    } else if (takeOffReports.length == 0) {
      setuploadDocumentsError('Takeoff Reports Required');
    } else if (otherDocuments.length == 0) {
      setuploadDocumentsError('Other Documents Required');
    } else {
      const [drawingDocs, takeOffDocs, otherDocs] = await Promise.all([
        uploadDocumentToS3Handler(drawingsDocuments),
        uploadDocumentToS3Handler(takeOffReports),
        uploadDocumentToS3Handler(otherDocuments),
      ]);

      Promise.all([drawingDocs, takeOffDocs, otherDocs])
        .then(() => {
          setIsLoading(true);
          estimateRequestService
            .httpAddNewEstimateRequest({
              ...values,
              phone: +values.phone,
              otherDocuments: otherDocs,
              takeOffReports: takeOffDocs,
              drawingsDocuments: drawingDocs,
            })
            .then((resp: any) => {
              setIsLoading(false);
              if (resp.statusCode == 201) {
                setIsLoading(false);
                router.push('/estimates');
              }
            })
            .catch((error: any) => {
              setIsLoading(false);
              toast.error(error.message);
            });
        })
        .catch(() => {
          toast.error('Some thing went wrong during document uplaoding');
        });
    }
  };

  const uploadDocumentToS3Handler = async (documents: any) => {
    let documentsData: Object[] = [];
    try {
      await Promise.all(
        Object.keys(documents).map(async (key: any) => {
          const url = await new AwsS3(
            documents[key],
            'documents/estimates/'
          ).getS3URL();
          let obj = {
            name: documents[key].name,
            size: documents[key].size,
            ext: documents[key].type,
            url: url,
          };
          documentsData.push(obj);
        })
      );

      return documentsData;
    } catch (error) {
      toast.error('Error uploading documents');
      console.error('Error uploading documents:', error);
    }
  };
  const takeoffReportsUploadHandler = async (e: any) => {
    setuploadDocumentsError('');
    const documents = e.target.files;
    if (!documents[0]) {
      return;
    }

    if (byteConverter(documents[0].size, 'MB').size > 10) {
      setuploadDocumentsError(
        'Cannot upload document more then 10 mb of size.'
      );
      return;
    }
    for (let i = 0; i < documents.length; i++) {
      setTakeOffReports((prev: any) => [...prev, documents[i]]);
    }
  };

  const otherDocumentsUploadHandler = (e: any) => {
    setuploadDocumentsError('');
    const documents = e.target.files;
    if (!documents[0]) {
      return;
    }

    if (byteConverter(documents[0].size, 'MB').size > 10) {
      setuploadDocumentsError(
        'Cannot upload document more then 10 mb of size.'
      );
      return;
    }
    for (let i = 0; i < documents.length; i++) {
      setOtherDocuments((prev: any) => [...prev, documents[i]]);
    }
  };
  const drawingsDocumentsUplodadHandler = (e: any) => {
    setuploadDocumentsError('');
    const documents = e.target.files;
    if (!documents[0]) {
      return;
    }
    if (byteConverter(documents[0].size, 'MB').size > 10) {
      setuploadDocumentsError(
        'Cannot upload document more then 10 mb of size.'
      );
      return;
    }
    for (let i = 0; i < documents.length; i++) {
      if (
        documents[i].type === 'application/pdf' ||
        documents[i].type === 'image/png' ||
        documents[i].type === 'image/jpeg'
      ) {
        setDrawingsDocuments((prev: any) => [...prev, documents[i]]);
      } else {
        setuploadDocumentsError('Document should be image or pdf');
      }
    }
  };

  const drawingDocumentDeleteHandler = (documentName: string) => {
    setDrawingsDocuments(
      drawingsDocuments.filter((doc: any) => doc.name !== documentName)
    );
  };
  const takeoffDocumentDeleteHandler = (documentName: string) => {
    setTakeOffReports(
      takeOffReports.filter((doc: any) => doc.name !== documentName)
    );
  };
  const otherDocumentDeleteHandler = (documentName: string) => {
    setOtherDocuments(
      otherDocuments.filter((doc: any) => doc.name !== documentName)
    );
  };

  return (
    <section className="my-5 px-16">
      <div className="flex justify-between flex-wrap items-center md:flex-nowrap">
        <TertiaryHeading title="Take Off Measurements" />
        <CustomWhiteButton
          text="Add Existing Client"
          className="!w-auto "
          icon="/plusblack.svg"
          iconwidth={20}
          iconheight={20}
          onClick={() => setShowModal(true)}
        />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={clientInfoSchema}
        onSubmit={submitHandler}
      >
        {({ handleSubmit, setFieldValue }) => {
          return (
            <>
              <ModalComponent open={showModal} setOpen={setShowModal}>
                <ExistingClient
                  setModalOpen={setShowModal}
                  onSelectClient={({
                    firstName,
                    lastName,
                    companyName,
                    email,
                    phone,
                  }: IClient) => {
                    setFieldValue('clientName', `${firstName} ${lastName}`);
                    setFieldValue('companyName', companyName);
                    setFieldValue('email', email);
                    setFieldValue('phone', phone);
                  }}
                />
              </ModalComponent>
              <Form onSubmit={handleSubmit}>
                <div className="p-5 mt-4 border border-silverGray rounded-lg shadow-quinarGentleDepth">
                  <QuaternaryHeading
                    title="Client Information"
                    className="font-semibold"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-1 gap-4 mt-4">
                    <FormControl
                      control="input"
                      label="Client Name"
                      type="text"
                      name="clientName"
                      placeholder="Enter Client Name"
                    />
                    <FormControl
                      control="input"
                      label="Company Name"
                      type="text"
                      name="companyName"
                      placeholder="Enter Company Name"
                    />
                    <FormControl
                      control="input"
                      label="email"
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                    />
                    <FormControl
                      control="input"
                      label="Phone Number"
                      type="number"
                      name="phone"
                      placeholder="Phone number"
                    />
                  </div>
                </div>
                <div className="p-5 my-4 border border-silverGray rounded-lg shadow-quinarGentleDepth">
                  <QuaternaryHeading
                    title="Project information"
                    className="text-graphiteGray font-semibold"
                  />
                  <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-4 mt-4">
                    <FormControl
                      control="input"
                      label="Project Name"
                      type="text"
                      name="projectName"
                      placeholder="Enter Project Name"
                    />
                    <FormControl
                      control="input"
                      label="Lead Source Value"
                      type="text"
                      name="leadSource"
                      placeholder="Select source"
                    />
                    <FormControl
                      control="input"
                      label="Project Value"
                      type="text"
                      name="projectValue"
                      placeholder="Select source"
                    />
                    <FormControl
                      control="input"
                      label="Project Information"
                      type="text"
                      name="projectInformation"
                      placeholder="Enter Project Information"
                    />
                  </div>
                </div>

                {/* assignment */}
                <div className="p-5 border-2 border-silverGray rounded-lg shadow-quinarGentleDepth">
                  <QuaternaryHeading
                    title="Assignments"
                    className="text-graphiteGray font-semibold"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 grid-rows-1 gap-5 w-full mt-4">
                    <FormControl
                      control="select"
                      label="Sale Person"
                      name="salePerson"
                      placeholder="Select Sale person"
                      options={salePersonsOption}
                      def
                    />
                    <FormControl
                      control="select"
                      label="Estimator"
                      name="estimator"
                      placeholder="Select project manager"
                      options={estimatorsOption}
                    />
                  </div>
                </div>

                <div className=" border-2  border-silverGray  rounded-lg shadow-quinarGentleDepth mt-4 p-5">
                  <h3 className="my-4">Upload</h3>
                  <div className="flex items-center gap-3">
                    <div>
                      <p
                        className={`${senaryHeading} text-midnightBlue font-popin mb-2`}
                      >
                        Upload Drawings
                      </p>
                      <div
                        className={`p-4 flex items-center flex-col gap-2 border-2 border-silverGray pb-4 rounded-lg mb-3`}
                      >
                        <div
                          className={`px-6 py-4 flex flex-col items-center gap-3 `}
                        >
                          <div className="bg-lightGrayish rounded-[28px] border border-solid border-paleblueGray flex justify-center items-center p-2.5">
                            <Image
                              src={'/uploadcloud.svg'}
                              alt="upload icon"
                              width={20}
                              height={20}
                            />
                          </div>
                          <div className="flex gap-2">
                            <label
                              htmlFor="drawingDocuments"
                              className={twMerge(
                                `${senaryHeading} text-RoyalPurple font-semibold cursor-pointer`
                              )}
                            >
                              Click to Upload
                            </label>
                            <input
                              multiple
                              type="file"
                              name="drawingDocuments"
                              id="drawingDocuments"
                              className="hidden"
                              accept="image/jpeg,image/png,application/pdf "
                              onChange={drawingsDocumentsUplodadHandler}
                            />
                            <p className={`text-steelGray ${minHeading}`}>
                              or drag and drop
                            </p>
                          </div>

                          <p className={`text-steelGray ${minHeading}`}>
                            SVG, PNG, JPG or PDF (max. 800x400px)
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p
                        className={`${senaryHeading} text-midnightBlue font-popin mb-2`}
                      >
                        Takeoff Reports
                      </p>
                      <div
                        className={`p-4 flex items-center flex-col gap-2 border-2 border-silverGray pb-4 rounded-lg `}
                      >
                        <div
                          className={`px-6 py-4 flex flex-col items-center gap-3 `}
                        >
                          <div className="bg-lightGrayish rounded-[28px] border border-solid border-paleblueGray flex justify-center items-center p-2.5">
                            <Image
                              src={'/uploadcloud.svg'}
                              alt="upload icon"
                              width={20}
                              height={20}
                            />
                          </div>
                          <div className="flex gap-2">
                            <label
                              htmlFor="takeoffReports"
                              className={twMerge(
                                `${senaryHeading} text-RoyalPurple font-semibold cursor-pointer`
                              )}
                            >
                              Click to Upload
                            </label>
                            <input
                              multiple
                              type="file"
                              name="otherDocuments"
                              id="takeoffReports"
                              className="hidden"
                              onChange={takeoffReportsUploadHandler}
                              accept="application/pdf,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            />
                            <p className={`text-steelGray ${minHeading}`}>
                              or drag and drop
                            </p>
                          </div>
                          <p className={`text-steelGray ${minHeading}`}>
                            SVG, PNG, JPG or GIF (max. 800x400px)
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p
                        className={`${senaryHeading} text-midnightBlue font-popin mb-2`}
                      >
                        Other Documents
                      </p>
                      <div
                        className={`p-4 flex items-center flex-col gap-2 border-2 border-silverGray pb-4 rounded-lg `}
                      >
                        <div
                          className={`px-6 py-4 flex flex-col items-center gap-3 `}
                        >
                          <div className="bg-lightGrayish rounded-[28px] border border-solid border-paleblueGray flex justify-center items-center p-2.5">
                            <Image
                              src={'/uploadcloud.svg'}
                              alt="upload icon"
                              width={20}
                              height={20}
                            />
                          </div>
                          <div className="flex gap-2">
                            <label
                              htmlFor="otherDocuments"
                              className={twMerge(
                                `${senaryHeading} text-RoyalPurple font-semibold cursor-pointer`
                              )}
                            >
                              Click to Upload
                            </label>
                            <input
                              multiple
                              type="file"
                              name="otherDocuments"
                              id="otherDocuments"
                              className="hidden"
                              onChange={otherDocumentsUploadHandler}
                              accept="application/pdf,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            />
                            <p className={`text-steelGray ${minHeading}`}>
                              or drag and drop
                            </p>
                          </div>
                          <p className={`text-steelGray ${minHeading}`}>
                            SVG, PNG, JPG or GIF (max. 800x400px)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {uploadDocumentsError && <p>{uploadDocumentsError}</p>}
                  <div className="grid grid-cols-4">
                    <div className="max-w-xs">
                      {drawingsDocuments.map((document: { name: string }) => (
                        <div
                          key={document.name}
                          className="flex justify-between bg-violet-100 rounded-md py-1 px-2 my-2"
                        >
                          <p className="truncate hover:text-clip text-[14px]">
                            {document.name}
                          </p>
                          <p
                            className="cursor-pointer"
                            onClick={() =>
                              drawingDocumentDeleteHandler(document.name)
                            }
                          >
                            {' '}
                            <DeleteOutlined />
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="max-w-xs">
                      {takeOffReports.map((document: { name: string }) => (
                        <div
                          key={document.name}
                          className="flex justify-between bg-violet-100 rounded-md py-1 px-2 my-2"
                        >
                          <p className="truncate hover:text-clip text-[14px]">
                            {document.name}
                          </p>
                          <p
                            className="cursor-pointer"
                            onClick={() =>
                              takeoffDocumentDeleteHandler(document.name)
                            }
                          >
                            {' '}
                            <DeleteOutlined />
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="max-w-xs">
                      {otherDocuments.map((document: { name: string }) => (
                        <div
                          key={document.name}
                          className="flex justify-between bg-violet-100 rounded-md py-1 px-2 my-2"
                        >
                          <p className="truncate hover:text-clip text-[14px]">
                            {document.name}
                          </p>
                          <p
                            className="cursor-pointer"
                            onClick={() =>
                              otherDocumentDeleteHandler(document.name)
                            }
                          >
                            {' '}
                            <DeleteOutlined />
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* buttons */}
                <div className="flex justify-end items-center gap-2 md:mt-12 mt-6 p-4 bg-white shadow-secondaryTwist">
                  <div className="w-[116px]">
                    <CustomButton
                      className="!border-celestialGray shadow-scenarySubdued2 !text-graphiteGray !bg-snowWhite !px-5 !py-3 w-full"
                      text="Cancel"
                      onClick={() => router.push('/estimates')}
                    />
                  </div>
                  <div className="w-[116px]">
                    <CustomButton
                      text="Create"
                      type="submit"
                      isLoading={isLoading}
                      className="!px-5 !py-3 w-full"
                    />
                  </div>
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
    </section>
  );
};

export default CreateEstimateRequest;
