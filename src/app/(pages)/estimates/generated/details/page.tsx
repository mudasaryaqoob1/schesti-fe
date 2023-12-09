import CustomButton from '@/app/component/customButton/button'
import Description from '@/app/component/description'
import QuaternaryHeading from '@/app/component/headings/quaternary'
import TertiaryHeading from '@/app/component/headings/tertiary'
import Image from 'next/image'
import MinDesc from './../../../component/desc/minDesc'
import { Backgrounder } from '@/globals/tailwindvariables'

const page = () => {
    return (
        <>
            <section className='md:mx-16 mx-8'>
                {/* scope */}
                <article className={`${Backgrounder} md:flex hidden justify-center w-full my-5 mb-5 p-5`}>
                    {/*  */}
                    <div className='flex flex-col'>
                        {/* // stepbase*/}
                        <div className='flex items-center'>
                            <Image src={"/purpletick.svg"} alt="tick icon" width={40} height={40} />
                            <div className="line bg-[#7F56D9] h-[2px] w-[250px]"></div>
                            <Image src={"/recordwhite.svg"} alt="recordwhite icon" width={40} height={40} />
                            <div className="bg-[#7F56D9] h-[2px] w-[250px]"></div>
                            {/* // */}
                        </div>
                        {/* content */}
                        <div className='flex items-center mt-4 justify-between'>
                            <div className='text-center'>
                                <Description title='Take off' className='text-graphiteGray font-semibold' />
                                <Description title='measurements' className='text-slateGray font-normal' />
                            </div>
                            <div className='text-center ms-12'>
                                <Description title='Scope' className='text-supremePurple font-semibold' />
                                <Description title='Add all of your scope' className='text-lavenderPurple font-normal' />
                            </div>
                            <div className='text-center ms-12'>
                                <Description title='Summary' className='text-graphiteGray font-semibold' />
                                <Description title='Confirm all the details' className='text-slateGray font-normal' />
                            </div>
                        </div>
                    </div>
                    {/*  */}
                </article>
                {/*  */}
                <div className="flex justify-between items-center mb-3">
                    <TertiaryHeading
                        title="Take Off Measurements"
                        className="text-graphiteGray font-semibold"
                    />
                    <div className='flex gap-3 items-center lg:w-3/12'>
                        <CustomButton
                            text="Cancel"
                            className="!text-graphiteGray !bg-snowWhite !shadow-scenarySubdued border-2 border-solid border-celestialGray"
                        />

                        <CustomButton
                            text="Next"
                            className='!w-full'
                        />
                    </div>

                </div>
                {/* middle */}
                <div className={`${Backgrounder} p-5 md:h-80 h-full my-2`}>
                    <div className="flex justify-between items-center">
                        <QuaternaryHeading
                            title="Estimate Details"
                            className="text-graphiteGray font-bold"
                        />
                        <div className='bg-silverGray rounded-s border border-solid border-Gainsboro cursor-pointer p-2'>
                            <Image src={"/chevron-down.svg"} alt='icon' width={16} height={16} />
                        </div>
                    </div>
                    {/*  */}
                    <div className='mt-4 grid md:grid-cols-4 md:grid-rows-2 auto-cols-auto gap-y-6'>
                        {/* 1 */}
                        <div>
                            <MinDesc
                                title="Company Name"
                                className='font-popin text-[16px] text-lightyGray font-normal'
                            />
                            <MinDesc
                                title="Albert Flores"
                                className='font-popin text-[16px] text-midnightBlue mt-[6px]'
                            />
                        </div>
                        {/* 2 */}
                        <div>
                            <MinDesc
                                title="Company Name"
                                className='font-popin font-normal text-[16px] text-lightyGray'
                            />
                            <MinDesc
                                title="Jenny Wilson"
                                className='font-popin text-[16px] text-midnightBlue mt-[6px]'
                            />
                        </div>
                        {/* 3 */}
                        <div>
                            <MinDesc
                                title="Phone Number"
                                className='font-popin text-[16px] font-normal text-lightyGray'
                            />
                            <MinDesc
                                title="(938) 861-8764"
                                className='font-popin text-[16px] text-midnightBlue mt-[6px]'
                            />
                            <div className='flex items-center gap-1'>
                                <MinDesc
                                    title="(938) 861-8764"
                                    className='font-popin text-[16px] text-midnightBlue '
                                /><MinDesc
                                    title="(Alternate)"
                                    className='font-popin text-[16px] text-lightyGray'
                                />
                            </div>
                        </div>
                        {/* 4 */}
                        <div>
                            <MinDesc
                                title="Email"
                                className='font-popin text-[16px]font-normal text-lightyGray'
                            />
                            <MinDesc
                                title="james@example.com"
                                className='font-popin text-[16px] text-midnightBlue mt-[6px]'
                            />
                            <div className='flex items-center gap-2'>
                                <MinDesc
                                    title="james@example.com"
                                    className='font-popin text-[16px] text-midnightBlue'
                                /><MinDesc
                                    title="(Alternate)"
                                    className='font-popin text-[16px] text-lightyGray'
                                />
                            </div>
                        </div>
                        {/* 5 */}
                        <div>
                            <MinDesc
                                title="Project name"
                                className='font-popin font-normal text-[16px] text-lightyGray'
                            />
                            <MinDesc
                                title="Bessie Cooper"
                                className='font-popin text-[16px] text-midnightBlue mt-[6px]'
                            />
                        </div>
                        {/* 6 */}
                        <div>
                            <MinDesc
                                title="Sale person"
                                className='font-popin font-normal text-[16px] text-lightyGray'
                            />
                            <MinDesc
                                title="Ralph Edwards"
                                className='font-popin text-[16px] text-midnightBlue mt-[6px]'
                            />
                        </div>
                        {/* 7 */}
                        <div>
                            <MinDesc
                                title="Estimator"
                                className='font-popin  font-normal text-[16px] text-lightyGray'
                            />
                            <MinDesc
                                title="Leslie Alexander"
                                className='font-popin text-[16px] text-midnightBlue mt-[6px]'
                            />
                        </div>
                        {/* 8 */}
                        <div>
                            <MinDesc
                                title="Address"
                                className='font-popin font-normal text-[16px] text-lightyGray'
                            />
                            <MinDesc
                                title="2118 Thornridge Cir. Syracuse, Connecticut 35624"
                                className='font-popin text-[16px] text-midnightBlue mt-[6px]'
                            />
                        </div>
                    </div>
                </div>
                {/*  */}
                {/* takeoff */}
                <div className={`${Backgrounder} p-5 h-80`}>
                    <div className={`flex justify-between items-center`}>
                        <QuaternaryHeading
                            title="Take off"
                            className="text-graphiteGray font-bold"
                        />
                        <div className='bg-silverGray rounded-s border border-solid border-Gainsboro cursor-pointer p-2'>
                            <Image src={"/chevron-down.svg"} alt='icon' width={16} height={16} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page