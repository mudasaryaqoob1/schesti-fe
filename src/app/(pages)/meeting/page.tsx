'use client';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import { ConfigProvider, Tabs } from 'antd';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import CustomButton from '@/app/component/customButton/button';
import SecondaryHeading from '@/app/component/headings/Secondary';
import { UpcomingComponent } from './components/UpComing';
import { useSelector } from 'react-redux';
import { selectMeetings } from '@/redux/meeting/meeting.slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { fetchMeetings } from '@/redux/meeting/meeting.thunk';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';
import { CreateMeeting } from './components/CreateMeeting';

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

  return (
    <section className="mt-6 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl ">
      <CreateMeeting
        showModal={showModal}
        setShowModal={() => setShowModal(false)}
      />
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
      <div className="w-full mb-4 shadow rounded p-3">
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
                    className={`${tab === type ? 'text-[#8449EB]' : 'text-[#101828]'}`}
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
