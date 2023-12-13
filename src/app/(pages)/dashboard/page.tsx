'use client';

import UnderDevelop from '@/app/component/underDevelopement';
import Button from '@/app/component/customButton/button';
import React from 'react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();
  return (
    <div>
      <UnderDevelop title={'Dashboard'} />
      <div className="flex justify-center">
        <div className="w-20 ">
          <Button onClick={() => router.push('/login')} text="Login" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
