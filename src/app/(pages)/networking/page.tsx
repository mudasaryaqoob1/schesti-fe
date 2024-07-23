'use client';
import React, { useState } from 'react'
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import SearchFilters from './components/SearchFilters';
import SchestiNetwork from './components/SchestiNetwork';
import MyNetwork from './components/MyNework';
import Invited from './components/Invited';

const networkInfo = [
    {
        title: 'Schesti Network',
        Component: <SchestiNetwork />
    },
    {
        title: 'My Network',
        Component: <MyNetwork />
    },
    {
        title: 'Invited',
        Component: <Invited />
    }
];


const Networking = () => {
    const [currentNetwork, setCurrentNetwork] = useState(0)


    const Networks = [SchestiNetwork, MyNetwork, Invited];
    const NetworkComponent = Networks[currentNetwork];

    return (
        <section className="my-4 grid grid-cols-6 mx-8 px-4 gap-6">
            <div className="col-span-2 w-full">
                <SearchFilters />
            </div>
            <div className='col-span-4'>
                <div className="w-full flex gap-3 col-span-2 items-center mb-4 shadow rounded-xl p-2 bg-white">
                    {
                        networkInfo.map(({ title }, i) => (
                            <button key={i} onClick={() => setCurrentNetwork(i)} className={twMerge(clsx('text-sm cursor-pointer bg-transparent text-graphiteGray py-2 px-3 rounded-md', i === currentNetwork && 'bg-schestiPrimary text-white font-semibold'))}>{title}</button>
                        ))
                    }

                </div>
                <NetworkComponent />
            </div>
        </section>

    )
}

export default Networking