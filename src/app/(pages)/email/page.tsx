'use client';
import React, { useState } from 'react';
import convenienceStore from './data.json';

// module imports
import Button from '@/app/component/customButton/button';
import PrimaryHeading from '@/app/component/headings/primary';
import { Pagination } from 'antd';
import WhiteButton from '@/app/component/addBidButton/button';

const EmailModal = () => {



    return (
        <>
            <div className="h-[calc(100vh-100px)] grid place-items-center mt-7">
                <section className="bg-white shadow-md w-11/12 lg:w-95">
                    <div className="container mx-auto px-6">
                        <div className="px-2 py-4 flex justify-between items-center">
                            <div className="flex items-center">
                                <PrimaryHeading title="Find a project as Sub-contractor" />
                            </div>
                            <div className="flex items-center">
                                <div className="relative">
                                    <input type="text" placeholder="Search..." className="border border-gray-300 rounded-md px-4 py-2 pl-10 focus:outline focus:border-indigo-500" />
                                    <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8 0a8 8 0 015.656 13.657l4.95 4.95a1 1 0 11-1.414 1.414l-4.95-4.95A8 8 0 118 0zm0 2a6 6 0 100 12A6 6 0 008 2z" />
                                    </svg>
                                </div>
                                <WhiteButton
                                    text="Export"
                                    icon={
                                        <svg className="h-5 w-5" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"
                                        > <path stroke="none" d="M0 0h24v24H0z" /> <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" /> <polyline points="9 15 12 12 15 15" /> <line x1="12" y1="12" x2="12" y2="21" />
                                        </svg>
                                    }
                                    className="whitespace-nowrap !p-[12px] mx-2 text-gray-700"
                                    type="submit"
                                />
                                <WhiteButton
                                    text="Advance Filters"
                                    icon={
                                        <svg className="h-6 w-6" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="4" y1="6" x2="20" y2="6" /> <line x1="6" y1="12" x2="18" y2="12" /> <line x1="8" y1="18" x2="16" y2="18" /> </svg>
                                    }
                                    className="whitespace-nowrap !p-[12px] mx-2 text-gray-700"
                                    type="submit"
                                />
                                <Button text="Post a project" icon={
                                    <svg className="h-6 w-6 text-white-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="5" y1="12" x2="19" y2="12" /></svg>
                                } className="whitespace-nowrap !p-[12px] mx-2" type="submit" />
                            </div>
                        </div>
                    </div>
                </section>

            </div >
        </>
    );
};

export default EmailModal;