import TertiaryHeading from '@/app/component/headings/tertiary';
// import { bidManagementService } from '@/app/services/bid-management.service';
import { RootState } from '@/redux/store';
import { Table } from 'antd';
// import { Pagination, Table } from 'antd';
// import { useState } from 'react';
// import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

export function ProjectDesignTeam() {
  // export function ProjectDesignTeam({projectId}:any) {
  const bid = useSelector(
    (state: RootState) => state.bidManagementOwner.project
  );

  // const [paginationSettings, setPaginationSettings] = useState<{
  //   page: number;
  //   limit: number;
  // }>({
  //   page: 1,
  //   limit: 3
  // });

  // const fetchProjectDetails = async () => {
  //   return bidManagementService.httpGetOwnerProjectById(projectId, paginationSettings);
  // };
  // const { data, isLoading } = useQuery(['project-details', paginationSettings.page, paginationSettings.limit], fetchProjectDetails);
  // const paginationInfo = data && data.data && data.data.project
  //   ? data.data
  //   : { currentPage: 0, pages: 0, totalRecords: 0, perPage: 0 };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];
  return (
    <div className=" mt-6 mb-4 md:ms-[69px] md:me-[59px] mx-4  p-5 bg-white rounded-lg border shadow-lg">
      <div>
        <TertiaryHeading
          title="Design Team"
          className="text-[20px] leading-[30px]"
        />
      </div>

      <div className="mt-5">
        <Table
          columns={columns}
          bordered
          dataSource={bid ? bid.teamMembers : []}
          // pagination={false}
        />
      </div>
      <div className="mt-1 flex justify-center">
        {/* <Pagination
        current={paginationSettings.page}
        pageSize={paginationSettings.limit}
        total={typeof paginationInfo === 'object' ? paginationInfo.totalRecords || 0 : 0}
        onChange={(page) => {
          setPaginationSettings({ ...paginationSettings, page: page });
        }}
        /> */}
      </div>
    </div>
  );
}
