'use client';
import Description from '@/app/component/description';
import { withAuth } from '@/app/hoc/withAuth';
import { ConfigProvider, Steps, type StepsProps } from 'antd';
import Image from 'next/image';
import { PostBasicInformation } from './components/BasicInformation';
import { PostProjectFooter } from './components/Footer';
import { PostProjectDetails } from './components/ProjectDetails';
import { PostDesignTeam } from './components/DesignTeam';
import { PostProjectTrades } from './components/ProjectTrades';
import { ProjectUploadFiles } from './components/ProjectFile';
import { PostFinalize } from './components/PostFinalize';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import { CreateOwnerPostProjectType, bidManagementService } from '@/app/services/bid-management.service';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { setFormStepAction, setPostProjectAction } from '@/redux/post-project/post-project.slice';
import { IBidManagement } from '@/app/interfaces/bid-management/bid-management.interface';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

// import { DeletePopup } from './components/DeletePopup';
// import { PostProjectCongratulations } from './components/PostProjectCongratuslations';


const BasicInformationSchema = Yup.object().shape({
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  constructionTypes: Yup.array().of(Yup.string()).required('Construction Type is required'),
  country: Yup.string().required('Country is required'),
  projectName: Yup.string().required('Project Name is required'),
  state: Yup.string().required('State is required'),
  zipCode: Yup.string().required('Zip Code is required'),
  status: Yup.string().required('Status is required')
});


const ProjectDetailsSchema = Yup.object().shape({
  projectType: Yup.array().of(Yup.string()).required('Project Type is required'),
  projectBuildingUse: Yup.array().of(Yup.string()).required('Project Building Use is required'),
  stage: Yup.string().required('Stage is required'),
  estimatedStartDate: Yup.string().required('Estimated Start Date is required'),
  estimatedDuration: Yup.string().required('Estimated Duration is required'),
  durationType: Yup.mixed().oneOf(['days', 'weeks', 'months', 'years']).required('Duration Type is required'),
  description: Yup.string().required('Description is required'),
  instruction: Yup.string().required('Instruction is required'),
});


function StaticTime() {
  return (
    <div className="flex items-center space-x-2">
      <Image src={'/clock.svg'} height={10} width={10} alt="clock" />
      <Description title="3 Minutes" className="text-[#98A2B3] text-xs" />
    </div>
  );
}
let stepItems: StepsProps['items'] = [
  {
    title: <h4>Basic Information</h4>,
    description: <StaticTime />,
    className: 'mt-5',
  },
  {
    title: <h4>Project Details</h4>,
    description: <StaticTime />,
    className: 'mt-5',
  },
  {
    title: <h4>Team</h4>,
    description: <StaticTime />,
    className: 'mt-5',
  },
  {
    title: <h4>Trades</h4>,
    description: <StaticTime />,
    className: 'mt-5',
  },
  {
    title: <h4>Project file</h4>,
    description: <StaticTime />,
    className: 'mt-5',
  },
  {
    title: <h4>Finalize</h4>,
    description: <StaticTime />,
    className: 'mt-5',
  },
];

function CreatePost() {
  const postProjectState = useSelector((state: RootState) => state.postProject);
  const dispatch = useDispatch<AppDispatch>();

  const nextStep = () => {
    dispatch(setFormStepAction(postProjectState.formStep + 1));
  };

  const prevStep = () => {
    dispatch(setFormStepAction(postProjectState.formStep - 1));
  };

  const createProjectMutation = useMutation<IResponseInterface<{ createdProject: IBidManagement }>, AxiosError<{ message: string }>, CreateOwnerPostProjectType>({
    mutationFn: (values: CreateOwnerPostProjectType) => bidManagementService.httpCreateBidPostProject(values),
    onSuccess(res,) {
      console.log("Create Project Data", res);
      if (res.data && res.data.createdProject) {
        dispatch(setPostProjectAction(res.data.createdProject));
        nextStep();
      }
    },
    onError(error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    },
  });

  const updateProjectMutation = useMutation<IResponseInterface<{ updatedProject: IBidManagement }>, AxiosError<{ message: string }>, Partial<IBidManagement>>({
    mutationKey: "update-post-project",
    mutationFn: (values) => bidManagementService.httpUpdateBidPostProject(postProjectState.project?._id || "", values),
    onSuccess(res) {
      if (res.data && res.data.updatedProject) {
        dispatch(setPostProjectAction(res.data.updatedProject));
        nextStep();
      }
    },
    onError(error) {
      console.log("Update Project Mutation", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  })

  const basicInformationFormik = useFormik({
    initialValues: postProjectState.project ? { ...postProjectState.project } : {
      projectName: '',
      country: 'PK',
      city: '',
      zipCode: '',
      state: '',
      constructionTypes: ['Civil'] as string | string[],
      address: '',
      status: 'draft' as CreateOwnerPostProjectType['status'],
    },
    onSubmit(values) {
      if (postProjectState.project) {
        updateProjectMutation.mutate(values)
      } else {
        createProjectMutation.mutate(values);
      }
    },
    validationSchema: BasicInformationSchema,
    enableReinitialize: true
  });


  const formik = useFormik({
    initialValues: {
      ...postProjectState.project as IBidManagement
    },
    onSubmit(values) {
      console.log(values);
    },
    validationSchema: postProjectState.formStep === 1 ? ProjectDetailsSchema : undefined
  })

  return (
    <section className="mt-6 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl ">
      <div className="flex gap-4 items-center">
        <Image src={'/home.svg'} alt="home icon" width={20} height={20} />
        <Image
          src={'/chevron-right.svg'}
          alt="chevron-right icon"
          width={16}
          height={16}
        />
        <Description title="Project" className="font-base text-slateGray" />
        <Image
          src={'/chevron-right.svg'}
          alt="chevron-right icon"
          width={16}
          height={16}
        />

        <Description
          title="Post Project"
          className="font-semibold text-lavenderPurple cursor-pointer underline"
        />
      </div>
      {/* <PostProjectCongratulations /> */}
      {/* <DeletePopup /> */}
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-3 bg-white shadow-2xl border rounded-xl p-4 h-fit">
          <ConfigProvider
            theme={{
              components: {
                Steps: {
                  dotSize: 18,
                  dotCurrentSize: 18,
                  colorPrimary: '#6941C6',
                  colorText: '#6941C6',
                  fontWeightStrong: 600,
                  fontSize: 16,
                  lineHeight: 16,
                },
              },
            }}
          >
            <Steps
              progressDot
              current={postProjectState.formStep}
              direction="vertical"
              size="default"
              items={stepItems}
            />
          </ConfigProvider>
        </div>
        <div className="col-span-9">
          {postProjectState.formStep === 0 ? (
            <PostBasicInformation formik={basicInformationFormik}>
              <PostProjectFooter
                cancelButton={{
                  text: 'Cancel',
                  onClick() { },
                }}
                submitButton={{
                  onClick() {
                    basicInformationFormik.submitForm();
                  },
                  text: postProjectState.project ? "Update & Continue" : "Save & Continue",
                  loading: createProjectMutation.isLoading || updateProjectMutation.isLoading
                }}
                info={{
                  title: `0% Completed`,
                  description: 'Welcome to the project post screens',
                }}
              />
            </PostBasicInformation>
          ) : postProjectState.formStep === 1 ? (
            <PostProjectDetails formik={formik}>
              <PostProjectFooter
                cancelButton={{
                  text: 'Previous',
                  onClick() {
                    prevStep();
                  },
                }}
                submitButton={{
                  onClick() {
                    nextStep();
                  },
                  text: 'Next Step',
                }}
                info={{
                  title: `25% Completed`,
                  description: 'You’re almost done! Just 4 step left',
                }}
              />
            </PostProjectDetails>
          ) : postProjectState.formStep === 2 ? (
            <PostDesignTeam>
              <PostProjectFooter
                cancelButton={{
                  text: 'Previous',
                  onClick() {
                    prevStep();
                  },
                }}
                submitButton={{
                  onClick() {
                    nextStep();
                  },
                  text: 'Next',
                }}
              />
            </PostDesignTeam>
          ) : postProjectState.formStep === 3 ? <PostProjectTrades >
            <PostProjectFooter
              cancelButton={{
                text: 'Previous',
                onClick() {
                  prevStep();
                },
              }}
              submitButton={{
                onClick() {
                  nextStep();
                },
                text: 'Next Step',
              }}
              info={{
                title: `75% Completed`,
                description: 'You’re almost done! Just 2 step left',
              }}
            />
          </PostProjectTrades> : postProjectState.formStep === 4 ? <ProjectUploadFiles>
            <PostProjectFooter
              cancelButton={{
                text: 'Previous',
                onClick() {
                  prevStep();
                },
              }}
              submitButton={{
                onClick() {
                  nextStep();
                },
                text: 'Next Step',
              }}
              info={{
                title: `90% Completed`,
                description: 'You’re almost done! Just 1 step left',
              }}
            />
          </ProjectUploadFiles> : postProjectState.formStep === 5 ? <PostFinalize>
            <PostProjectFooter
              cancelButton={{
                text: 'Previous',
                onClick() {
                  prevStep();
                },
              }}
              submitButton={{
                onClick() {
                },
                text: 'Post Project',
              }}
              info={{
                title: `100% Completed`,
                description: 'You’re almost done! Post your project now',
              }}
            />
          </PostFinalize> : null}
        </div>
      </div>
    </section>
  );
}

export default withAuth(CreatePost);
