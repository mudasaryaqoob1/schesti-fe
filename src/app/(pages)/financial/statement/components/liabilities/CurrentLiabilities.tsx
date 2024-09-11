import TertiaryHeading from '@/app/component/headings/tertiary';
import Table, { type ColumnsType } from 'antd/es/table';

export function CurrentLiabilitiesTable() {
  const columns: ColumnsType<{}> = [
    { title: 'Current Liabilities', dataIndex: 'name' },
    { title: 'Amount', dataIndex: 'amount' },
  ];
  return (
    <Table
      columns={columns}
      dataSource={[
        {
          name: 'Trade accounts Payable',
          amount: 45873.12,
        },
        {
          name: 'State Payroll Taxes Payable',
          amount: 697.58,
        },
        {
          name: 'Health Insurance Payable',
          amount: 697.58,
        },
        {
          name: 'Credit Cards',
          amount: 697.58,
        },
      ]}
      footer={() => (
        <div className="w-full flex justify-around">
          <TertiaryHeading
            title="Total Current Liabilities"
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
