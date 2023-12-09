import CustomButton from '@/app/component/customButton/button';
import Heading from '@/app/component/customHeading/heading';
import Paragraph from '@/app/component/customParagraph/paragraph';
import { quinaryHeading, secondaryHeading } from '@/globals/tailwindvariables';
import Image from 'next/image';
const Create = () => {
    return (
        <>

            <div
                className="grid place-items-center   p-5 
            border-silverGray shadow-secondaryTwist 
        
        "
            >
                <div
                    className="rounded-lg border-2
        shadow-secondaryTwist w-[563px] h-auto py-2
        flex flex-col items-center  gap-3  px-5 
        "
                >
                    <Image
                        src={'/takeoff.svg'}
                        alt="createicon"
                        width={134}
                        height={134}
                        className="mt-6 mb-12"
                    />
                    <Heading
                        title="No take off Record"
                        classes="text-obsidianBlack2"
                        styledVars={secondaryHeading}
                    />
                    <Paragraph
                        title="Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
                        styledVars={quinaryHeading}
                        classes="text-steelGray text-center mb-6"
                    />
                    <CustomButton text="Create your TakeOff" />
                </div>
            </div>
        </>
    );
};

export default Create;