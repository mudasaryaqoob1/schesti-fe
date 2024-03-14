import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect } from "react";

const NotLoggedIn = () => {
  const router = useRouter();
  const paths = usePathname();

  useEffect(() => {
    const arr = ['/login'];
    if (!arr.includes(paths)) {
      router.push('/login');
    }
  }, []);
  return <></>;
};

export default NotLoggedIn;
