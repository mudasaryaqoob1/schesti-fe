
import Image from 'next/image';
import React, { useState } from 'react'
import UpdateProfile from './UpdateProfile';
import { voidFc } from '@/app/utils/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useParams } from 'next/navigation';

type Props = {
    name: string;
    avatar: string;
    fetchUser: voidFc;
}
const Intro = ({ name = '', avatar = '/profileAvatar.png', fetchUser }: Props) => {
    const [showModal, setShowModal] = useState(false);
    const { id = '' } = useParams();
    const { user } = useSelector((state: RootState) => state.auth.user)

    return (
        <>
            <UpdateProfile name={name} avatar={avatar} showModal={showModal} setShowModal={setShowModal} fetchUser={fetchUser} />
            <div className='w-full mt-3.5 shadow rounded-xl p-6 bg-white flex justify-between'>
                <div className="flex gap-4 items-center">
                    <Image className='border rounded-full border-slate-300' width={42} height={42} src={avatar} alt={name} />

                    <div className="flex">
                        <p className='font-bold text-lg text-graphiteGray'>{name}</p>
                    </div>
                </div>
                {
                    user._id === id && (
                        <Image onClick={() => setShowModal(true)} width={20} height={20} src='/edit.svg' className='cursor-pointer' alt='edit' />
                    )
                }
            </div>
        </>
    )
}

export default Intro