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
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { MeetingMessage } from './Message';
import { isMeetingActive, isMeetingNotStarted } from './utils';
import ModalComponent from '@/app/component/modal';
import { LinkMessage } from './LinkMessage';
import moment from 'moment';
import Description from '@/app/component/description';

export default function JoinMeeting() {
  const { link: roomName } = useParams();
  const router = useRouter();
  const token = useSelector(selectToken);
  const meetings = useSelector(selectMeetings);
  const meetingLoading = useSelector(
    (state: RootState) => state.meetings.loading
  );
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
    return (
      <MeetingMessage
        title="No meeting found"
        description="There is no scheduled meeting. Initiate one by using the Jitsi integration."
      >
        <CustomButton
          className="mt-7"
          text={'Go Back'}
          onClick={() => router.back()}
        />
      </MeetingMessage>
    );
  }

  return (
    <div>
      <div className="h-screen">
        {
          // isMeetingEnded(meeting) ? (
          //   <ModalComponent
          //     open={!isMeetingActive(meeting)}
          //     setOpen={() => { }}
          //     title="Meeting Expired/InActive"
          //     width="40%"
          //   >
          //     <LinkMessage
          //       title="Link Expired"
          //       description="Your meeting link is expired. You can contact with admin"
          //       onClose={() => router.push('/meeting')}
          //     >
          //       <div></div>
          //     </LinkMessage>
          //   </ModalComponent>
          // ) :
          isMeetingNotStarted(meeting) ? (
            <ModalComponent
              open={!isMeetingActive(meeting)}
              setOpen={() => {}}
              title="Meeting link is not active"
              width="40%"
            >
              <LinkMessage
                type="inactive"
                title="Meeting link is not active"
                description="Please wait for meeting start time to active the link. Meeting link is active before 15 minutes."
                onClose={() => router.push('/meeting')}
              >
                <Description
                  title={`Meeting time: ${moment(meeting.startDate).format(
                    'ddd, MMM DD, YYYY, hh:mm A'
                  )}`}
                />
              </LinkMessage>
            </ModalComponent>
          ) : null
        }
        <JaaSMeeting
          appId={process.env.NEXT_PUBLIC_JITSI_APP_ID as string}
          roomName={meeting.roomName}
          configOverwrite={{
            startWithAudioMuted: true,
            startWithVideoMuted: true,
          }}
          spinner={() => <div>Loading...</div>}
          getIFrameRef={(iframeRef) => {
            iframeRef.style.height = '100vh';
            iframeRef.style.width = '100%';
          }}
          onReadyToClose={() => {
            router.push('/meeting');
          }}
        />
      </div>
    </div>
  );
}
