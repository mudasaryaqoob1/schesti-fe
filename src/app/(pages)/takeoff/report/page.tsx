import Button from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import {
    bg_style,
} from '@/globals/tailwindvariables';
import Image from 'next/image';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import SecondaryHeading from '@/app/component/headings/Secondary';
import Description from '@/app/component/description';

const page = () => {
    return (
        <>
            <section className="md:px-16 px-8 pb-4">
                <div className="flex gap-4 items-center mt-6">
                    <Image src={'/home.svg'} alt="home icon" width={20} height={20} />
                    <Image
                        src={'/chevron-right.svg'}
                        alt="chevron-right icon"
                        width={16}
                        height={16}
                    />
                    <SenaryHeading
                        title="Takeoff"
                        className="font-base text-slateGray"
                    />
                    <Image
                        src={'/chevron-right.svg'}
                        alt="chevron-right icon"
                        width={16}
                        height={16}
                    />

                    <SenaryHeading
                        title="Add new client"
                        className="font-semibold text-lavenderPurple cursor-pointer underline"
                    />
                </div>
                {/* search project */}
                <div className="bg-white flex justify-between items-center mt-6 ">
                    <div
                        className="rounded-lg border border-Gainsboro bg-silverGray  h-[51px] 
                        flex 
                        items-center
                            px-3"
                    >
                        <input
                            type="search"
                            name=""
                            id=""
                            placeholder="Enter project name"
                            className="w-full h-full
          bg-transparent outline-none"
                        />
                    </div>
                    <div>
                        <Button
                            text="With AI"

                        //   onClick={() => router.push('/createclient')}
                        />
                    </div>
                    <div>
                        <Button
                            text="Generate Report"
                            icon="/plus.svg"
                            iconwidth={20}
                            iconheight={20}
                        //   onClick={() => router.push('/createclient')}
                        />
                    </div>
                </div>
                {/* icons */}
                <div className={`flex justify-center items-center gap-3 rounded-lg px-2 py-1 mt-5 pt-5 ${bg_style}`}>
                    <Image
                        src={'/export.svg'}
                        alt="export icon"
                        width={24}
                        height={24}
                        className="cursor-pointer"
                    />
                    <Image
                        src={'/palmofthehand.svg'}
                        alt="hand icon"
                        width={24}
                        height={24}
                        className="cursor-pointer"
                    />
                    <Image
                        src={'/emoji.svg'}
                        alt="emoji icon"
                        width={24}
                        height={24}
                        className="cursor-pointer"
                    />
                    <Image
                        src={'/record.svg'}
                        alt=" record icon"
                        width={24}
                        height={24}
                        className="cursor-pointer"
                    />
                </div>
                {/* drag and drop */}
                <div className={`grid place-items-center shadow-sceneryShadow rounded-lg mt-4 ${bg_style} h-[580px] `}>
                    {/*  */}
                    <div className="md:min-w-[493px] flex items-center flex-col gap-2 justify-center shadow-sceneryShadow rounded-lg">
                        <Image
                            src={'/uploadcloud.svg'}
                            alt="upload icon"
                            width={80}
                            height={80}
                        />
                        <SecondaryHeading
                            title="Drag and Drop here"
                            className="cursor-pointer text-graphiteGray"
                        />
                        <Description
                            title="or"
                            className="cursor-pointer text-coolGray"
                        />
                        <label htmlFor="fileInput" className='w-full mt-2 cursor-pointer'>
                            <input
                                type="file"
                                id="fileInput"
                                name="fileInput"
                                className="hidden"
                            />
                            <WhiteButton
                                className='w-full'
                                text='Select file'
                            />
                        </label>
                    </div>
                </div>
            </section>
        </>
    );
};

export default page;