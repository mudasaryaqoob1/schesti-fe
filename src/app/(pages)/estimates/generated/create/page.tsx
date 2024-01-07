'use client';
import { useState } from 'react';
import Description from '@/app/component/description';
import Image from 'next/image';
import { TakeOff, Scope, Summary, } from '../components';

const Generated = () => {
    const [prevNext, setPrevNext] = useState(0);
    console.log({ prevNext });
    const Estimates = [TakeOff, Scope, Summary];
    const EstimateComponent = Estimates[prevNext];
    return (
        <div className="md:px-16 px-5 pb-8">
            <article
                className="p-5 md:flex hidden justify-center w-full  shadow-secondaryTwist rounded-xl 
        border border-solid border-silverGray mt-8  mb-6  
        "
            >
                {/*  */}
                <div className="flex flex-col pt-[15px]">
                    {/* // stepbase*/}
                    <div className="flex items-center ">
                        <Image
                            src={'/tickpurple.svg'}
                            alt="tick icon"
                            width={40}
                            height={40}
                        />
                        <div className="line bg-[#7F56D9] h-[2px] w-[250px]"></div>
                        <Image
                            src={'/contentpurple.svg'}
                            alt="recordwhite icon"
                            width={40}
                            height={40}
                        />
                        <div className="bg-[#7F56D9] h-[2px] w-[250px]"></div>
                        {/* // */}
                        <Image
                            src={'/contentwhite.svg'}
                            alt="recordwhite icon"
                            width={40}
                            height={40}
                        />
                    </div>
                    {/* content */}
                    <div className="flex items-center  justify-between">
                        <div className="text-center">
                            <Description
                                title="Take off"
                                className="text-graphiteGray font-semibold"
                            />
                            <Description
                                title="measurements"
                                className="text-slateGray font-normal"
                            />
                        </div>
                        <div className="text-center ms-12">
                            <Description
                                title="Scope"
                                className="text-supremePurple font-semibold"
                            />
                            <Description
                                title="Add all of your scope"
                                className="text-lavenderPurple font-normal"
                            />
                        </div>
                        <div className="text-center ms-12">
                            <Description
                                title="Summary"
                                className="text-graphiteGray font-semibold"
                            />
                            <Description
                                title="Confirm all the details"
                                className="text-slateGray font-normal"
                            />
                        </div>
                    </div>
                </div>
                {/*  */}
            </article>
            <EstimateComponent setPrevNext={setPrevNext} />
        </div>
    );
};

export default Generated;
