'use client';
import React from 'react';
import UserPosts from '../../social-media/components/post/UserPosts';
import ProfileIntro from './components/Profile';

const UserProfile = () => {
  return (
    <section className="my-4 mx-8 px-4 gap-6">
      <h6 className="text-lg font-semibold text-graphiteGray">User Profile</h6>
      <ProfileIntro fetchPosts={() => setFetchPosts((prev) => !prev)} />
      <UserPosts fetchPosts={fetchPosts} />
    </section>
  );
};

export default UserProfile;
