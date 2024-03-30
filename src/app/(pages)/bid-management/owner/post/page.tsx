'use client';
import Description from '@/app/component/description';
import { withAuth } from '@/app/hoc/withAuth';
import { ConfigProvider, Steps, type StepsProps } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import { PostBasicInformation } from './components/BasicInformation';
import { PostProjectFooter } from './components/Footer';
import { PostProjectDetails } from './components/ProjectDetails';
import { PostDesignTeam } from './components/DesignTeam';
import { PostProjectTrades } from './components/ProjectTrades';
import { ProjectUploadFiles } from './components/ProjectFile';
import { PostFinalize } from './components/PostFinalize';
import { DeletePopup } from './components/DeletePopup';
// import { PostProjectCongratulations } from './components/PostProjectCongratuslations';

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
  const [current, setCurrent] = useState(0);

  const nextStep = () => {
    setCurrent(current + 1);
  };

  const prevStep = () => {
    setCurrent(current - 1);
  };

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
      <DeletePopup />
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
              current={current}
              direction="vertical"
              size="default"
              items={stepItems}
            />
          </ConfigProvider>
        </div>
        <div className="col-span-9">
          {current === 0 ? (
            <PostBasicInformation>
              <PostProjectFooter
                cancelButton={{
                  text: 'Cancel',
                  onClick() {},
                }}
                submitButton={{
                  onClick() {
                    nextStep();
                  },
                  text: 'Next Step',
                }}
                info={{
                  title: `0% Completed`,
                  description: 'Welcome to the project post screens',
                }}
              />
            </PostBasicInformation>
          ) : current === 1 ? (
            <PostProjectDetails>
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
          ) : current === 2 ? (
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
          ) : current === 3 ? (
            <PostProjectTrades>
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
            </PostProjectTrades>
          ) : current === 4 ? (
            <ProjectUploadFiles>
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
            </ProjectUploadFiles>
          ) : current === 5 ? (
            <PostFinalize>
              <PostProjectFooter
                cancelButton={{
                  text: 'Previous',
                  onClick() {
                    prevStep();
                  },
                }}
                submitButton={{
                  onClick() {},
                  text: 'Post Project',
                }}
                info={{
                  title: `100% Completed`,
                  description: 'You’re almost done! Post your project now',
                }}
              />
            </PostFinalize>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default withAuth(CreatePost);
