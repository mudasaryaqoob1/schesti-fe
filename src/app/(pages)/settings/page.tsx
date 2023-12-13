'use client';
import React, { useState } from 'react';
import VerticalsTabs from './components/verticalsTabs/index';
import General from './general/index';
import UserManagment from './usermanagment/index';
import AddNewUser from './adduser';
import CustomNavbar from '@/app/component/customNavbar';
const Page = () => {
  const [prevNext, setPrevNext] = useState(1);
  const [showAddUser, setShowAddUser] = useState(false);
  return (
    <CustomNavbar>
      <section className="md:px-16 px-8 pt-6 flex gap-4 items-start">
        <VerticalsTabs setPrevNext={setPrevNext} prevNext={prevNext} />
        {prevNext === 1 && <General />}
        {prevNext === 3 && (
          <>
            {!showAddUser && <UserManagment setShowAddUser={setShowAddUser} />}
            {showAddUser && <AddNewUser setShowAddUser={setShowAddUser} />}
          </>
        )}
      </section>
    </CustomNavbar>
  );
};

export default Page;
