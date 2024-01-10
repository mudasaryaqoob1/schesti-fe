'use client';

import { quaternaryHeading } from '@/globals/tailwindvariables';
import { useRouter } from 'next/navigation';
import { Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import tabsStyle from './tabs.module.css';
import { DownOutlined } from '@ant-design/icons';
import Link from 'next/link';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <Link href="/estimates">Estimates Requests</Link>,
  },

  {
    key: '2',
    label: <Link href="/estimates/generate">Estimates List</Link>,
  },
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
        <li
          className={twMerge(
            clsx(
              `${quaternaryHeading} text-steelGray
                flex items-stretch justify-center py-2 
                 cursor-pointer
                `,
              pathname.includes('#'.split('/')[1]) && tabsStyle.active
            )
          )}
          onClick={() => router.push('#')}
        >
          Dashboard
        </li>
        <li
          className={twMerge(
            clsx(
              `${quaternaryHeading} text-steelGray
                flex items-stretch justify-center py-2 
                 cursor-pointer
                `,
              pathname.includes('/clients'.split('/')[1]) && tabsStyle.active
            )
          )}
          onClick={() => router.push('/clients')}
        >
          My Client
        </li>
        <li
          className={twMerge(
            clsx(
              `${quaternaryHeading} text-steelGray
                flex items-stretch justify-center py-2 
                 cursor-pointer
                `,
              pathname.includes('/subcontractor'.split('/')[1]) &&
                tabsStyle.active
            )
          )}
          onClick={() => router.push('/subcontractor')}
        >
          My Subcontractor
        </li>
        <li
          className={twMerge(
            clsx(
              `${quaternaryHeading} text-steelGray
                flex items-stretch justify-center py-2 
                 cursor-pointer
                `,
              pathname.includes('#'.split('/')[1]) && tabsStyle.active
            )
          )}
          onClick={() => router.push('#')}
        >
          Take off
        </li>
        <li>
          <Dropdown
            menu={{
              items,
              selectable: true,
            }}
          >
            <Space
              className={twMerge(
                clsx(
                  `${quaternaryHeading} text-steelGray
              flex items-stretch justify-center py-2 
               cursor-pointer
              `
                )
              )}
            >
              Estimates
              <DownOutlined />
            </Space>
          </Dropdown>
        </li>
        <li
          className={twMerge(
            clsx(
              `${quaternaryHeading} text-steelGray
                flex items-stretch justify-center py-2 
                 cursor-pointer
                `,
              pathname.includes('#'.split('/')[1]) && tabsStyle.active
            )
          )}
          onClick={() => router.push('#')}
        >
          Schedule
        </li>
        <li
          className={twMerge(
            clsx(
              `${quaternaryHeading} text-steelGray
                flex items-stretch justify-center py-2 
                 cursor-pointer
                `,
              pathname.includes('#'.split('/')[1]) && tabsStyle.active
            )
          )}
          onClick={() => router.push('#')}
        >
          Fiance
        </li>
        <li
          className={twMerge(
            clsx(
              `${quaternaryHeading} text-steelGray
                flex items-stretch justify-center py-2 
                 cursor-pointer
                `,
              pathname.includes('#'.split('/')[1]) && tabsStyle.active
            )
          )}
          onClick={() => router.push('#')}
        >
          Invoice
        </li>
        <li
          className={twMerge(
            clsx(
              `${quaternaryHeading} text-steelGray
                flex items-stretch justify-center py-2 
                 cursor-pointer
                `,
              pathname.includes('#'.split('/')[1]) && tabsStyle.active
            )
          )}
          onClick={() => router.push('#')}
        >
          Meeting
        </li>
      </ul>
    </div>
  );
};

export default Tabs;
