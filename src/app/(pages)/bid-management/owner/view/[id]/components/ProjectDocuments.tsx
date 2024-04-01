import CustomButton from "@/app/component/customButton/button";
import WhiteButton from "@/app/component/customButton/white";
import TertiaryHeading from "@/app/component/headings/tertiary";
import Image from "next/image";

export function ProjectDocuments() {
  return <div className=" mt-6 mb-4 md:ms-[69px] md:me-[59px] mx-4  p-5 bg-white rounded-lg border shadow-lg">
    <div className="flex items-center justify-between">
      <TertiaryHeading
        title="Documents"
        className="text-[20px] leading-[30px]"
      />

      <div className="flex items-center space-x-2">
        <div>
          <WhiteButton
            text="Download All"
            icon="/uploadcloud.svg"
            iconwidth={20}
            iconheight={20}
          />
        </div>

        <div className="w-48">
          <CustomButton
            text="Add Documents"
            icon="/plus.svg"
            iconwidth={20}
            iconheight={20}
          />
        </div>

      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 gap-4 mt-5">
      {Array.from({ length: 8 }).map((_, i) => <div key={i} className="border rounded">
        <div className="bg-[#F4EBFF] flex items-center justify-between px-2 py-1 ">
          <div className="flex items-center space-x-3">
            <Image
              src={'/file-05.svg'}
              width={16}
              height={16}
              alt="file"
            />
            <p className="text-[#667085] text-[14px] leading-6">
              {"screenshot.pdf"}
            </p>
          </div>
          <Image
            src={'/menuIcon.svg'}
            width={16}
            height={16}
            alt="close"
            className="cursor-pointer"
          />
        </div>
        <div className="p-2 pb-8">

          <div className="relative mt-10 w-[100px] h-[100px] mx-auto">
            <Image
              alt="pdf"
              src={'/pdf.svg'}
              layout="fill"
              objectFit="cover"
            />
          </div>

        </div>
      </div>)}
    </div>
  </div>;
}
