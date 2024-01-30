'use client';
import SecondaryHeading from '@/app/component/headings/Secondary';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import QuinaryHeading from '@/app/component/headings/quinary';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, ConfigProvider, Tabs, Tag } from 'antd';
import { useLayoutEffect, useState } from 'react';
import { Schedule } from './components/schedule';
import { Gantt } from './components/Gantt';
import { useSelector } from 'react-redux';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';
import { IWBSType } from './type';
import { scopeItems } from './utils';

const SCHEDULE_KEY = 'Schedule';
const GANTT_KEY = 'Gantt';

export default function SchedulePage() {
  const [tab, setTab] = useState(SCHEDULE_KEY);
  const token = useSelector(selectToken);
  const [state, setState] = useState<IWBSType[]>([]);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  function addWbs(
    category: IWBSType['category'],
    subCategory: IWBSType['subCategory']
  ) {
    const item: IWBSType = {
      id: new Date().getTime().toString(),
      category,
      subCategory,
      title: `${category.label} / ${subCategory.label}`,
      scopeItems
    };

    setState([...state, item]);
  }

  function updateWbsScopeItems(wbsId: string, scopeItems: IWBSType['scopeItems']) {
    const updatedWbs = state.map((item) => {
      if (item.id === wbsId) {
        return {
          ...item,
          scopeItems
        }
      }
      return item
    });
    setState(updatedWbs);
  }

  return (
    <section className="mt-6 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl ">
      <div className="p-5 flex flex-col rounded-lg border border-silverGray shadow bg-white">
        <div className="flex justify-between items-center">
          <SecondaryHeading title="Project - Wall Constrcution" />

          <Tag
            color="#F9F5FF"
            className="rounded-full py-1"
            style={{ color: '#6941C6' }}
          >
            Inprogress
          </Tag>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex-1">
            <div className="grid grid-cols-7">
              <div className="flex flex-col">
                <QuinaryHeading
                  title="Created"
                  className="text-[#667085] font-medium"
                />

                <QuinaryHeading
                  title="14 Jan 2022"
                  className="text-[#475467] font-semibold"
                />
              </div>

              <div className="flex flex-col">
                <QuinaryHeading
                  title="Tasks"
                  className="text-[#667085]  font-medium"
                />

                <QuinaryHeading
                  title="14"
                  className="text-[#475467] font-semibold"
                />
              </div>

              <div className="flex flex-col">
                <QuinaryHeading
                  title="Duration"
                  className="text-[#667085]  font-medium"
                />

                <QuinaryHeading
                  title="3 Months"
                  className="text-[#475467] font-semibold"
                />
              </div>

              <div className="flex flex-col">
                <QuinaryHeading
                  title="Working Days"
                  className="text-[#667085]  font-medium"
                />

                <QuinaryHeading
                  title="Regular"
                  className="text-[#475467] font-semibold"
                />
              </div>

              <div className="flex flex-col">
                <QuinaryHeading
                  title="Daily Hours"
                  className="text-[#667085]  font-medium"
                />

                <QuinaryHeading
                  title="8 hours"
                  className="text-[#475467] font-semibold"
                />
              </div>

              <div className="flex flex-col">
                <QuinaryHeading
                  title="Client Name"
                  className="text-[#667085]  font-medium"
                />

                <QuinaryHeading
                  title="John Marks"
                  className="text-[#475467] font-semibold"
                />
              </div>

              <div className="flex flex-col">
                <QuinaryHeading
                  title="Company Name"
                  className="text-[#667085]  font-medium"
                />

                <QuinaryHeading
                  title="ABC Builders"
                  className="text-[#475467] font-semibold"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <SenaryHeading
              title="Manager"
              className="text-[#475467] font-semibold"
            />
            <div className="flex items-center space-x-4">
              <Avatar size="small" icon={<UserOutlined />} />
              <SenaryHeading
                title="Betty Copper"
                className="text-[#475467] font-semibold"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 my-5 rounded-lg border border-silverGray shadow bg-white">
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                inkBarColor: '#8449EB',
                cardBg: '#F4EBFF',
              },
            },
          }}
        >
          <Tabs
            defaultActiveKey={SCHEDULE_KEY}
            destroyInactiveTabPane
            onChange={(type) => {
              setTab(type);
            }}
            items={[SCHEDULE_KEY, GANTT_KEY].map((type) => {
              return {
                key: type,
                label: (
                  <QuaternaryHeading
                    title={type}
                    className="text-RoyalPurple"
                  />
                ),
                tabKey: type,
                children: tab === SCHEDULE_KEY ? <Schedule
                  addWbs={addWbs}
                  state={state}
                  updateWbsScopeItems={updateWbsScopeItems}
                /> : <Gantt />,
                style: {},
              };
            })}
          />
        </ConfigProvider>
      </div>
    </section>
  );
}
