'use client';
import React, { useCallback, useEffect, useState } from 'react'
import UserPosts from '../../social-media/components/post/UserPosts'
import CreatePost from '../../social-media/components/post/CreatePost';
import { useParams } from 'next/navigation';
import Loader from '@/app/component/loader';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { IUser } from '@/app/interfaces/companyEmployeeInterfaces/user.interface';
import { userService } from '@/app/services/user.service';

const UserProfile = () => {
    const { id } = useParams();
    const { user } = useSelector((state: RootState) => state.auth.user);
    const [userData, setUserData] = useState<IUser | null>(null);

    // const [isLoading, setIsLoading] = useState(false);
    // const getUserDetail = useCallback(async () => {
    //     setIsLoading(true);
    //     const { data } = await userService.httpGetCompanyDetail(id as string);
    //     setUserData(data.user);
    //     setIsLoading(false);
    // }, []);

    // useEffect(() => {
    //     if (id) {
    //         getUserDetail();
    //     }
    // }, [id]);


    console.log(userData, 'userData')
    if (!id) {
        return <Loader />
    }

    const isLoginUser = id === user._id;
    return (
        <section className="my-4 mx-8 px-4 gap-6">
            <h6 className='text-lg font-semibold text-graphiteGray'>User Profile</h6>
            {
                isLoginUser && (
                    <CreatePost />
                )
            }
            <UserPosts />
        </section>
    )
}

export default UserProfile