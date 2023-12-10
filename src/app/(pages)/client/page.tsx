'use client';
import Button from '@/app/component/customButton/button';
import Table from '../../component/table/clients/index';
import { useRouter } from 'next/navigation';
import Pagination from '../../component/pagination';
import { clientHeading } from './data';
import TertiaryHeading from '@/app/component/headings/tertiary';
const Client = () => {
  const router = useRouter();
  return (
    <section className="pt-2.5 pb-3 px-12">
      <div className="p-5 rounded-s-xl border border-silverGray">
        <div className="flex justify-between items-center mb-3">
          <TertiaryHeading
            title="Client List"
            className="text-graphiteGray"
          />
          <Button
            text="Add New client"
            className="!w-auto "
            icon="plus.svg"
            iconwidth={20}
            iconheight={20}
            onClick={() => router.push('/client/create')}
          />
        </div>
        <Table headings={clientHeading} />
        <Pagination />
      </div>
    </section>
  );
};

export default Client;
