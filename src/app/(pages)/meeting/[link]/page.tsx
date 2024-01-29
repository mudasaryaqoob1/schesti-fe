'use client';
import { useParams } from "next/navigation";
import { JitsiMeeting } from '@jitsi/react-sdk';

export default function JoinMeeting() {
    const { link } = useParams();
    console.log(link);

    return <div>
        <JitsiMeeting
            roomName={link as string}
            configOverwrite={{
                startWithAudioMuted: true,
                disableModeratorIndicator: false,
                startScreenSharing: true,
                enableEmailInStats: false,

            }}
            interfaceConfigOverwrite={{
                DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
            }}
            onApiReady={(externalApi) => {
                console.log(externalApi);

            }}
            getIFrameRef={(iframeRef) => { iframeRef.style.height = '400px'; }}
        />
    </div>
}