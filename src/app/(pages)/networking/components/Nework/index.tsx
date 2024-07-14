import React from 'react'
import { Tabs, Radio } from 'antd';
import type { TabsProps } from 'antd';
import type { RadioChangeEvent } from 'antd';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import MyNetwork from './MyNetwork';

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Contractor',
        children: 'Content of Tab Pane 1',
    },
    {
        key: '2',
        label: 'Sub-contractor',
        children: 'Content of Tab Pane 1',
    },
    {
        key: '3',
        label: 'Estimator',
        children: 'Content of Tab Pane 2',
    },
    {
        key: '4',
        label: 'Vendor',
        children: 'Content of Tab Pane 4',
    },
];

const networkInfo = [
    {
        title: 'Schesti Network',
        isActive: true
    },
    {
        title: 'My Network',
        isActive: false
    },
    {
        title: 'Invited',
        isActive: false
    }
];

const Network = () => {

    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <div className='col-span-3'>
            <div className="w-full flex gap-3 col-span-2 items-center mb-4 shadow rounded-xl p-2 bg-white">
                {
                    networkInfo.map(({ title, isActive }, i) => (
                        <button className={twMerge(clsx('text-sm cursor-pointer bg-transparent text-graphiteGray py-2 px-3 rounded-md', isActive && 'bg-schestiPrimary text-white font-semibold'))}>{title}</button>
                    ))
                }

            </div>
            <Tabs defaultActiveKey="1" className='text-slateGray text-sm' items={items} onChange={onChange} />
            <div className="w-full flex gap-3 col-span-2 items-center mb-4 shadow rounded-xl p-2 bg-white">
                <MyNetwork />
            </div>
        </div>
    )
}

export default Network