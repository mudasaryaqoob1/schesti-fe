'use client'
import CustomButton from '@/app/component/customButton/button';
import Heading from '@/app/component/customHeading/heading';
import Paragraph from '@/app/component/customParagraph/paragraph';
import { quinaryHeading, secondaryHeading } from '@/globals/tailwindvariables';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
const NoData = () => {
    const router = useRouter()
    return (
        <>
            <div
                className="pt-11  px-10 grid place-items-center border-5 border-silverGray
        shadow-secondaryTwist"
            >
                <div
                    className="rounded-lg border border-silverGray
        shadow-secondaryTwist w-[563px] h-[533px]
        flex flex-col items-center justify-between my-5 p-5 gap-2
        "
                >
                    <Image
                        src={'/createrequest.png'}
                        alt="create request icon"
                        width={224}
                        height={224}
                    />
                    <Heading
                        title="There is no estimate request"
                        classes="text-obsidianBlack2"
                        styledVars={secondaryHeading}
                    />
                    <Paragraph
                        title="Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
                        styledVars={quinaryHeading}
                        classes="text-steelGray text-center"
                    />
                    <CustomButton text="Create new estimates request" onClick={() => router.push("/estimates/requests/takeoff")} />
                </div>
            </div>
        </>
    );
};

export default NoData;
