'use client';
import Button from '@/app/component/customButton/button';
import Heading from '@/app/component/customHeading/heading';
import { tertiaryHeading } from '@/globals/tailwindvariables';
import Table from '../../component/table/clients/index';
import { useRouter } from 'next/navigation';
import Pagination from '../../component/pagination';
import { clientHeading } from './data';
const Client = () => {
  const router = useRouter();
  return (
    <section className="pt-2.5 pb-3 px-12">
      <div className="p-5 rounded-s-xl border border-silverGray">
        <div className="flex justify-between items-center mb-3">
          <Heading
            styledVars={tertiaryHeading}
            title="Client List"
            classes="text-graphiteGray"
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
