import Paragraph from '@/app/component/customparagraph/paragraph';
import Button from '@/app/component/customButton/button';
import {
    quaternaryHeading,
    secondaryHeading,
    senaryHeading,
} from '@/globals/tailwindvariables';
import Image from 'next/image';
import Heading from '@/app/component/customheading/heading';

const page = () => {
    return (
        <>
            <section className="px-16">
                <div className="flex gap-4 items-center my-6">
                    <Image src={'/home.svg'} alt="home icon" width={20} height={20} />
                    <Image
                        src={'/chevron-right.svg'}
                        alt="chevron-right icon"
                        width={16}
                        height={16}
                    />
                    <Paragraph
                        title="My Client"
                        styledVars={senaryHeading}
                        className="font-base text-slateGray"
                    />
                    <Image
                        src={'/chevron-right.svg'}
                        alt="chevron-right icon"
                        width={16}
                        height={16}
                    />

                    <Paragraph
                        title="Add new client"
                        styledVars={senaryHeading}
                        className="font-semibold text-lavenderPurple cursor-pointer underline"
                    />
                </div>
                {/* search project */}
                <div className="flex justify-between items-center mb-4">
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
                            icon="plus.svg"
                            iconwidth={20}
                            iconheight={20}
                        //   onClick={() => router.push('/createclient')}
                        />
                    </div>
                </div>
                {/* icons */}
                <div className="flex justify-center items-center gap-3 rounded-lg">
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
                <div className="grid place-items-center h-screen shadow-sceneryShadow rounded-lg mt-4">
                    {/*  */}
                    <div className="flex items-center flex-col gap-2 justify-center shadow-sceneryShadow rounded-lg">
                        <Image
                            src={'/uploadcloud.svg'}
                            alt="upload icon"
                            width={86}
                            height={86}
                        />
                        <Heading
                            title="Drag and Drop here"
                            styledVars={secondaryHeading}
                            className="cursor-pointer text-graphiteGray"
                        />
                        <Paragraph
                            title="or"
                            styledVars={secondaryHeading}
                            className="cursor-pointer text-coolGray"
                        />
                        <label htmlFor="fileInput" className="relative cursor-pointer">
                            <input
                                type="file"
                                id="fileInput"
                                name="fileInput"
                                className="hidden"
                                style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
                            />
                            <div className="bg-transparentp-2 rounded-md">
                                {/* Your custom label or icon can go here */}
                                <p className={`${quaternaryHeading} text-pitchBlack`}>
                                    Select file
                                </p>
                            </div>
                        </label>
                    </div>
                </div>
            </section>
        </>
    );
};

export default page;