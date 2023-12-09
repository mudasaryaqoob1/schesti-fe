import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { quinaryHeading } from '@/globals/tailwindvariables';
interface Props {
    title: string;
    className?: string;
}
const Description = ({ title, className }: Props) => {
    return (
        <p className={twMerge(clsx(quinaryHeading, className && className))}>{title}</p>
    );
};

export default Description;