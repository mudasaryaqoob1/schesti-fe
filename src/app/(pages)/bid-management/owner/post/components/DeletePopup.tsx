import CustomButton from "@/app/component/customButton/button";
import WhiteButton from "@/app/component/customButton/white";
import TertiaryHeading from "@/app/component/headings/tertiary";
import ModalComponent from "@/app/component/modal";
import Image from "next/image";

export function DeletePopup() {

    return <ModalComponent
        title="Delete"
        open
        setOpen={() => { }}
        width="500px"
    >
        <div className="bg-white p-10 rounded-lg">
            <div className="flex items-center justify-between">
                <Image
                    src="/trash-2.svg"
                    alt="trash"
                    width={24}
                    height={24}
                />

                <Image
                    src="/closeicon.svg"
                    alt="close"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                    onClick={() => { }}
                />
            </div>
            <div className="space-y-1 mt-4">
                <TertiaryHeading
                    title="Delete Project"
                    className="text-[18px] leading-[30px] font-bold text-[#1D2939] "
                />
                <p className="text-[#475467] text-[14px] leading-5 font-normal">Are you sure you want to delete this project? This action cannot be undone.</p>
            </div>

            <div className="mt-5 flex items-center justify-between space-x-4">
                <WhiteButton
                    text="Cancel"
                />
                <CustomButton
                    text="Delete"
                    className="!bg-[#D92D20] !border-[#D92D20]"
                />
            </div>
        </div>
    </ModalComponent>
}