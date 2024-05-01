'use client';
import WhiteButton from '@/app/component/customButton/white';
import { InputComponent } from '@/app/component/customInput/Input';
import Description from '@/app/component/description';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import { withAuth } from '@/app/hoc/withAuth';
import { SearchOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { BidProjectDetail } from './components/BidProjectDetail';
import { IBidManagement } from '@/app/interfaces/bid-management/bid-management.interface';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { bidManagementService } from '@/app/services/bid-management.service';
import { BidDetails } from './components/BidDetails';
import { Pagination, Skeleton } from 'antd';
import { BidFilters } from './components/Filters';
import _, { size } from 'lodash';
import { isArrayString } from '@/app/utils/typescript.utils';

// const PDFDownloadLink = dynamic(
//   () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
//   {
//     ssr: false,
//     loading: () => <p>Loading...</p>,
//   },
// );
// import dynamic from 'next/dynamic';
// import BidListPdf from './components/bids-pdf';

const ITEMS_PER_PAGE = 5;

function BidManagementSubContractorPage() {

  const [selectedBid, setSelectedBid] = useState<IBidManagement | null>(null);
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProjectSavedBid, setSelectedProjectSavedBid] = useState<any>(null);
  const [filters, setFilters] = useState<{
    trades: string[];
    projectValue: number;
    page: number;
    limit: number;
  }>({
    trades: [],
    projectValue: 0,
    page: 1,
    limit: ITEMS_PER_PAGE
  });

  const [invitedfilters, setInvitedfilters] = useState<{
    trades: string[];
    projectValue: number;
    page: number;
    limit: number;
  }>({
    trades: [],
    projectValue: 0,
    page: 1,
    limit: ITEMS_PER_PAGE
  });


  function toggleFilters() {
    setShowFilters(!showFilters);
  }
  function closeFilters() {
    setShowFilters(false);
  }

  const fetchProjects = () => {
    return bidManagementService.httpGetOwnerProjects(filters);
  };

  const fetchInvitedProjects = () => {
    return bidManagementService.httpGetBidProjectInvitedUsers(invitedfilters);
  };


  const projectsQuery = useQuery(['bid-projects', filters.page, filters.limit, filters.projectValue, filters.trades], fetchProjects);
  const invitedUserProjectsQuery = useQuery(['invited-user-projects', invitedfilters.page, invitedfilters.limit], fetchInvitedProjects);

  const projects =
    projectsQuery?.data && projectsQuery?.data?.data
      ? projectsQuery.data.data.records
      : [];

  const paginationInfo = projectsQuery.data && projectsQuery.data.data
    ? projectsQuery.data.data.paginationInfo
    : { currentPage: 0, pages: 0, totalRecords: 0, perPage: 0 };

  const invitedPaginationInfo = invitedUserProjectsQuery.data && invitedUserProjectsQuery.data.data
    ? invitedUserProjectsQuery.data.data.paginationInfo
    : { currentPage: 0, pages: 0, totalRecords: 0, perPage: 0 };


  const invitedProjects =
    invitedUserProjectsQuery.data && invitedUserProjectsQuery.data.data
      ? invitedUserProjectsQuery.data.data?.records
      : [];

  const currentInvitedProjects = invitedProjects.slice(
    (invitedfilters.page - 1) * invitedfilters.limit,
    invitedfilters.page * invitedfilters.limit
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
      (filters.page - 1) * filters.limit,
      filters.page * filters.limit
    );

  // const dataToExport = currentExploreProjects.filter((project) => {
  //   if (search === '') {
  //     return project;
  //   }
  //   return (
  //     project.projectName.toLowerCase().includes(search.toLowerCase()) ||
  //     project.city.toLowerCase().includes(search.toLowerCase()) ||
  //     project.stage.toLowerCase().includes(search.toLowerCase())
  //   );
  // });

  const bidClickHandler = async (selectedBid: any) => {
    setSelectedBid(selectedBid);

    try {
      const { data } = await bidManagementService.httpGetProjectSavedBids(
        selectedBid._id
      );
      console.log('data', data);
      if (data) {
        setSelectedProjectSavedBid(data?.projectBid);
      }
    } catch (err) {
      console.error('Error fetching project saved bids:', err);
    }
  };



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

          <div className="flex-1 flex items-center justify-end space-x-2">
            <div className="!w-96">
              <InputComponent
                label=""
                type="text"
                placeholder="Search"
                name="search"
                inputStyle={'h-[57px] !mt-0'}
                prefix={<SearchOutlined size={20} />}
                field={{
                  value: search,
                  onChange(e) {
                    setSearch(e.target.value);
                  },
                }}
              />
            </div>
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
                  //@ts-ignore
                  setFilters(appliedFilters);
                  closeFilters();
                  console.log('You click to apply filter');
                }}
                onCancel={closeFilters}
                isVisible={showFilters}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3">
          <div className={`${selectedBid ? 'col-span-8' : 'col-span-12 '}`}>
            <div className="my-3">
              {size(currentInvitedProjects) > 0 && (
                <SenaryHeading
                  title="Invited"
                  className="text-[#344054]  font-semibold text-[20px] leading-7"
                />
              )}
              {invitedUserProjectsQuery.isLoading ? (
                <Skeleton />
              ) : (
                currentInvitedProjects.map((bidProject) => {
                  return (
                    <BidProjectDetail
                      key={bidProject._id}
                      bid={bidProject}
                      onClick={() => bidClickHandler(bidProject)}
                      isSelected={selectedBid?._id === bidProject._id}
                      selectedBid={selectedBid}
                    />
                  );
                })
              )}

              {size(invitedProjects) >= 5 && (
                <div className="mt-1 flex justify-center">
                  <Pagination
                    current={invitedfilters.page}
                    pageSize={invitedfilters.limit}
                    total={invitedPaginationInfo.totalRecords}
                    onChange={(page) => setInvitedfilters(prevFilters => ({ ...prevFilters, page }))}
                  />
                </div>
              )}
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
                      <BidProjectDetail
                        key={bidProject._id}
                        bid={bidProject}
                        onClick={() => bidClickHandler(bidProject)}
                        isSelected={selectedBid?._id === bidProject._id}
                        selectedBid={selectedBid}
                      />
                    );
                  })
              )}
            </div>
          </div>

          {/* Side Modal */}
          {selectedBid ? (
            <div className="col-span-4 py-[24px] px-[17px] rounded-lg mt-3 border border-[#E9E9EA]">
              <BidDetails
                bid={selectedBid}
                selectedProjectSavedBid={selectedProjectSavedBid}
                setSelectedProjectSavedBid={setSelectedProjectSavedBid}
                bidClickHandler={() => bidClickHandler(selectedBid)}
              />
            </div>
          ) : null}
        </div>
        {size(projects) >= 5 && (
          <div className="mt-1 flex justify-center">
            <Pagination
              current={filters.page}
              pageSize={filters.limit}
              total={paginationInfo.totalRecords}
              onChange={(page) => setInvitedfilters(prevFilters => ({ ...prevFilters, page }))}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default withAuth(BidManagementSubContractorPage);
