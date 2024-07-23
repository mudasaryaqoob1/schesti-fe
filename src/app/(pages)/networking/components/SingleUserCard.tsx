import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { baseUrl } from '@/app/services/base.service'
import { networkingUrl } from '@/app/utils/apiUrls'
import { useDispatch } from 'react-redux'
import { SetMyNetwork, SetSchestiNetwork } from '@/redux/network/network.slice'

const SingleUserCard = ({ _id, name, userRole, avatar = null, myNetwork = false }: any) => {

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const addFriend = async () => {
        try {
            setIsLoading(true);
            await axios.put(baseUrl + networkingUrl + `addFriend/${_id}`);
            setIsLoading(false);
            dispatch(SetSchestiNetwork());
        } catch (error) {
            setIsLoading(false);
            console.log(error, 'error...')
        }
    }

    const removeFriend = async () => {
        try {
            setIsLoading(true);
            await axios.put(baseUrl + networkingUrl + `removeFriend/${_id}`);
            dispatch(SetMyNetwork());
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error, 'error...')
        }
    }

    return (
        <div className="w-full col-span-1 items-center mb-4 shadow rounded-xl p-2 bg-white relative">
            <div className='flex gap-1.5 items-center absolute right-2 top-2'>
                <Image src='/mail-03.svg' alt='role' width={13} height={16} />
                <button disabled={isLoading}>
                    <Image onClick={myNetwork ? removeFriend : addFriend} src='/plus-primary.svg' className='bg-schestiLightPrimary rounded-[23px] p-1' alt='role' width={14} height={14} />
                </button>
            </div>

            <div className="flex gap-2 profile-section">
                <div className='relative'>
                    <Image src={avatar ?? '/profileAvatar.png'} alt='role' className='rounded-full' width={36} height={36} />
                    <Image src='/verified.svg' className='absolute bottom-1 border border-white -right-1' alt='verified' width={10} height={10} />
                </div>
                <div className=''>
                    <p className='text-ebonyClay font-semibold text-sm'>{name}</p>
                    <p className='text-schestiPrimary mt-1 text-[8px] bg-schestiLightPrimary rounded-[163px] py-0.5 px-2'>{userRole}</p>
                </div>
            </div>

            <div className="contact-detail-section mt-2">
                <div className="flex items-center mt-0.5 gap-1.5">
                    <Image src='/user-01.svg' alt='role' width={12} height={12} />
                    <p className='text-ebonyClay text-xs'>Kashif Markes</p>
                </div>
                <div className="flex items-center mt-0.5 gap-1.5">
                    <Image src='/phone-call-01.svg' alt='role' width={12} height={12} />
                    <p className='text-ebonyClay text-xs'>(229) 555-0109</p>
                </div>
                <div className="flex items-center mt-0.5 gap-1.5">
                    <Image src='/mail-03.svg' alt='role' width={12} height={12} />
                    <p className='text-ebonyClay text-xs'>deanna.curtis@example.com</p>
                </div>
                <div className="flex items-center mt-0.5 gap-1.5">
                    <Image src='/users-01.svg' alt='role' width={12} height={12} />
                    <p className='text-xs text-goldenrodYellow border-b border-goldenrodYellow'>4 team members</p>
                </div>
            </div>

            <div className="address-section">

                <div className='mt-2'>
                    <p className='text-monsoon text-xs'>Company</p>
                    <p className='text-xs text-abyssalBlack font-medium mt-0.5'>UKco - United Kingdom Co.</p>
                </div>
                <div className='mt-2'>
                    <p className='text-monsoon text-xs'>Address</p>
                    <p className='text-xs text-abyssalBlack font-medium mt-0.5'>8502 Preston Rd. Inglewood.</p>
                </div>
            </div>


            <div className="matching-trades-section mt-3">
                <p className='text-monsoon text-xs'>Matching Trades (6):</p>
                <div className='flex gap-2 mt-1'>
                    <p className='text-graphiteGray mt-1 text-[8px] bg-schestiLightPrimary rounded-[163px] py-0.5 px-2'>Engineering</p>
                </div>
            </div>

            <div className="send-reminder-section flex justify-between mt-3">
                <p className='text-monsoon text-xs'>Send Reminder</p>
                <button className='text-[10px] cursor-pointer py-1 px-2 rounded-[163px] bg-schestiPrimary text-white'>Send Reminder <span>
                    <Image src='alarm-clock-check.svg' alt='alarm-clock' width={10} height={10} />
                </span></button>
            </div>


            <p className='text-sm text-ebonyClay mt-1'> Lorem ipsum is a placeholder text commonly used to demonstrate the visual</p>
        </div>
    )
}

export default SingleUserCard