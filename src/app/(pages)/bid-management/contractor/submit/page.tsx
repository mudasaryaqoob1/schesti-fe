'use client';
import CustomButton from '@/app/component/customButton/button';
import Description from '@/app/component/description';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import { withAuth } from '@/app/hoc/withAuth';
import { ConfigProvider, Tabs } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import { ProjectSummary } from './components/ProjectSummary';
import { ProjectDesignTeam } from './components/ProjectDesignTeam';
import { ProjectAcitivityAndStatusTracking } from './components/ProjectActivityAndStatusTracking';
import { ProjectDocuments } from './components/ProjectDocuments';
import { ProjectRFICenter } from './components/ProjectRFICenter';

const SUMMARY = 'Summary';
const DESIGN_TEAM = 'Design Team';
const ACTIVITY_AND_STATUS_TRACKING = 'Activity & Status Tracking';
const DOCUMENTS = 'Documents';
const RFI_CENTER = 'RFI Center';

function OwnerProjectDetailsPage() {
  const [activeTab, setActiveTab] = useState(SUMMARY);

  return (
    <section className="">
      <div className="flex gap-4 items-center mt-6 mb-4 md:ms-[69px] md:me-[59px] mx-4 ">
        <Image src={'/home.svg'} alt="home icon" width={20} height={20} />
        <Image
          src={'/chevron-right.svg'}
          alt="chevron-right icon"
          width={16}
          height={16}
        />
        <Description
          title="Posted Project"
          className="font-base text-slateGray"
        />
        <Image
          src={'/chevron-right.svg'}
          alt="chevron-right icon"
          width={16}
          height={16}
        />

        <Description
          title="Overview"
          className="font-semibold text-lavenderPurple cursor-pointer underline"
        />
      </div>

      <div className="bg-white mb-[39px] md:px-[64px] py-5">
        {/* Project Intro */}
        <div className="flex justify-between items-center">
          <div className="space-y-3">
            <SenaryHeading
              title="Seabreeza Village comercial Developemnst - convenience store"
              className="text-[#1D2939] text-2xl font-semibold leading-9"
            />
            <div className="flex space-x-4 items-center text-[#667085] text-base leading-6 font-normal">
              <SenaryHeading title="Creation Date: 05/22/2023 06:37 AM" />
              <SenaryHeading title="Bid Date: 06/05/2023 12:00 AM EST" />
            </div>
          </div>

          <div className="flex items-center space-x-3 flex-1 justify-end">

            <CustomButton
              text="Submit a bid"
              className="!w-40"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-3">
          <ConfigProvider
            theme={{
              components: {
                Tabs: {
                  inkBarColor: '#EF9F28',
                },
              },
            }}
          >
            <Tabs
              size="large"
              onChange={(key) => {
                setActiveTab(key);
              }}
              activeKey={activeTab}
              tabBarGutter={90}
              items={[
                SUMMARY,
                DESIGN_TEAM,
                ACTIVITY_AND_STATUS_TRACKING,
                DOCUMENTS,
                RFI_CENTER,
              ].map((tab) => ({
                key: tab,
                label: (
                  <QuaternaryHeading
                    title={tab}
                    className={`!w-full ${activeTab === tab ? 'text-RoyalPurple' : 'text-black'
                      }`}
                  />
                ),
                tabKey: tab,
              }))}
            />
          </ConfigProvider>
        </div>
      </div>

      {activeTab === SUMMARY ? <ProjectSummary /> : null}
      {activeTab === DESIGN_TEAM ? <ProjectDesignTeam /> : null}
      {activeTab === ACTIVITY_AND_STATUS_TRACKING ? (
        <ProjectAcitivityAndStatusTracking />
      ) : null}
      {activeTab === DOCUMENTS ? <ProjectDocuments /> : null}
      {activeTab === RFI_CENTER ? <ProjectRFICenter /> : null}
    </section>
  );
}

export default withAuth(OwnerProjectDetailsPage);
