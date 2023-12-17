'use client';
import Button from '@/app/component/customButton/button';
import SecondaryHeading from '@/app/component/headings/Secondary';
import QuinaryHeading from '@/app/component/headings/quinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
const Congratulations = () => {
  const router = useRouter();
  return (
    <section className="h-[100vh] grid place-items-center rounded-lg">
      <div
        className={`flex flex-col items-center shadow-quaternaryDrama w-[460px] 
       rounded-lg px-7 relative`}
      >
        <div
          className="rounded-s absolute top-3 right-3 block cursor-pointer
        active:border border-[gray]
        
        "
        >
          <Image
            src={'/closeicon.svg'}
            alt="modal icon"
            width={18}
            height={18}
          />
        </div>
        {/* logo */}
        <Image src={'/Modal.png'} alt="modal icon" width={200} height={100} />
        <SecondaryHeading
          className={'mt-[20px] mb-[12px'}
          title=" Congratulations!"
        />

        <QuinaryHeading
          className={'font-normal text-slateGray my-2'}
          title=" Your account is successfully created."
        />
        <Button
          text={'Okay!'}
          className="my-3"
          onClick={() => router.push('/clients')}
        />
      </div>
    </section>
  );
};

export default Congratulations;
