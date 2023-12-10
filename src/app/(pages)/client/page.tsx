'use client';
import Button from '@/app/component/customButton/button';
import Table from '../../component/table/clients/index';
import { useRouter } from 'next/navigation';
import Pagination from '../../component/pagination';
import { clientHeading } from './data';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { backgrounder } from '@/globals/tailwindvariables';
const Client = () => {
  const router = useRouter();
  return (
    <section className="mt-6 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl ">
      <div className={`${backgrounder} p-5 border border-solid border-silverGray`}>
        <div className="flex justify-between items-center">
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
