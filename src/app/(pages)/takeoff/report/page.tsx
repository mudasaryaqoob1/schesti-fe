'use client';
import Button from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import Image from 'next/image';
import SenaryHeading from '@/app/component/headings/senaryHeading';

const Report = () => {
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
          <SenaryHeading title="Takeoff" className="font-base text-slateGray" />
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
          <div className="flex flex-row gap-3">
            <div>
              <WhiteButton
                text="Generate with AI"
                className="!text-goldenrodYellow !border-goldenrodYellow"

                //   onClick={() => router.push('/createclient')}
              />
            </div>
            <div>
              <Button
                text="Generate Report"
                iconwidth={20}
                iconheight={20}
                //   onClick={() => router.push('/createclient')}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Report;
