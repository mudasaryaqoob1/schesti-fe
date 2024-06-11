'use client';
import { twMerge } from 'tailwind-merge';
import { btnStyle } from '@/globals/tailwindvariables';
import { voidFc } from '@/app/utils/types';
import Image from 'next/image';
import clsx from 'clsx';

function ButtonLoading() {
  return (
    <div className="at-tableloader">
      <div className="lds-dual-ring"></div>
    </div>
  );
}
type PropsBtn = {
  text: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  isLoading?: Boolean | any;
  onClick?: voidFc | any;
  icon?: React.ReactNode | string;
  disabled?: boolean;
  iconwidth?: number;
  iconheight?: number;
  loadingText?: string;
};
const CustomButton = ({
  text,
  type = 'button',
  className,
  disabled = false,
  icon,
  iconwidth,
  iconheight,
  isLoading = false,
  onClick = () => { },
}: PropsBtn) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={twMerge(
        clsx(
          `${isLoading && 'disabled'} ${btnStyle} !bg-schestiPrimary !border-schestiPrimary ${className && className}  ${icon ? 'flex gap-3 justify-between items-center' : ''
          }`
        )
      )}
      onClick={onClick}
    >
      {icon && typeof icon === 'string' ? (
        <Image
          src={icon}
          alt="btn icon"
          width={iconwidth}
          height={iconheight}
        />
      ) : (
        <span>{icon}</span>
      )}

      {isLoading ? <ButtonLoading /> : text}
    </button>
  );
};

export default CustomButton;
