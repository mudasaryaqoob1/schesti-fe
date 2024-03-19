'use client';
import { Contractors } from '../components/contractors';
import { withAuth } from '@/app/hoc/withAuth';

function StandardInvoicingPage() {
  return (
    <section className="mt-6 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl ">
      <div className="w-full mb-4">
        <Contractors />
      </div>
    </section>
  );
}

export default withAuth(StandardInvoicingPage);
