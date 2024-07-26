import React, { useState } from 'react'
import Image from 'next/image'
import { AxiosError } from 'axios'
import { useDispatch } from 'react-redux'
import { SetMyNetwork, SetSchestiNetwork } from '@/redux/network/network.slice'
import ModalComponent from '@/app/component/modal'
import CustomEmailTemplate from '@/app/component/customEmailTemplete'
import { networkingService } from '@/app/services/networking.service'
import { toast } from 'react-toastify'

const SingleUserCard = ({ _id, name, userRole, avatar = null, myNetwork = false, phone, email, companyName = null, address, employee, selectedTrades = null }: any) => {

    const [isLoading, setIsLoading] = useState(false);
    const [emailModal, setEmailModal] = useState(false);
    const dispatch = useDispatch();

    const addFriend = async () => {
        try {
            setIsLoading(true);
            await networkingService.httpAddFriend(_id);
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
            await networkingService.httpRemoveFriend(_id);
            dispatch(SetMyNetwork());
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error, 'error...')
        }
    }

    const networkEmailSendHandler = async (bodyObject: FormData) => {
        bodyObject.delete('cc');

        try {
            const response =
                await networkingService.httpNetworkingEmailSender(bodyObject);

            if (response.statusCode == 200) {
                toast.success('Email sent successfully');
                setEmailModal(false);
            }
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            toast.error(err.response?.data.message || 'An error occurred');
        }
    };


    return (
        <div className="w-full col-span-1 items-center mb-4 shadow rounded-xl p-4 bg-white relative">
            <div className='flex gap-1.5 items-center absolute right-4 top-4'>
                <Image src='/mail-03.svg' className='cursor-pointer' onClick={() => setEmailModal(true)} alt='role' width={16} height={16} />
                <button onClick={myNetwork ? removeFriend : addFriend} disabled={isLoading} className='bg-schestiLightPrimary cursor-pointer flex justify-center items-center rounded-full p-1'>
                    <Image src={myNetwork ? '/minus.svg' : '/plus-primary.svg'} alt='role' style={{ width: '12px', height: '12px' }} width={0} height={0} />
                </button>
            </div>

            <div className="flex items-start gap-2 profile-section">
                <div className='relative'>
                    <Image src={avatar ?? '/profileAvatar.png'} alt='role' className='rounded-full' width={36} height={36} />
                    <Image src='/verified.svg' className='absolute bottom-1 border border-white -right-1' alt='verified' width={12} height={12} />
                </div>
                <div>
                    <p className='text-ebonyClay font-semibold text-sm w-[80%]'>{name}</p>
                    <p className='text-schestiPrimary mt-1 text-[8px] bg-schestiLightPrimary rounded-[163px] py-0.5 px-2'>{userRole}</p>
                </div>
            </div>

            <div className="contact-detail-section mt-2">
                {/* <div className="flex items-center mt-0.5 gap-1.5">
                    <Image src='/user-01.svg' alt='role' width={12} height={12} />
                    <p className='text-ebonyClay text-xs'>Kashif Markes</p>
                </div> */}
                <div className="flex items-center mt-0.5 gap-1.5">
                    <Image src='/phone-call-01.svg' alt='role' width={12} height={12} />
                    <p className='text-ebonyClay text-xs'>{phone ?? '...'}</p>
                </div>
                <div className="flex items-center mt-0.5 gap-1.5">
                    <Image src='/mail-03.svg' className='cursor-pointer' alt='role' width={12} height={12} />
                    <p className='text-ebonyClay text-xs'>{email}</p>
                </div>
                <div className="flex items-center mt-0.5 gap-1.5">
                    <Image src='/users-01.svg' alt='role' width={12} height={12} />
                    <p className='text-xs text-goldenrodYellow border-b border-goldenrodYellow'> {employee ? `${employee} team members` : '...'}</p>
                </div>
            </div>

            <div className="address-section">
                <div className='mt-2'>
                    <p className='text-monsoon text-xs'>Company</p>
                    <p className='text-xs text-abyssalBlack font-medium mt-0.5'>{companyName ?? '...'}</p>
                </div>
                <div className='mt-2'>
                    <p className='text-monsoon text-xs'>Address</p>
                    <p className='text-xs text-abyssalBlack font-medium mt-0.5'>{address ?? '...'}</p>
                </div>
            </div>

            {
                (selectedTrades && selectedTrades.length > 0) && (
                    <div className="matching-trades-section mt-3">
                        <p className='text-monsoon text-xs'>Matching Trades ({selectedTrades.length}):</p>
                        <div className='flex gap-2 flex-wrap mt-1'>
                            {
                                selectedTrades.map((trade: string, i: number) => (
                                    <p key={i} className='text-graphiteGray mt-1 text-[8px] bg-schestiLightPrimary rounded-[163px] py-0.5 px-2'>{trade}</p>
                                ))
                            }
                        </div>

                    </div>
                )
            }


            {/* <div className="send-reminder-section flex justify-between mt-3">
                <p className='text-monsoon text-xs'>Send Reminder</p>
                <button className='text-[10px] cursor-pointer py-1 px-2 rounded-[163px] bg-schestiPrimary text-white'>Send Reminder <span>
                    <Image src='alarm-clock-check.svg' alt='alarm-clock' width={10} height={10} />
                </span></button>
            </div> */}


            {/* <p className='text-sm text-ebonyClay mt-1'> Lorem ipsum is a placeholder text commonly used to demonstrate the visual</p> */}

            <ModalComponent setOpen={setEmailModal} open={emailModal}>
                <CustomEmailTemplate
                    to={email}
                    cc={false}
                    setEmailModal={setEmailModal}
                    submitHandler={networkEmailSendHandler}
                />
            </ModalComponent>
        </div>
    )
}

export default SingleUserCard