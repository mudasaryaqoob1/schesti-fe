'use client';
import Image from 'next/image';
import Table from '@/app/component/table/table';
import { clientHeading } from './data';
import Button from '@/app/component/customButton/button';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { Dispatch } from 'react';
interface Props {
  setShowAddUser: Dispatch<React.SetStateAction<boolean>>;
}
const Index = ({ setShowAddUser }: Props) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <TertiaryHeading title="User Managements" />
        <Button
          text="Invite new user"
          className="!w-auto "
          icon="/plus.svg"
          iconwidth={20}
          iconheight={20}
          onClick={() => setShowAddUser(true)}
        />
      </div>
      <article className="bg-snowWhite rounded-2xl shadow-instentWhite py-5 px-6">
        <div
          className="rounded-lg border border-Gainsboro
                     bg-silverGray w-[464px] h-[40px] 
                      my-5 flex items-center gap-2 px-3.5 py-2.5"
        >
          <Image
            src={'/search.svg'}
            alt="search icon "
            width={16}
            height={16}
            className="cursor-pointer"
          />
          <input
            type="search"
            name=""
            id=""
            placeholder="Search..."
            className="w-full h-full bg-transparent outline-none"
          />
        </div>
        <Table headings={clientHeading} />
        <div className="flex my-6 justify-between">
          {/* dropdown */}
          <div>dropdown</div>
          {/* pagination */}
          <div>pagination</div>
        </div>
      </article>
    </div>
  );
};

export default Index;
