'use client';
import { quaternaryHeading } from '@/globals/tailwindvariables';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

const tabsData = [
    { name: 'Dashboard', route: '/dashboard' },
    { name: 'Companies', route: '/companies' },
    { name: 'Pricing Plans', route: '/pricingplans' },
    { name: 'Transaction History', route: '/transactionhistory' },

];


const Tabs = () => {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <div className="md:flex block justify-between items-center px-16 xl:h-[67px] shadow-quinaryGentle">
            <ul
                className="list-none flex flex-wrap xl:gap-8 gap-3 text-sm font-medium text-center
            text-gray-500 dark:text-gray-400 justify-center mb-0"
            >
                {tabsData.map(({ name, route }, i) => {
                    return (
                        <li
                            className={twMerge(
                                clsx(
                                    `${quaternaryHeading} text-steelGray
                flex items-stretch justify-center py-2 
                 cursor-pointer
                `,
                                    pathname.includes(route.split('/')[1]) && 'active'
                                )
                            )}
                            onClick={() => router.push(route)}
                            key={i}
                        >
                            {name}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Tabs;
