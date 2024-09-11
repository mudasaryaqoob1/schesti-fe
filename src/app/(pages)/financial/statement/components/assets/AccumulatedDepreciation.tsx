import TertiaryHeading from '@/app/component/headings/tertiary';
import { Table } from 'antd';
import { type ColumnsType } from 'antd/es/table';

export function AccumulatedDepreciationTable() {
  const columns: ColumnsType<{}> = [
    { title: 'Accumulated Depreciation', dataIndex: 'name' },
    { title: 'Amount', dataIndex: 'amount' },
  ];
  return (
    <Table
      columns={columns}
      dataSource={[{ name: 'Accum Dep’n Vehicles', amount: 3873.12 }]}
      footer={() => (
        <div className="w-full flex justify-around">
          <TertiaryHeading
            title="Total Accumulated Depreciation"
            className="text-schestiPrimaryBlack"
          />
          <TertiaryHeading
            title="$45,873.12"
            className="text-schestiPrimaryBlack"
          />
        </div>
      )}
      bordered
      pagination={false}
    />
  );
}
