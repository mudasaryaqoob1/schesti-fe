import type { ColumnConfig } from '@ant-design/plots';

export const data1 = [
    {
        name: 'London',
        month: 'Jan.',
        amount: 18.9,
        type: 'payable',
    },
    {
        name: 'London',
        month: 'Feb.',
        amount: 28.8,
        type: 'recieveable',
    },
    {
        name: 'London',
        month: 'Mar.',
        amount: 39.3,
        type: 'recieveable', // Example type added
    },
    {
        name: 'London',
        month: 'Apr.',
        amount: 81.4,
        type: 'payable', // Example type added
    },
    {
        name: 'London',
        month: 'May',
        amount: 47,
        type: 'payable', // Example type added
    },
    {
        name: 'London',
        month: 'Jun.',
        amount: 20.3,
        type: 'recieveable', // Example type added
    },
    {
        name: 'London',
        month: 'Jul.',
        amount: 24,
        type: 'recieveable', // Example type added
    },
    {
        name: 'London',
        month: 'Aug.',
        amount: 35.6,
        type: 'payable', // Example type added
    },
    {
        name: 'Berlin',
        month: 'Jan.',
        amount: 12.4,
        type: 'payable', // Example type added
    },
    {
        name: 'Berlin',
        month: 'Feb.',
        amount: 23.2,
        type: 'recieveable', // Example type added
    },
    {
        name: 'Berlin',
        month: 'Mar.',
        amount: 34.5,
        type: 'recieveable', // Example type added
    },
    {
        name: 'Berlin',
        month: 'Apr.',
        amount: 99.7,
        type: 'payable', // Example type added
    },
    {
        name: 'Berlin',
        month: 'May',
        amount: 52.6,
        type: 'recieveable', // Example type added
    },
    {
        name: 'Berlin',
        month: 'Jun.',
        amount: 35.5,
        type: 'payable', // Example type added
    },
    {
        name: 'Berlin',
        month: 'Jul.',
        amount: 37.4,
        type: 'recieveable', // Example type added
    },
    {
        name: 'Berlin',
        month: 'Aug.',
        amount: 42.4,
        type: 'recieveable', // Example type added
    },
];
const colors = ["#EF9F28", "#7F56D9"];

const newData = data1.map(obj => ({
    ...obj,
    color: colors[Math.floor(Math.random() * colors.length)],
}));
export const config1: ColumnConfig = {
    data: newData,
    xField: 'month',
    yField: 'amount',
    seriesField: 'type',
    style: {
        fill: ({ type }) => {
            return type === 'recieveable' ? '#7F56D9' : '#EF9F28';
        },
        radiusTopLeft: 50,
        radiusTopRight: 50,
        maxWidth: 20
    },
    height: 250,
};