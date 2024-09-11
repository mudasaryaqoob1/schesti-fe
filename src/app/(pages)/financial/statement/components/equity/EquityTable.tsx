import TertiaryHeading from '@/app/component/headings/tertiary';
import Table, { type ColumnsType } from 'antd/es/table';

export function EquityTable() {
  const columns: ColumnsType<{}> = [
    { title: 'Equity/Capital', dataIndex: 'name' },
    { title: 'Amount', dataIndex: 'amount' },
  ];
  return (
    <Table
      columns={columns}
      dataSource={[
        { name: 'Capital Stock', value: '$45,873.12' },
        { name: 'Other Paid in Capital', value: '697.58' },
        { name: 'Retained Earnings', value: '697.58' },
      ]}
      footer={() => (
        <div className="w-full flex justify-around">
          <TertiaryHeading
            title="Subtotal Equity/Capital"
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
