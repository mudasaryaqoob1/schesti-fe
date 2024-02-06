'use client';
import CustomButton from '@/app/component/customButton/button';
import { IMeeting } from '@/app/interfaces/meeting.type';
import { HttpService } from '@/app/services/base.service';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { selectMeetings } from '@/redux/meeting/meeting.slice';
import { fetchMeetings } from '@/redux/meeting/meeting.thunk';
import { AppDispatch, RootState } from '@/redux/store';
import { JaaSMeeting } from '@jitsi/react-sdk';
import { Skeleton } from 'antd';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { MeetingMessage } from './Message';
import { isMeetingActive } from './utils';
import ModalComponent from '@/app/component/modal';
import { LinkMessage } from './LinkMessage';

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
  }, []);





  if (meetingLoading) {
    return <Skeleton active className="m-6" />;
  }

  const meeting = meetings.find((m: IMeeting) => m.roomName === roomName);

  if (!meeting) {
    return <MeetingMessage
      title='No meeting found'
      description='There is no scheduled meeting. Initiate one by using the Jitsi integration.'
    >
      <CustomButton
        className="mt-7"
        text={'Go Back'}
        onClick={() => router.back()}
      />
    </MeetingMessage>
  }

  return (
    <div>
      <div className="h-screen">
        <ModalComponent open={!isMeetingActive(meeting)} setOpen={() => { }}
          title='Meeting Expired/InActive' width='40%'>
          <LinkMessage
            title='Link Expired'
            description="Your meeting link is expaired. You can contact with admin"
            onClose={() => router.back()}
          />
        </ModalComponent>
        <JaaSMeeting
          appId={process.env.NEXT_PUBLIC_JITSI_APP_ID as string}
          roomName={meeting.roomName}
          configOverwrite={{
            startWithAudioMuted: true,
            startWithVideoMuted: true,
            toolbarButtons: [
              'microphone',
              'embedmeeting'
            ]
          }}
          spinner={() => <div>Loading...</div>}
          getIFrameRef={(iframeRef) => {
            iframeRef.style.height = '100vh';
            iframeRef.style.width = '100%';
          }}

        />
      </div>
    </div>
  );


}
