'use client';
import React, { useState } from 'react';
import tableData from './data.json';

// module imports
import Button from '@/app/component/customButton/button';
import PrimaryHeading from '@/app/component/headings/primary';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { Pagination } from 'antd';

const BidManagementBiddingTeam = () => {

    const [activeTab, setActiveTab] = React.useState("bidding-team");

    // Pagination
    const itemsPerPage = 8;
    const [tablePage, setTablePage] = useState<number>(1);

    const handleTeamPageChange = (pageNumber: number) => {
        setTablePage(pageNumber);
    }

    const startTableIndex = (tablePage - 1) * itemsPerPage;
    const endTableIndex = Math.min(startTableIndex + itemsPerPage, tableData.length);

    return (
        <>
            <div className="h-[calc(100vh-100px)] grid place-items-center mt-7">
                <section className="bg-white shadow-md w-full px-10">
                    <div className="container mx-auto px-6">
                        <div className="px-2 py-4 flex justify-between items-center">
                            <div className="grid items-center">
                                <PrimaryHeading title="Seabreeza Village comercial Developemnst - convenience store" />
                                <div className='text-gray-500 pe-4 flex justify-start items-center space-x-4'>
                                    <p className='flex p-font-size'>Creation Date: 05/22/2023 @ 06:37 AM</p>
                                    <p className='flex p-font-size'>Bid Date: 06/05/2023 12:00 AM EST</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Button text="Submit a bid" className="whitespace-nowrap !p-[12px] mx-2" type="submit" />
                            </div>
                        </div>
                        <div>
                            <Tabs value={activeTab}>
                                <TabsHeader
                                    className="rounded-none bg-transparent p-0 space-x-4"
                                    indicatorProps={{
                                        className: "bg-transparent-2 border-gray-900 shadow-none rounded-none",
                                    }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                >
                                    {tableData.map((tab, index) => (
                                        <Tab key={index} value={tab.value !== undefined ? tab.value?.toString() : ""} onClick={() => setActiveTab(tab.value !== undefined ? tab.value.toString() : "")} className={activeTab === tab.value ? "whitespace-nowrap width-xl height-xl foundation-primary-700" : "whitespace-nowrap width-xl height-xl"} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{tab.label}</Tab>
                                    ))}
                                </TabsHeader>
                                <TabsBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} className='hidden'>
                                    {tableData.map((tab, index) => (
                                        <TabPanel key={index} value={tab.value !== undefined ? tab.value : ""}>{tab.label}</TabPanel>
                                    ))}
                                </TabsBody>
                            </Tabs>
                        </div>
                    </div>
                </section >

                <section className="bg-white shadow-md w-11/12 lg:w-95 mt-5 rounded-md">
                    <div className="container mx-auto p-5">
                        <section className="w-12/12 lg:w-95">
                            <div className="container mx-auto">
                                {tableData.map(({ value, label }) => (
                                    activeTab === value && (
                                        <>
                                            <h4 className='text-gray-700 gap-6'>{label}</h4>
                                        </>
                                    )
                                ))}
                                <div className="relative overflow-x-auto border border-graylighty mt-5">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-cosmicGray dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 border border-gray-300">
                                                    <div className="flex items-center justify-between">Name<a href="#">
                                                        <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                        </svg>
                                                    </a>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 border border-gray-300">
                                                    <div className="flex items-center justify-between">Role<a href="#">
                                                        <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                        </svg>
                                                    </a>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 border border-gray-300">
                                                    <div className="flex items-center justify-between">Company<a href="#">
                                                        <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                        </svg>
                                                    </a>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 border border-gray-300">
                                                    <div className="flex items-center justify-between">Location<a href="#">
                                                        <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                        </svg>
                                                    </a>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 border border-gray-300">
                                                    <div className="flex items-center justify-between">Phone<a href="#">
                                                        <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                        </svg>
                                                    </a>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 border border-gray-300">
                                                    <div className="flex items-center justify-between">Email<a href="#">
                                                        <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                        </svg>
                                                    </a>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            {tableData.slice(startTableIndex, endTableIndex).map((item, index) => (
                                                item.name && <tr key={index} className="bg-white dark:bg-gray-800 dark:border-gray-700 border">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</th>
                                                    <td className="px-6 py-4 border">{item.role}</td>
                                                    <td className="px-6 py-4 border">{item.company}</td>
                                                    <td className="px-6 py-4 border">{item.location}</td>
                                                    <td className="px-6 py-4 border">{item.phone}</td>
                                                    <td className="px-6 py-4 border">{item.email}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    <Pagination
                                        current={tablePage}
                                        total={tableData.length}
                                        pageSize={itemsPerPage}
                                        onChange={handleTeamPageChange}
                                        showSizeChanger={false}
                                        className="flex items-center justify-center custom-pagination my-5"
                                    />
                                </div>
                            </div>
                        </section >
                    </div>
                </section>
            </div >
        </>
    );
};

export default BidManagementBiddingTeam;