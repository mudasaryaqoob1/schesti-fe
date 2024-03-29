import Image from "next/image";


import CustomButton from "@/app/component/customButton/button";
import WhiteButton from "@/app/component/customButton/white";
import { InputComponent } from "@/app/component/customInput/Input";
import { SelectComponent } from "@/app/component/customSelect/Select.component";
import SenaryHeading from "@/app/component/headings/senaryHeading";

type Props = {
    onCancel?: () => void;
    onApply?: () => void;
    isVisible: boolean;
}

export function BidFilters({ onApply, onCancel, isVisible }: Props) {
    return <div className={`absolute
         bg-white w-[400px] right-12 opacity-0 top-14 border rounded-md transition-all ease-in-out
          duration-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
        <div className="p-3 bg-[#F9F5FF] flex items-center justify-between">
            <SenaryHeading
                title="Filters"
                className="text-[#101828] font-semibold text-[20px] leading-7"
            />
            <Image
                src="/closeicon.svg"
                width={20}
                height={20}
                alt="close icon"
                className="cursor-pointer"
                onClick={onCancel}
            />
        </div>
        <div className="p-4 mt-2 space-y-2">
            <SelectComponent
                label="Trades"
                name="trades"
                placeholder="Choose your trades"
            />
            <InputComponent
                label="Project Value"
                placeholder="Project Value"
                name="projectValue"
                type="number"
            />

            <InputComponent
                label="Location Range from your office"
                placeholder="Location Range from your office"
                name="location"
                type="text"
                field={{
                    suffix: <Image
                        alt="location icon"
                        src="/navigation-icon.svg"
                        width={20}
                        height={20}
                    />
                }}
            />
        </div>
        <div className="mb-2 p-4 flex items-center space-x-4">
            <WhiteButton
                text="Cancel"
                onClick={onCancel}
            />
            <CustomButton
                text="Apply"
                onClick={onApply}
            />
        </div>
    </div>
}