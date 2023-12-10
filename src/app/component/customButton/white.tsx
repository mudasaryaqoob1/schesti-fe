"use client"
import { twMerge } from 'tailwind-merge';
import { btnWhiteStyle } from '@/globals/tailwindvariables';
import { voidFc } from '@/app/utils/types';
import Image from 'next/image';

type PropsBtn = {
    text: string;
    type?: "button" | "submit" | "reset" | undefined,
    className?: string;
    isLoading?: Boolean | any;
    onClick?: voidFc
    icon?: string
    disabled?: boolean
    iconwidth?: number
    iconheight?: number
    loadingText?: string

};
const CustomWhiteButton = ({ text, type = "button", loadingText, className, disabled = false, icon, iconwidth, iconheight, isLoading = false, onClick = () => { } }: PropsBtn) => {
    return (
        <button type={type} disabled={disabled || isLoading} className={twMerge(`${className} ${btnWhiteStyle} ${icon ? "flex gap-3 justify-between items-center" : ""}`)}
            onClick={onClick}
        >
            {icon && <Image src={icon} alt='btn icon' width={iconwidth} height={iconheight} />}
            {isLoading ? `${loadingText ?? text}...` : text}
        </button>
    );
};

export default CustomWhiteButton;
