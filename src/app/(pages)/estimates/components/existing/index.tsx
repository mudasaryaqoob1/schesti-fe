'use client';
import { Fragment } from 'react';
import Button from '@/app/component/customButton/button';
import Image from 'next/image';
import { existingClients } from './data';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import QuinaryHeading from '@/app/component/headings/quinary';
import SecondaryHeading from '@/app/component/headings/Secondary';
import SenaryHeading from '@/app/component/headings/senaryHeading';
interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Existing = ({ setModalOpen }: Props) => {
  return (
    <div className="py-2.5 px-6 bg-white border border-solid border-elboneyGray rounded-[4px] z-50">
      <section className="w-full">
        <div className="flex justify-between items-center border-b-Gainsboro ">
          <div>
            <QuaternaryHeading
              title="Existing Clients"
              className="text-graphiteGray font-bold"
            />
            <QuinaryHeading
              title="Select any existing client from here."
              className="text-coolGray"
            />
          </div>
          <Image
            src={'/crossblack.svg'}
            alt="close icon"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={() => setModalOpen(false)}
          />
        </div>
        <div
          className="rounded-lg border border-Gainsboro bg-silverGray w-[335px] h-[40px] 
        my-5
        flex 
      items-center
      px-3"
        >
          <input
            type="search"
            name=""
            id=""
            placeholder="Search..."
            className="w-full h-full
         
          bg-transparent outline-none"
          />
          <Image
            src={'/search.svg'}
            alt="search icon "
            width={16}
            height={16}
            className="cursor-pointer"
          />
        </div>
        {/* Table */}
        <div className="rounded-md border-2 border-lightGrayishBlue ">
          <div
            className="px-4 py-2
                 border-t-lightGrayishBlue
                 bg-paleGrayishWhite border border-l-lightGrayishBlue"
          >
            <SecondaryHeading
              title="Name"
              className="font-medium text-graphiteGray"
            />
          </div>

          {existingClients.map(({ name, img }, i) => {
            return (
              <Fragment key={i}>
                <div
                  className="border-b-lightGrayishBlue
                 p-4 flex gap-5 items-center
                 bg-snowWhite border"
                >
                  <input
                    type="radio"
                    name="client name"
                    id="client name"
                    width={24}
                    height={24}
                    className="hidden"
                  />
                  <Image src={img} alt="client icon" width={30} height={30} />
                  <label htmlFor={name}>
                    <SenaryHeading
                      title={name}
                      className="text-darkSteelBlue"
                    />
                  </label>
                </div>
              </Fragment>
            );
          })}
        </div>
      </section>
      <div className="h-px bg-elboneyGray w-full mt-6"></div>
      <div className="px-5 flex justify-end gap-4 mt-5 mb-2">
        <div>
          <Button
            text="Cancel"
            className="!bg-snowWhite !text-abyssalBlack"
            onClick={() => setModalOpen(false)}
          />
        </div>
        <div>
          <Button text="Next" onClick={() => setModalOpen(false)} />
        </div>
      </div>
    </div>
  );
};

export default Existing;
