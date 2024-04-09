'use client';
import CustomButton from '@/app/component/customButton/button';
import Description from '@/app/component/description';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import { withAuth } from '@/app/hoc/withAuth';
import { ConfigProvider, Tabs } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import { ProjectSummary } from '../components/ProjectSummary';
import { ProjectDesignTeam } from '../components/ProjectDesignTeam';
import { ProjectDocuments } from '../components/ProjectDocuments';
import { ProjectRFICenter } from '../components/ProjectRFICenter';
import { ProjectBiddingTeam } from '../components/ProjectBiddingTeam';
import { useParams } from 'next/navigation';
import { bidManagementService } from '@/app/services/bid-management.service';
import { useQuery } from 'react-query';
import moment from 'moment';

const SUMMARY = 'Summary';
const DESIGN_TEAM = 'Design Team';
const BIDDING_TEAM = 'Bidding Team';
const DOCUMENTS = 'Documents';
const RFI_CENTER = 'RFI Center';

function OwnerProjectDetailsPage() {
    const params = useParams();
    const { projectId } = params;

    const [activeTab, setActiveTab] = useState(SUMMARY);

    const fetchProjectDetails = async () => {
        return bidManagementService.httpGetOwnerProjectById(projectId);
      };
    
      const { data, isLoading } = useQuery(['project-details'], fetchProjectDetails);

      if(isLoading) return <h6>Loading...</h6>
      const { project: projectData } = data?.data;

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
              title={projectData.projectName}
              className="text-[#1D2939] text-2xl font-semibold leading-9"
            />
            <div className="flex space-x-4 items-center text-[#667085] text-base leading-6 font-normal">
              <SenaryHeading title={moment(projectData.createdAt).format('DD MMM YYYY, hh:mm')} />
              <SenaryHeading title={moment(projectData.bidDueDate).format('DD MMM YYYY, hh:mm')} />
            </div>
          </div>

          <div className="flex items-center space-x-3 flex-1 justify-end">
            <CustomButton text="Submit a bid" className="!w-40" />
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
                BIDDING_TEAM,
                DOCUMENTS,
                RFI_CENTER,
              ].map((tab) => ({
                key: tab,
                label: (
                  <QuaternaryHeading
                    title={tab}
                    className={`!w-full ${
                      activeTab === tab ? 'text-RoyalPurple' : 'text-black'
                    }`}
                  />
                ),
                tabKey: tab,
              }))}
            />
          </ConfigProvider>
        </div>
      </div>

      {activeTab === SUMMARY ? <ProjectSummary projectData={projectData} /> : null}
      {activeTab === DESIGN_TEAM ? <ProjectDesignTeam projectData={projectData} /> : null}
      {activeTab === BIDDING_TEAM ? <ProjectBiddingTeam projectData={projectData}/> : null}

      {activeTab === DOCUMENTS ? <ProjectDocuments projectData={projectData}/> : null}
      {activeTab === RFI_CENTER ? <ProjectRFICenter /> : null}
    </section>
  );
}

export default withAuth(OwnerProjectDetailsPage);
