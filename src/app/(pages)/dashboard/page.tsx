import React from 'react';
import Login from '@/app/(pages)/(auth)/login/page';
import withAuth from '@/app/hoc/with_auth';
const Dashboard = () => {
  return <Login />;
};

export default withAuth(Dashboard);
