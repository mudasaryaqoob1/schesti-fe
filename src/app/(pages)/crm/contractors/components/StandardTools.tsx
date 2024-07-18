import CustomButton from "@/app/component/customButton/button";
import SenaryHeading from "@/app/component/headings/senaryHeading";
import { StandardToolType } from "../types";

type Props = {
    onStandardToolClick: (_type: StandardToolType) => void
}
export function StandardTools({ onStandardToolClick }: Props) {

    function handleClick(type: StandardToolType) {
        onStandardToolClick(type)
    }

    return <div className="flex flex-col space-y-3 rounded-md bg-white h-fit p-4 ">
        <SenaryHeading
            title="Standard Tools"
            className="text-xl  font-semibold"
        />
        <CustomButton
            text="Signature"
            className="!bg-schestiLightPrimary !border-schestiLightPrimary !text-schestiPrimaryBlack"
            icon="/signature.svg"
            iconwidth={16}
            iconheight={16}
            onClick={() => handleClick("signature")}
        />

        <CustomButton
            text="Initials"
            className="!bg-schestiLightPrimary !border-schestiLightPrimary !text-schestiPrimaryBlack"
            icon="/initials.svg"
            iconwidth={16}
            iconheight={16}
            onClick={() => handleClick("initials")}
        />

        <CustomButton
            text="Stamp"
            className="!bg-schestiLightPrimary !border-schestiLightPrimary !text-schestiPrimaryBlack"
            icon="/stamp.svg"
            iconwidth={16}
            iconheight={16}
            onClick={() => handleClick("stamp")}
        />

        <CustomButton
            text="Date"
            className="!bg-schestiLightPrimary !border-schestiLightPrimary !text-schestiPrimaryBlack"
            icon="/date.svg"
            iconwidth={16}
            iconheight={16}
            onClick={() => handleClick("date")}
        />
    </div>;
}