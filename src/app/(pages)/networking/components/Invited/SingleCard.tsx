import React, { useState } from 'react'
import Image from 'next/image'
import moment from 'moment'
import axios from 'axios'
import { baseUrl } from '@/app/services/base.service'
import { networkingUrl } from '@/app/utils/apiUrls'
import { useDispatch } from 'react-redux'
import { SetInvitedClient } from '@/redux/network/network.slice'

type Props = {
    invitedOn: string, invitedEmail: string
}
const InvitedCard = ({ invitedOn, invitedEmail }: Props) => {

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const removeInvitedClient = async () => {
        try {
            setIsLoading(true);
            await axios.put(baseUrl + networkingUrl + `removeInvitedClient/${invitedEmail}`);
            setIsLoading(false);
            dispatch(SetInvitedClient());
        } catch (error) {
            setIsLoading(false);
            console.log(error, 'error...')
        }
    }

    return (
        <div className="w-full col-span-2 items-center mb-4 shadow rounded-xl p-2 bg-white relative">

            <div className="flex gap-2 profile-section items-center">
                <Image src='/profileAvatar.png' alt={invitedEmail} width={36} height={36} />
                <p className='text-#1D2939 mt-0.5 text-[10px]'>{invitedEmail}</p>
            </div>

            <div className='mt-2 flex justify-between items-center'>
                <p className='text-monsoon text-[10px]'>InvitedCard on:</p>
                <p className='text-[10px] text-rangoonGreen font-medium mt-0.5'>{moment(invitedOn).format('DD-YY-YYYY')}</p>
            </div>

            <div className="flex gap-4 justify-between mt-3">
                <button disabled={isLoading} className='text-[8px] cursor-pointer py-2 w-1/2 px-2 rounded-lg border border-schestiPrimary text-schestiPrimary bg-transparent font-semibold' onClick={removeInvitedClient}>{isLoading ? 'Decline...' : 'Decline'} </button>
                <button className='text-[8px] cursor-pointer py-2 w-1/2 px-2 rounded-lg bg-schestiPrimary font-semibold text-white'>Send Reminder </button>
            </div>
        </div>
    )
}

export default InvitedCard