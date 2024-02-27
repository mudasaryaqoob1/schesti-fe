import { Column, type ColumnConfig } from '@ant-design/plots';
let data: { type: string; value: number | string }[] = [
  { type: 'Jan', value: 700 },
  { type: 'Feb', value: 300 },
  { type: 'Mar', value: 400 },
  { type: 'Apr', value: 600 },
  { type: 'May', value: 300 },
  { type: 'Jun', value: 100 },
  { type: 'Jul', value: 300 },
  { type: 'Aug', value: 700 },
  { type: 'Sep', value: 400 },
  { type: 'Oct', value: 600 },
  { type: 'Nov', value: 300 },
  { type: 'Dec', value: 100 },
];
data = data.map((item) => ({ ...item, value: `$${item.value}` }));
export default function InvoiceReport() {
  const config: ColumnConfig = {
    data,
    xField: 'type',
    yField: 'value',
    colorField: '#7138DF',
    style: {
      radius: 50,
      width: 10,
    },
  };
  return <Column {...config} />;
}
