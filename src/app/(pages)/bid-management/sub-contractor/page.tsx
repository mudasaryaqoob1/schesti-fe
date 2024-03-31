'use client';
import WhiteButton from '@/app/component/customButton/white';
import CustomButton from '@/app/component/customButton/button';
import { InputComponent } from '@/app/component/customInput/Input';
import Description from '@/app/component/description';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import { withAuth } from '@/app/hoc/withAuth';
import { SearchOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { BidIntro } from './components/BidIntro';
import { IBidManagement } from '@/app/interfaces/bid-management/bid-management.interface';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { bidManagementService } from '@/app/services/bid-management.service';
import { BidDetails } from './components/BidDetails';
import { Pagination, Skeleton } from 'antd';
import { BidFilters } from './components/Filters';
import _ from 'lodash';
import { isArrayString } from '@/app/utils/typescript.utils';

const ITEMS_PER_PAGE = 4;

function BidManagementSubContractorPage() {
  const [selectedBid, setSelectedBid] = useState<IBidManagement | null>(null);
  const [search, setSearch] = useState('');
  const [invitedCurrentPage, setInvitedCurrentPage] = useState(1);
  const [exploreCurrentPage, setExploreCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<{
    trades: string[];
    projectValue: number;
  }>({
    trades: [],
    projectValue: 0,
  });

  function toggleFilters() {
    setShowFilters(!showFilters);
  }
  function closeFilters() {
    setShowFilters(false);
  }

  const projectsQuery = useQuery(['bid-projects'], () => {
    return bidManagementService.httpGetOwnerProjects();
  });

  const invitedUserProjectsQuery = useQuery(['bid-projects'], () => {
    return bidManagementService.httpGetBidProjectInvitedUsers();
  });

  const projects =
    projectsQuery.data && projectsQuery.data.data
      ? projectsQuery.data.data?.projects
      : [];
  const invitedProjects =
    invitedUserProjectsQuery.data && invitedUserProjectsQuery.data.data
      ? invitedUserProjectsQuery.data.data?.projects
      : [];

  const currentInvitedProjects = invitedProjects.slice(
    (invitedCurrentPage - 1) * ITEMS_PER_PAGE,
    invitedCurrentPage * ITEMS_PER_PAGE
  );

  const currentExploreProjects = projects
    .filter((project) => {
      if (!search) {
        return project;
      }
      return (
        project.projectName.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase())
      );
    })
    .slice(
      (exploreCurrentPage - 1) * ITEMS_PER_PAGE,
      exploreCurrentPage * ITEMS_PER_PAGE
    );

  console.log({ projects });
  return (
    <section className="mt-6 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 ">
      <div className="flex gap-4 items-center">
        <Image src={'/home.svg'} alt="home icon" width={20} height={20} />
        <Image
          src={'/chevron-right.svg'}
          alt="chevron-right icon"
          width={16}
          height={16}
        />
        <Description
          title="Bid Management"
          className="font-base text-slateGray"
        />
        <Image
          src={'/chevron-right.svg'}
          alt="chevron-right icon"
          width={16}
          height={16}
        />

        <Description
          title="Find a project"
          className="font-semibold text-lavenderPurple cursor-pointer underline"
        />
      </div>

      <div className="p-5 rounded-lg shadow-lg bg-white mt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <SenaryHeading
              title="Find a project "
              className="text-[#344054] text-[20px] leading-7 font-semibold"
            />

            <SenaryHeading
              title={` as Sub-Contractor`}
              className="text-[#344054] text-[20px] leading-7 font-normal"
            />
          </div>

          <div className="flex-1 flex items-center justify-end  space-x-2">
            <div className="!w-96">
              <InputComponent
                label=""
                type="text"
                placeholder="Search"
                name="search"
                prefix={<SearchOutlined size={20} />}
                field={{
                  value: search,
                  onChange(e) {
                    setSearch(e.target.value);
                  },
                }}
              />
            </div>
            <WhiteButton
              text="Export"
              icon="/uploadcloud.svg"
              className="!w-28"
              iconwidth={14}
              iconheight={14}
            />
            <div className="relative">
              <WhiteButton
                text="Advance Filters"
                icon="/advance-filters.svg"
                className="!w-44"
                iconwidth={14}
                iconheight={14}
                onClick={toggleFilters}
              />
              <BidFilters
                onApply={(appliedFilters) => {
                  setFilters(appliedFilters);
                }}
                onCancel={closeFilters}
                isVisible={showFilters}
              />
            </div>
            <CustomButton
              text="Post a Project"
              icon="/plus.svg"
              iconwidth={14}
              iconheight={14}
              className="!w-44"
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3">
          <div className={`${selectedBid ? 'col-span-8' : 'col-span-12 '}`}>
            <div className="my-3">
              <SenaryHeading
                title="Invited"
                className="text-[#344054]  font-semibold text-[20px] leading-7"
              />

              {invitedUserProjectsQuery.isLoading ? (
                <Skeleton />
              ) : (
                currentInvitedProjects.map((bidProject) => {
                  return (
                    <BidIntro
                      key={bidProject._id}
                      bid={bidProject}
                      onClick={() => setSelectedBid(bidProject)}
                      isSelected={selectedBid?._id === bidProject._id}
                    />
                  );
                })
              )}

              <div className="mt-1 flex justify-center">
                <Pagination
                  current={invitedCurrentPage}
                  pageSize={ITEMS_PER_PAGE}
                  total={invitedProjects.length}
                  onChange={(page) => setInvitedCurrentPage(page)}
                />
              </div>
            </div>

            <div className="mt-3">
              <SenaryHeading
                title="Explore all project"
                className="text-[#344054]  font-semibold text-[20px] leading-7"
              />

              {projectsQuery.isLoading ? (
                <Skeleton />
              ) : (
                currentExploreProjects
                  .filter((project) => project.status !== 'draft')
                  .filter((bidProject) => {
                    if (filters.trades.length > 0 || filters.projectValue > 0) {
                      if (isArrayString(bidProject.selectedTrades)) {
                        return (
                          _.intersection(
                            bidProject.selectedTrades,
                            filters.trades
                          ).length > 0 ||
                          bidProject.projectValue >= filters.projectValue
                        );
                      }
                    }
                    return true;
                  })
                  .map((bidProject) => {
                    return (
                      <BidIntro
                        key={bidProject._id}
                        bid={bidProject}
                        onClick={() => setSelectedBid(bidProject)}
                        isSelected={selectedBid?._id === bidProject._id}
                      />
                    );
                  })
              )}
            </div>
          </div>

          {/* Side Modal */}
          {selectedBid ? (
            <div className="col-span-4 py-[24px] px-[17px] rounded-lg mt-3 border border-[#E9E9EA]">
              <BidDetails bid={selectedBid} />
            </div>
          ) : null}
        </div>
        <div className="mt-1 flex justify-center">
          <Pagination
            current={exploreCurrentPage}
            pageSize={ITEMS_PER_PAGE}
            total={projects.length}
            onChange={(page) => setExploreCurrentPage(page)}
          />
        </div>
      </div>
    </section>
  );
}

export default withAuth(BidManagementSubContractorPage);
