'use client';
import CustomButton from '@/app/component/customButton/button';
import Description from '@/app/component/description';
import SecondaryHeading from '@/app/component/headings/Secondary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {
  btnText: string;
  link: string;
};
const NoData = ({ btnText, link }: Props) => {
  const router = useRouter();
  return (
    <div
      className="px-10 grid place-items-center border-5 border-silverGray
        shadow-secondaryTwist bg-white mx-16 mt-[46px] rounded-lg "
    >
      <div
        className="rounded-lg py-2 px-4  max-w-[563px]  
        flex flex-col items-center justify-between my-5 p-5 gap-2
        "
      >
        <div className="bg-lightGray rounded-full h-56 w-56 flex justify-center items-center">
          <Image
            src={'/estimateempty.svg'}
            alt="create request icon"
            width={100}
            height={100}
          />
        </div>
        <SecondaryHeading
          title="There is no estimate request"
          className="text-obsidianBlack2 mt-8"
        />
        <Description
          title="Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
          className="text-steelGray text-center mb-7"
        />
        <CustomButton text={btnText} onClick={() => router.push(link)} />
      </div>
    </div>
  );
};

export default NoData;
