import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import QuinaryHeading from "@/app/component/headings/quinary";
import SenaryHeading from "@/app/component/headings/senaryHeading";
import { IMeeting } from "@/app/interfaces/meeting.type"
import { dayjs } from '@/app/utils/date.utils';
import moment from "moment";
import Image from "next/image";
import { toast } from 'react-toastify';
import { useCopyToClipboard } from 'usehooks-ts';

type Props = {
    item: IMeeting;
}
const TIME_TO_ENABLE = 15; // minutes

export function MeetingCard({ item }: Props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const [copiedText, copy] = useCopyToClipboard();

    function enableJoin15MinutesLeft(item: IMeeting) {
        const today = dayjs();
        const meetingDate = dayjs(item.startDate);
        const diff = meetingDate.diff(today, 'minute');
        return diff <= TIME_TO_ENABLE;
    }

    async function handleCopy(text: string) {
        try {
            await copy(text);
            toast.success('Copied to clipboard');
        } catch (error) {
            toast.error('Failed to copy to clipboard');
        }
    }
    return <div
        className="flex justify-between shadow p-3 my-2 rounded-lg bg-white"
    >
        <div className="space-y-1">
            <SenaryHeading
                title={moment(item.startDate).format('MMMM Do, YYYY')}
                className="text-[#475467]"
            />
            <QuinaryHeading
                title={item.topic}
                className="text-[#475467] font-semibold"
            />
            <div className="flex items-center space-x-3">
                <QuinaryHeading
                    title={item.link}
                    className="font-medium text-[#667085]"
                />
                <Image
                    src={'/copy.svg'}
                    alt="copy icon"
                    width={30}
                    height={30}
                    className="cursor-pointer"
                    onClick={() => handleCopy(item.link)}
                />
            </div>
            <SenaryHeading
                title={`Time: ${moment(item.startDate)
                    .tz(item.timezone)
                    .format('h:mm a')} ${item.timezone}`}
                className="text-[#667085]"
            />
        </div>
        <div>
            {!enableJoin15MinutesLeft(item) ? (
                <WhiteButton className="!w-20" text="Join" />
            ) : (
                <CustomButton
                    className={`!w-20`}
                    text={'Join'}
                    onClick={() => {
                        window.open(`/meeting/${item.roomName}`, '_blank');
                    }}
                />
            )}
        </div>
    </div>
}