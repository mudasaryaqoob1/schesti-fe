import WhiteButton from "@/app/component/customButton/white";
import CustomButton from "@/app/component/customButton/button";
import TertiaryHeading from "@/app/component/headings/tertiary";
import ModalComponent from "@/app/component/modal";
import Image from "next/image";

export function PostProjectCongratulations() {
    return (
        <ModalComponent
            open
            setOpen={() => { }}
            title="Congratulations!"
            width={"500px"}
        >
            <div className="bg-white border rounded-lg p-10 space-y-2">
                <div className="w-[220px] h-[200px] relative mx-auto">
                    <Image
                        src={'/congratulations.svg'}
                        alt="congratulations"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <div className="space-y-4">
                    <TertiaryHeading
                        title="Congratulations"
                        className="text-[24px] leading-[30px] text-center font-bold"
                    />
                    <p className="text-[18px] text-center leading-5 text-[#667085] font-normal">
                        Your project successfully created.
                    </p>
                </div>

                <div className="flex items-center space-x-4 !mt-5 justify-between">
                    <WhiteButton
                        text="View Project"
                    />
                    <CustomButton
                        text="Project Dashboard"
                    />
                </div>
            </div>
        </ModalComponent>
    );
}