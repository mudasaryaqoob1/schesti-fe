'use client';
import { voidFc } from '@/app/utils/types';
// import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface Props {
  styledVars: string;
  classes?: string;
  title: string;
  onClick?: voidFc;
  // icon?: string;
  // iconWidth?: number;
  // iconHeight?: number;
}
const Paragraph = ({
  // icon,
  // iconHeight,
  // iconWidth,
  styledVars,
  classes,
  title,
  onClick = () => {},
}: Props) => {
  return (
    <p className={twMerge(`${styledVars} ${classes}`)} onClick={onClick}>
      {/* {icon && <Image src={icon} width={iconWidth} height={iconHeight} />} */}
      {title}
    </p>
  );
};

export default Paragraph;
