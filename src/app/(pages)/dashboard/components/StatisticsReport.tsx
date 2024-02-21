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
const colors = {
    Takeoff: '#7F56D9',
    Estimate: '#EF9F28',
    Scheduled: '#36B37E',
}
export function StatisticsReport() {
    const config: LineConfig = {
        data,
        xField: 'type',
        yField: 'value',
        sizeField: 'value',
        legend: true,
        colorField: 'category',
        // color: ({ category }: { category: string }) => {
        //     if (category === categories[0]) {
        //         return colors.Takeoff;
        //     } else if (category === categories[1]) {
        //         return colors.Estimate;
        //     }
        //     return colors.Scheduled;

        // },
        style: {
            color: Object.values(colors)
        }
    };
    return <Line {...config} />;
}