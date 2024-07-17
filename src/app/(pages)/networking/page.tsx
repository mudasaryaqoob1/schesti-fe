'use client';
import React from 'react'
import SearchFilters from './components/SearchFilters';
import Network from './components/Nework';
import Invited from './components/Nework/Invited';
import Search from './components/Search';
import type { TabsProps } from 'antd';
import { Tabs, Radio } from 'antd';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

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
const Networking = () => {
    const onChange = (key: string) => {
        console.log(key);
    };
    return (
        <section className="my-4 grid grid-cols-5 mx-8 px-4 gap-6">
            <div className="col-span-2">
                <SearchFilters />
            </div>
            <div className='col-span-3'>
                <div className="w-full flex gap-3 col-span-2 items-center mb-4 shadow rounded-xl p-2 bg-white">
                    {
                        networkInfo.map(({ title, isActive }, i) => (
                            <button key={i} className={twMerge(clsx('text-sm cursor-pointer bg-transparent text-graphiteGray py-2 px-3 rounded-md', isActive && 'bg-schestiPrimary text-white font-semibold'))}>{title}</button>
                        ))
                    }

                </div>
                <Tabs defaultActiveKey="1" className='text-slateGray text-sm' items={items} onChange={onChange} />
                <Search />
                <Network />
                <Invited />
            </div>
        </section>

    )
}

export default Networking