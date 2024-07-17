import React from 'react'
import Image from 'next/image'

const Invited = () => {
    return (
        <div className="w-full col-span-2 items-center mb-4 shadow rounded-xl p-2 bg-white relative">

            <div className="flex gap-2 profile-section">
                <div className='relative'>
                    <Image src='/role.png' alt='role' width={36} height={36} />
                    <Image src='/role.png' className='absolute bottom-1 border border-white -right-1' alt='verified' width={10} height={10} />
                </div>
                <div className=''>
                    <p className='text-ebonyClay font-semibold text-sm'>Khafizova E.</p>
                    <p className='text-#1D2939 mt-0.5 text-[10px]'>deanna.curtis@example.com</p>
                </div>
            </div>

            <div className='mt-2 flex justify-between items-center'>
                <p className='text-monsoon text-[10px]'>Invited on:</p>
                <p className='text-[10px] text-rangoonGreen font-medium mt-0.5'>26-04-2024</p>
            </div>

            <div className="flex gap-4 justify-between mt-3">
                <button className='text-[8px] cursor-pointer py-2 w-1/2 px-2 rounded-lg border border-schestiPrimary text-schestiPrimary bg-transparent font-semibold '>Decline </button>
                <button className='text-[8px] cursor-pointer py-2 w-1/2 px-2 rounded-lg bg-schestiPrimary font-semibold text-white'>Send Reminder </button>
            </div>
        </div>
    )
}

export default Invited