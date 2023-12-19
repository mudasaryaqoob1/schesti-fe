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
    <section className="mt-6 mx-4 rounded-xl h-[calc(100vh-200px)] grid items-center border border-solid border-silverGray shadow-secondaryTwist">
      <div className="grid place-items-center">
        <div className="max-w-[500px] flex flex-col items-center p-4">
          <div className='bg-lightGray p-12 rounded-full'>
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
            className="text-steelGray text-center font-normal"
          />
          <CustomButton className='mt-7' text={btnText} onClick={() => router.push(link)} />
        </div>
      </div>
    </section>

  );
};

export default NoData;
