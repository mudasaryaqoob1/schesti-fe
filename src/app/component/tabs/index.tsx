'use client';

import tabsData from './data';
import { quaternaryHeading } from '@/globals/tailwindvariables';
import { useRouter } from 'next/navigation'
import styled from 'styled-components';
import { goldenrodYellow } from '@/globals/globelStyles';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';


const Tabs = () => {
  const pathname = usePathname();
  const router = useRouter()

  return (
    <Wrapper className="flex justify-between items-center px-14 h-16 pt-2 mb-6 shadow-quinaryGentle">
      <div>
        <ul
          className="list-none flex flex-wrap -mb-px text-sm font-medium text-center
            text-gray-500 dark:text-gray-400"
        >
          {tabsData.map(({ name, route }, i) => {
            return (
              <li className="me-2" key={i}>
                <p
                  className={twMerge(
                    clsx(`${quaternaryHeading} text-steelGray
                    inline-flex items-center justify-center py-2 px-4
                    rounded-t-lg cursor-pointer
                    `, pathname.includes(route.split('/')[1]) && "active")
                  )}
                  onClick={() => router.push(route)}
                >
                  {name}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </Wrapper>
  );
};

export default Tabs;


const Wrapper = styled.section`
.active{
  border-bottom: 2px solid ${goldenrodYellow};
  color:#1A141F ;
  font-weight: 600;
}
`;