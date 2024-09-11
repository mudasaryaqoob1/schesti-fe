import TertiaryHeading from '@/app/component/headings/tertiary';
import Table, { type ColumnsType } from 'antd/es/table';

export function OperatingIncomeTable() {
  const columns: ColumnsType<{}> = [
    { title: 'Operating Income', dataIndex: 'name' },
    { title: 'Amount', dataIndex: 'amount' },
  ];
  return (
    <Table
      columns={columns}
      dataSource={[{ name: 'Contract Home', value: '$45,873.12' }]}
      footer={() => (
        <div className="w-full flex justify-around">
          <TertiaryHeading
            title="Total Operating Income"
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
