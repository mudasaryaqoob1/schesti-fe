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
    <div className="md:flex block justify-between bg-[#F0E9FD] items-center px-16 xl:h-[67px] shadow-quinaryGentle">
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
              pathname === '/dashboard' && tabsStyle.active
            )
          )}
          onClick={() => router.push('/dashboard')}
        >
          Dashboard
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
                    `,
                  pathname.includes('/estimates'.split('/')[1]) &&
                  tabsStyle.active
                )
              )}
            >
              Bid Management
              <DownOutlined />
            </Space>
          </Dropdown>
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
                    `,
                  pathname.includes('/estimates'.split('/')[1]) &&
                  tabsStyle.active
                )
              )}
            >
              CRM
              <DownOutlined />
            </Space>
          </Dropdown>
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
                    `,
                  pathname.includes('/estimates'.split('/')[1]) &&
                  tabsStyle.active
                )
              )}
            >
              Quantity Takeoff
              <DownOutlined />
            </Space>
          </Dropdown>
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
                    `,
                  pathname.includes('/estimates'.split('/')[1]) &&
                  tabsStyle.active
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
              pathname.includes('/schedule') && tabsStyle.active
            )
          )}
          onClick={() => router.push('/schedule')}
        >
          Schedule
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
                    `,
                  pathname.includes('/estimates'.split('/')[1]) &&
                  tabsStyle.active
                )
              )}
            >
              Financial
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
              pathname.includes('/meeting'.split('/')[1]) && tabsStyle.active
            )
          )}
          onClick={() => router.push('/meeting')}
        >
          Meetings
        </li>
        <li
          className={twMerge(
            clsx(
              `${quaternaryHeading} text-steelGray
                flex items-stretch justify-center py-2 
                 cursor-pointer
                `,
              pathname.includes('/meeting'.split('/')[1]) && tabsStyle.active
            )
          )}
          onClick={() => router.push('/meeting')}
        >
          Networking
        </li>
      </ul>
    </div>
  );
};

export default Tabs;
