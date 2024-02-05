'use client';
import { IMeeting } from '@/app/interfaces/meeting.type';
import { JaaSMeeting } from '@jitsi/react-sdk';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function JoinMeeting() {
  const { link: roomName } = useParams();
  const router = useRouter();
  const [meeting, setMeeting] = useState<IMeeting | null>(null);

  console.log(roomName);

  if (!roomName) {
    router.back();
    return <div>Loading...</div>;
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
