'use client';
import CustomButton from '@/app/component/customButton/button';
import Description from '@/app/component/description';
import SecondaryHeading from '@/app/component/headings/Secondary';
import { IMeeting } from '@/app/interfaces/meeting.type';
import { HttpService } from '@/app/services/base.service';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { selectMeetings } from '@/redux/meeting/meeting.slice';
import { fetchMeetings } from '@/redux/meeting/meeting.thunk';
import { AppDispatch, RootState } from '@/redux/store';
import { JaaSMeeting } from '@jitsi/react-sdk';
import { Skeleton } from 'antd';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function JoinMeeting() {
  const { link: roomName } = useParams();
  const router = useRouter();
  const token = useSelector(selectToken);
  const meetings = useSelector(selectMeetings);
  const meetingLoading = useSelector((state: RootState) => state.meetings.loading);
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

  if (!roomName) {
    router.back();
    return <div>Loading...</div>;
  }
  if (meetingLoading) {
    return <Skeleton active className="mt-6" />;
  }

  const meeting = meetings.find((m: IMeeting) => m.link === roomName);
  if (!meeting) {
    return <section className="mt-6 mx-4 rounded-xl h-[calc(100vh-200px)] grid items-center border border-solid border-silverGray shadow-secondaryTwist">
      <div className="grid place-items-center">
        <div className="max-w-[500px] flex flex-col items-center p-4">
          <div className="bg-lightGray p-12 rounded-full">
            <Image
              src={'/purple-calendar.svg'}
              alt="create request icon"
              width={100}
              height={100}
            />
          </div>
          <SecondaryHeading
            title="No meeting found"
            className="text-obsidianBlack2 mt-8"
          />
          <Description
            title="There is no scheduled meeting. Initiate one by using the Jitsi integration."
            className="text-steelGray text-center font-normal"
          />
          <CustomButton
            className="mt-7"
            text={'Go Back'}
          />
        </div>
      </div>
    </section>
  }

  return (
    <div>
      <div className="h-screen">
        {/* <JaaSMeeting
          appId={process.env.NEXT_PUBLIC_JITSI_APP_ID as string}
          roomName={link as string}
          configOverwrite={{
            startWithAudioMuted: true,
            startWithVideoMuted: true,
          }}
          spinner={() => <div>Loading...</div>}
          getIFrameRef={(iframeRef) => {
            iframeRef.style.height = '100vh';
            iframeRef.style.width = '100%';
          }}
        /> */}
      </div>
    </div>
  );
}
