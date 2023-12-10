import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { minHeading } from '@/globals/tailwindvariables';
// import Menu from './../table/menu';
interface Props {
    title: string;
    className?: string;
}
const MinDescription = ({ title, className }: Props) => {
    return (
        <p className={twMerge(clsx(minHeading, className && className))}>{title}</p>
    );
};

export default MinDescription;