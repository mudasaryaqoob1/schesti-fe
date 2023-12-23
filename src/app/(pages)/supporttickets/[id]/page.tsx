'use client'

import React from 'react'
import Image from 'next/image'

// module imports
import CustomNavbar from '@/app/component/customNavbar'
import Description from '@/app/component/description'
import QuinaryHeading from '@/app/component/headings/quinary'
import MinDescription from '@/app/component/description/minDesc'
import { senaryHeading } from '@/globals/tailwindvariables'
import ChatMessage from '../components/Message'
import ReplyMessage from '../components/Reply'
import CustomButton from '@/app/component/customButton/button'

const SupportTicketDetails = () => {
    return (
        <CustomNavbar>
            <section className='px-16 mt-6 pb-2'>
                <div className="flex justify-between items-center w-full">
                    <div className="flex gap-1 items-center ">
                        <Image src='/home.svg' alt="home icon" width={20} height={20} />
                        <Image
                            src='/chevron-right.svg'
                            alt="chevron-right icon"
                            width={16}
                            height={16}
                        />
                        <p className={`${senaryHeading} font-base text-slateGray`}>
                            Support Tickets
                        </p>
                        <Image
                            src='/chevron-right.svg'
                            alt="chevron-right icon"
                            width={16}
                            height={16}
                        />

                        <MinDescription
                            title="Ticket details"
                            className={`${senaryHeading} font-semibold text-lavenderPurple cursor-pointer underline`}
                        />
                    </div>
                    <p className='bg-lightblue rounded-xl px-2'>
                        <span className='text-xs text-darkblue font-normal p-1'>In Progress</span>
                    </p>
                </div>
                <div className='grid grid-cols-1 gap-y-6 sm:gap-x-6 sm:grid-cols-2 md:grid-cols-3 mt-6'>
                    <div className='shadow-primaryGlow rounded-2xl p-5'>
                        <p className='text-xs text-slateGray font-normal'>
                            Orignal Request
                        </p>
                        <div className='flex flex-col gap-4 mt-2'>
                            <Description title='Ticket # 2021-3565' className='text-steelGray font-semibold' />
                            <QuinaryHeading title=' Ac sit etiam velit, consequat est augue commodo non.' className='text-base font-medium' />
                            <p className='text-xs text-slateGray font-normal flex gap-1'>
                                <Image src='/calendar.svg' alt='date' width={12} height={12} />
                                Date: 12/02/2020
                            </p>
                            <Description className='text-steelGray'
                                title=' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suscipit pulvinar sit cras consectetur aenean sem mauris ipsum. Convallis molestie faucibus suspendisse praesent felis neque, sed et. Quis maecenas quisque phasellus massa, neque, volutpat. Ullamcorper a accumsan elit vel velit' />
                        </div>
                    </div>
                    <div className='shadow-primaryGlow rounded-2xl p-5 md:col-span-2'>
                        <div className="h-auto">
                            <div className="h-[56vh] overflow-y-auto">
                                <ChatMessage />
                                <ReplyMessage />
                            </div>
                            <footer className=" p-4 flex items-center gap-2">
                                <div className="relative w-[90%]">
                                    <input
                                        type="text"
                                        className="bg-gray-100 w-[100%] p-4 rounded-full outline-none font-poppin text-xs "
                                        placeholder="Please answer..."
                                    />
                                    <div className="flex gap-3 items-center absolute top-[20%] right-4">
                                        <Image width={24} height={24} src='/select-file.svg' alt="select file" />
                                        <div className='w-0.5 h-7 bg-darkGray' />
                                        <span>
                                            <CustomButton text='Reply' className='!bg-[#EF9F28] !py-1.5 !border-none' />
                                        </span>

                                    </div>
                                </div>


                            </footer>
                        </div>
                    </div>


                </div>
            </section>
        </CustomNavbar>

    )
}

export default SupportTicketDetails