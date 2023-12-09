'use client';
import { Fragment } from 'react';
import Heading from '@/app/component/customHeading/heading';
import Paragraph from '@/app/component/customParagraph/paragraph';
import Button from '@/app/component/customButton/button'
import {
    quaternaryHeading,
    quinaryHeading,
    senaryHeading,
} from '@/globals/tailwindvariables';
import Image from 'next/image';
import { existingClients } from './data';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();

    return (
        <>
            <section className="pt-5 px-5 ">
                <div className="flex justify-between items-center border-b-Gainsboro">
                    <div>
                        <Heading
                            title="Existing Clients"
                            styledVars={quaternaryHeading}
                            classes="text-graphiteGray font
            -bold"
                        />
                        <Paragraph
                            title="Select any existing client from here."
                            styledVars={quinaryHeading}
                            classes="text-coolGray"
                        />
                    </div>
                    <Image
                        src={'/closeicon.svg'}
                        alt="close icon"
                        width={24}
                        height={24}
                        className="cursor-pointer"
                        onClick={() => router.push('takeoff')}
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
                <div className="rounded-md border-2 border-lightGrayishBlue m-1">
                    <div
                        className="px-4 py-2
                 border-t-lightGrayishBlue
                 bg-paleGrayishWhite border border-l-lightGrayishBlue"
                    >
                        <Heading
                            title="Name"
                            classes="font-medium text-graphiteGray"
                            styledVars={senaryHeading}
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
                                        <Paragraph
                                            title={name}
                                            styledVars={senaryHeading}
                                            classes="text-darkSteelBlue"
                                        />
                                    </label>
                                </div>
                            </Fragment>
                        );
                    })}
                </div>
            </section>
            <div className="h-px bg-paleGrayishWhite w-full my-6"></div>
            <div className=' px-5 flex justify-end gap-4'>
                <div>
                    <Button
                        text='Cancel'
                        className='!bg-snowWhite !text-abyssalBlack'
                        onClick={() => router.push("/estimates/requests/takeoff")}
                    />
                </div>
                <div>
                    <Button
                        text='Next  '
                    />
                </div>
            </div>
        </>

    );
};

export default Page;
