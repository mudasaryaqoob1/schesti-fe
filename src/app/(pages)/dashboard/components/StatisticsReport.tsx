import { Line, type LineConfig } from '@ant-design/plots';
let categories = [
    "Takeoff",
    "Estimate",
    "Scheduled",
] as const;

let data: { type: string, value: number | string }[] = [
    { type: "Jan", value: 700 },
    { type: "Feb", value: 300 },
    { type: "Mar", value: 400 },
    { type: "Apr", value: 600 },
    { type: "May", value: 300 },
    { type: "Jun", value: 100 },
    { type: "Jul", value: 300 },
    { type: "Aug", value: 700 },
    { type: "Sep", value: 400 },
    { type: "Oct", value: 600 },
    { type: "Nov", value: 300 },
    { type: "Dec", value: 100 }
];
data = data.map((item, index) => {
    let categoryIndex = index % categories.length;
    return { ...item, value: `$${item.value}`, category: categories[categoryIndex] }
});
export function StatisticsReport() {
    const config: LineConfig = {
        data,
        xField: 'type',
        yField: 'value',
        sizeField: 'value',
        colorField: 'category',
    };
    return <Line {...config} />;
}