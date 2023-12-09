"use client"
import CustomButton from '@/app/component/customButton/button'
import TertiaryHeading from '@/app/component/headings/tertiary'
import { Backgrounder } from '@/globals/tailwindvariables';
import Image from 'next/image';
// import { useRouter } from 'next/navigation';
import { StyledWrapper } from './style';
// import AddItemTable from '@/app/component/table/(generatedestimate)/addnewItem/index';
import { AddItemData, headings } from './data'
import Description from '@/app/component/description/index';
import MinDesc from '@/app/component/description/minDesc'
import QuaternaryHeading from '@/app/component/headings/quaternary';
import QuinaryHeading from '@/app/component/headings/quinary';

const page = () => {
    return (
        <StyledWrapper>
            <section className="mx-16">
                {/* scope */}
                <article className="flex justify-center w-full mb-8 shadow-secondaryTwist rounded-xl bg-snowWhite
        border border-solid border-silverGray p-3 my-6
        ">
                    {/*  */}
                    <div className="flex flex-col">
                        {/* // stepbase*/}
                        <div className="flex items-center">
                            <Image
                                src={'/purpletick.svg'}
                                alt="tick icon"
                                width={40}
                                height={40}
                            />
                            <div className="line bg-[#7F56D9] h-[2px] w-[250px]"></div>
                            <Image
                                src={'/purpletick.svg'}
                                alt="tick icon"
                                width={40}
                                height={40}

                            />
                            <div className="bg-[#7F56D9] h-[2px] w-[250px]"></div>
                            <Image
                                src={'/recordwhite.svg'}
                                alt="recordwhite icon"
                                width={40}
                                height={40}
                            />
                            {/* // */}
                        </div>
                        {/* content */}
                        <div className="flex items-center mt-4 justify-between">
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

                <div className="flex justify-between items-center mb-3">
                    <TertiaryHeading
                        title="Scope"
                        className="text-graphiteGray font-semibold"
                    />
                    <div className="flex gap-3 items-center lg:w-3/12">
                        <CustomButton
                            text="previous"
                            className="!text-graphiteGray !bg-snowWhite !shadow-scenarySubdued 
              border-2 border-solid !border-celestialGray"
                        />

                        <CustomButton text="Next" className="!w-full" />
                    </div>
                </div>
                {/*center part  */}
                {/*  */}
                <div className={`${Backgrounder} p-5 mt-2`}>
                    <div className='flex justify-between items-center'>
                        <QuaternaryHeading title='Client Information' className='font-bold' />
                        <div className='bg-silverGray rounded-s border border-solid border-Gainsboro cursor-pointer'>
                            <Image src={"/chevron-down.svg"} alt='icon' width={16} height={16} />
                        </div>
                    </div>
                    <div className='grid grid-cols-6'>
                        {/* 1 */}
                        <div>
                            <QuinaryHeading title='Company Name' className='text-lightyGray' />
                            <Description title='Jenny Wilson' className='text-midnightBlue font-popin' />
                        </div>
                        {/* 2 */}
                        <div>
                            <QuinaryHeading title='Phone Number' className='text-lightyGray' />
                            <Description title='(938) 861-8764' className='text-midnightBlue font-popin' />
                        </div>
                        {/* 3 */}
                        <div>
                            <QuinaryHeading title='Email' className='text-lightyGray' />
                            <Description title='james@example.com' className='text-midnightBlue font-popin' />
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className={`${Backgrounder} p-5 mt-2`}>
                    <div className='flex justify-between items-center'>
                        <QuaternaryHeading title='Project Information' className='font-bold' />
                        <div className='bg-silverGray rounded-s border border-solid border-Gainsboro cursor-pointer'>
                            <Image src={"/chevron-down.svg"} alt='icon' width={16} height={16} />
                        </div>
                    </div>
                    <div className='grid grid-cols-6 grid-rows-2'>
                        {/* 1 */}
                        <div>
                            <QuinaryHeading title='Project Name' className='text-lightyGray' />
                            <Description title='ABC' className='text-midnightBlue font-popin' />
                        </div>
                        {/* 2 */}
                        <div>
                            <QuinaryHeading title='Lead Source' className='text-lightyGray' />
                            <Description title='Source 101' className='text-midnightBlue font-popin' />
                        </div>
                        {/* 2 */}
                        <div>
                            <QuinaryHeading title='Project Value' className='text-lightyGray' />
                            <Description title='5M' className='text-midnightBlue font-popin' />
                        </div>
                        {/* 3 */}
                        <div>
                            <QuinaryHeading title='Email' className='text-lightyGray' />
                            <Description title='james@example.com' className='text-midnightBlue font-popin' />
                        </div>
                        {/* 3 */}
                        <div className='col-span-full row-span-2'>
                            <QuinaryHeading title='Project Information' className='text-lightyGray' />
                            <Description title='Lorem ipsum dolor sit amet consectetur. Lobortis non malesuada bibendum nunc. Ultrices feugiat egestas tempus aliquam diam blandit. Aliquet nisl id aliquet eget. Hendrerit enim odio nullam ut pulvinar.' className='text-midnightBlue font-popin' />
                        </div>
                    </div>
                </div>
                {/* center part */}
                <div className={`${Backgrounder} p-5 mt-4`}>
                    <div className='flex items-center gap-2'>
                        <QuaternaryHeading title='DIV-03 - Concrete ' className='font-semibold' />
                        <Description title='Concrete - Building' className='text-lg font-normal' />
                    </div>
                    {/* <AddItemTable headings={headings} AddItem={AddItemData} /> */}
                </div>
                <div className={`${Backgrounder} p-5 mt-4`}>
                    <div className='flex items-center gap-2'>
                        <QuaternaryHeading title='DIV-03 - Concrete ' className='font-semibold' />
                        <Description title='Concrete - Building' className='text-lg font-normal' />
                    </div>
                    {/* <AddItemTable headings={headings} AddItem={AddItemData} /> */}
                </div>
                <div className={`${Backgrounder} p-5 mt-4`}>
                    <div className='flex items-center gap-2'>
                        <QuaternaryHeading title='DIV-03 - Concrete ' className='font-semibold' />
                        <Description title='Concrete - Building' className='text-lg font-normal' />
                    </div>
                    {/* <AddItemTable headings={headings} AddItem={AddItemData} /> */}
                </div>
                <div className='bg-celestialGray h-px  w-full my-2'></div>
                <div className='flex w-full justify-between flex-col gap-2 my-2'>
                    <div className='flex items-center justify-between'>
                        <MinDesc title='Sub Total Cost' />
                        <Description title='$6,000' />
                    </div>
                    <div className='flex items-center justify-between'>
                        <MinDesc title='Material Tax %' />
                        <Description title='$6,000' />
                    </div>
                    <div className='flex items-center justify-between'>
                        <MinDesc title='Overhead & Profit %' />
                        <Description title='$6,000' />
                    </div>
                    <div className='flex items-center justify-between'>
                        <MinDesc title='Bond Fee %' />
                        <Description title='$6,000' />
                    </div>
                </div>
                <div className='bg-celestialGray h-px w-full my-2'></div>
                <div className='flex items-center justify-between'>
                    <QuaternaryHeading title='Total Bid' />
                    <Description title='$20,000' />
                </div>
            </section>
        </StyledWrapper>
    );
};

export default page