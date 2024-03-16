'use client';
import { HttpService } from '@/app/services/base.service';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { Contractors } from '../components/contractors';
import { withAuth } from '@/app/hoc/withAuth';

function StandardInvoicingPage() {
  const token = useSelector(selectToken);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  return (
    <section className="mt-6 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl ">
      <div className="w-full mb-4">
        <Contractors />
      </div>
    </section>
  );
}

export default withAuth(StandardInvoicingPage)