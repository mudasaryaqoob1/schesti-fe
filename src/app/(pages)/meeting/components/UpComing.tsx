import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import Image from 'next/image';
import SecondaryHeading from '@/app/component/headings/Secondary';
import Description from '@/app/component/description';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import moment from 'moment';
import QuinaryHeading from '@/app/component/headings/quinary';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { IMeeting } from '@/app/interfaces/meeting.type';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Skeleton } from 'antd';
import { useCopyToClipboard } from 'usehooks-ts'
import { toast } from 'react-toastify';

type Props = {
  state: IMeeting[];
  onOpenModal: () => void;
};
const TIME_TO_ENABLE = 15; // minutes
export function UpcomingComponent({ state, onOpenModal }: Props) {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [copiedText, copy] = useCopyToClipboard()
  const meetingsLoading = useSelector(
    (state: RootState) => state.meetings.loading
  );

  function enableJoin15MinutesLeft(item: IMeeting) {
    const today = dayjs();
    const meetingDate = dayjs(item.startDate);
    const diff = meetingDate.diff(today, 'minute');
    return diff <= TIME_TO_ENABLE;
  }


  async function handleCopy(text: string) {
    try {
      await copy(text)
      toast.success('Copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  }

  if (meetingsLoading) {
    return <Skeleton active className="mt-6" />;
  }

  if (state.length === 0) {
    return (
      <section className="mt-6 mx-4 rounded-xl h-[calc(100vh-200px)] grid items-center border border-solid border-silverGray shadow-secondaryTwist">
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
              title="No meeting schedule "
              className="text-obsidianBlack2 mt-8"
            />
            <Description
              title="There are no scheduled meeting. Initiate one by using the Jitsi integration."
              className="text-steelGray text-center font-normal"
            />
            <CustomButton
              className="mt-7"
              text={'Schedule a meeting'}
              onClick={onOpenModal}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <div>
      {state
        .filter((item) => {
          const endDate = dayjs(item.endDate);
          const today = dayjs();
          const beforeTime = today.isBefore(endDate, 'minute');
          return beforeTime;
        })
        .map((item, index) => {
          return (
            <div
              key={index}
              className="flex justify-between shadow p-3 my-2 rounded-lg"
            >
              <div className="space-y-1">
                <SenaryHeading
                  title={moment(item.startDate).format('MMMM Do, YYYY')}
                  className='text-[#475467]'
                />
                <QuinaryHeading title={item.topic} className='text-[#475467] font-semibold' />
                <div className='flex items-center space-x-3'>
                  <QuinaryHeading title={item.roomName} className="font-medium text-[#667085]" />
                  <Image
                    src={'/copy.svg'}
                    alt="copy icon"
                    width={30}
                    height={30}
                    className='cursor-pointer'
                    onClick={() => handleCopy(item.roomName)}
                  />
                </div>
                <SenaryHeading
                  title={`Time: ${moment(item.startDate).format('h:mm a')}`}
                  className='text-[#667085]'
                />
              </div>
              <div>
                {!enableJoin15MinutesLeft(item) ? <WhiteButton
                  className='!w-20'
                  text='Join'
                /> : <CustomButton
                  className={`!w-20`}
                  text={'Join'}
                  onClick={() => {
                    router.push(`/meeting/${item.roomName}`);
                  }}

                />}
              </div>
            </div>
          );
        })}
    </div>
  );
}
