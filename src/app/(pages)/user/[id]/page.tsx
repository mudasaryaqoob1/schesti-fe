'use client';
import React, { useCallback, useEffect, useState } from 'react';
import UserPosts from '../../social-media/components/post/UserPosts';
import { useParams } from 'next/navigation';
import Loader from '@/app/component/loader';
import { userService } from '@/app/services/user.service';
import Intro from './components/Intro';
import { IUserInterface } from '@/app/interfaces/user.interface';

const UserProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState<IUserInterface>(
    {} as IUserInterface
  );
  const [fetchUser, setFetchUser] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const getUserDetail = useCallback(async () => {
    setIsLoading(true);
    const { data } = await userService.httpGetCompanyInfo(id as string);
    setUserData(data.user);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (id) {
      getUserDetail();
    }
  }, [id, fetchUser]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="my-4 mx-8 px-4 gap-6">
      <h6 className="text-lg font-semibold text-graphiteGray">User Profile</h6>
      <Intro
        name={userData.socialName || userData.name}
        avatar={userData.socialAvatar || userData.avatar}
        fetchUser={() => setFetchUser((prev) => !prev)}
      />
      <UserPosts />
    </section>
  );
};

export default UserProfile;
