'use client';
import { JaaSMeeting } from '@jitsi/react-sdk';
import { useParams } from 'next/navigation';

export default function JoinMeeting() {
  const { link } = useParams();

  return (
    <div>
      <div className='h-screen'>
        <JaaSMeeting
          appId={process.env.NEXT_PUBLIC_JITSI_APP_ID as string}
          roomName={link as string}
          configOverwrite={{
            startWithAudioMuted: true,
            startWithVideoMuted: true
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
