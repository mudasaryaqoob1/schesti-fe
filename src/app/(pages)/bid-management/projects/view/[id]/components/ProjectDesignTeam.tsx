import TertiaryHeading from '@/app/component/headings/tertiary';
import { RootState } from '@/redux/store';
import { Table } from 'antd';
import { useSelector } from 'react-redux';

export function ProjectDesignTeam() {
  const bid = useSelector(
    (state: RootState) => state.bidManagementOwner.project
  );

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
        />
      </div>
      <div className="mt-1 flex justify-center">
      </div>
    </div>
  );
}
