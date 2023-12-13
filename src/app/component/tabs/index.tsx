'use client';

import tabsData from './data';
import { quaternaryHeading } from '@/globals/tailwindvariables';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { goldenrodYellow } from '@/globals/globelStyles';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

const Tabs = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Wrapper className="md:flex block justify-between items-center px-16 xl:h-[67px] shadow-quinaryGentle">
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
    </Wrapper>
  );
};

export default Tabs;

const Wrapper = styled.section`
  .active {
    border-bottom: 2px solid ${goldenrodYellow};
    color: #1a141f;
    font-weight: 600;
  }
`;
