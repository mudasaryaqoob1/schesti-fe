'use client';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';

import { ConfigProvider, Tabs } from 'antd';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import SecondaryHeading from '@/app/component/headings/Secondary';
import { UpcomingComponent } from './components/UpComing';
import ModalComponent from '@/app/component/modal';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { CloseOutlined } from '@ant-design/icons';
import { InputComponent } from '@/app/component/customInput/Input';
import { DateInputComponent } from '@/app/component/cutomDate/CustomDateInput';
import { useSelector } from 'react-redux';
import { selectMeetings } from '@/redux/meeting/meeting.slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { fetchMeetings } from '@/redux/meeting/meeting.thunk';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';

const UPCOMING_MEETING_KEY = 'Upcoming Meeting';
const RECENT_MEETING_KEY = 'Recent Meeting';

const Meeting = () => {
  const token = useSelector(selectToken);
  const [tab, setTab] = useState(UPCOMING_MEETING_KEY);
  const meetings = useSelector(selectMeetings);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const fetchMeetingsCB = useCallback(async () => {
    await dispatch(fetchMeetings({}));
  }, [dispatch]);

  useEffect(() => {
    fetchMeetingsCB();
  }, [fetchMeetingsCB]);


  function addNewSchedule() {

  }
  console.log(meetings);
  return (
    <section className="mt-6 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl ">
      <ModalComponent width='50%' open={showModal} setOpen={setShowModal} title='Schedule a meeting'>
        <div className="bg-white border border-solid border-elboneyGray rounded-[4px] z-50">
          <div className="flex px-6 py-2.5 justify-between bg-mistyWhite">
            <TertiaryHeading
              title="Schedule a meeting"
              className="text-graphiteGray"
            />
            <CloseOutlined
              className="cursor-pointer"
              width={24}
              height={24}
              onClick={() => setShowModal(false)}
            />
          </div>

          <div className="px-6 py-2.5 space-y-3">
            <InputComponent
              label="Topic"
              type="text"
              placeholder="Topic"
              name="topic"
              field={{
                onChange: () => {

                }
              }}
            />
            <InputComponent
              label="Email Address"
              type="email"
              placeholder="Email Address"
              name="email"
              field={{

                onChange: () => {

                }
              }}
            />
            <DateInputComponent
              label='Schedule Date'
              name='scheduleDate'
              inputStyle={"border-gray-200"}
              fieldProps={{
                showTime: true,
                onChange() {

                },
              }}
            />
          </div>
          <div className="flex justify-end px-6 py-2 space-x-2">
            <WhiteButton text="Cancel" className="!w-28" onClick={() => setShowModal(false)} />
            <CustomButton
              text="Schedule"
              className="!w-28"
              onClick={addNewSchedule}
            />
          </div>
        </div>
      </ModalComponent>
      <div className="flex items-center justify-between my-3">
        <SecondaryHeading title="Meeting" />
        <CustomButton
          text="Schedule a meeting"
          icon="/white-calendar.svg"
          iconwidth={20}
          iconheight={20}
          className="!w-48 !text-xs !text-white"
          onClick={() => setShowModal(true)}
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
                      state={meetings}
                      onOpenModal={() => setShowModal(true)}
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
