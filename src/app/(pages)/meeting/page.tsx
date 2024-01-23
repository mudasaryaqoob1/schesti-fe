'use client';
import React, { useState } from 'react';

import { ConfigProvider, Tabs } from 'antd';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import CustomButton from '@/app/component/customButton/button';
import SecondaryHeading from '@/app/component/headings/Secondary';
import { UpcomingComponent } from './components/UpComing';
import { IMeeting } from './types';

const UPCOMING_MEETING_KEY = 'Upcoming Meeting';
const RECENT_MEETING_KEY = 'Recent Meeting';

const Meeting = () => {
  const [tab, setTab] = useState(UPCOMING_MEETING_KEY);
  const [meetings, setMeetings] = useState<IMeeting[]>([]);

  function scheduleMeeting() {
    const roomName = `SchestiMeetRoomNo${Math.random() * 100}-${Date.now()}`;
    const meeting: IMeeting = {
      id: new Date().getTime().toString(),
      date: new Date().toString(),
      topic: 'Random Topic ' + meetings.length,
      link: 'https://meet.jit.si' + '/' + roomName,
    };
    setMeetings([...meetings, meeting]);
  }

  return (
    <section className="mt-6 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl ">
      <div className="flex items-center justify-between my-3">
        <SecondaryHeading title="Meeting" />
        <CustomButton
          text="Schedule a meeting"
          icon="/white-calendar.svg"
          iconwidth={20}
          iconheight={20}
          className="!w-48 !text-xs !text-white"
          onClick={scheduleMeeting}
        />
      </div>
      <div className="w-full mb-4">
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                inkBarColor: '#8449EB',
              },
            },
          }}
        >
          <Tabs
            defaultActiveKey={UPCOMING_MEETING_KEY}
            destroyInactiveTabPane
            onChange={(type) => {
              setTab(type);
            }}
            items={[UPCOMING_MEETING_KEY, RECENT_MEETING_KEY].map((type) => {
              return {
                key: type,
                label: (
                  <QuaternaryHeading
                    title={type}
                    className="text-RoyalPurple"
                  />
                ),
                tabKey: type,
                children:
                  tab === UPCOMING_MEETING_KEY ? (
                    <UpcomingComponent
                      setState={setMeetings}
                      state={meetings}
                    />
                  ) : (
                    tab
                  ),
                style: {},
              };
            })}
          />
        </ConfigProvider>
      </div>
    </section>
  );
};

export default Meeting;
