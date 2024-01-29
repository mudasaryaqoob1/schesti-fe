import CustomButton from '@/app/component/customButton/button';
import { IMeeting } from '../types';
import Image from 'next/image';
import SecondaryHeading from '@/app/component/headings/Secondary';
import Description from '@/app/component/description';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import moment from 'moment';
import QuinaryHeading from '@/app/component/headings/quinary';

type Props = {
  state: IMeeting[];
  setState: React.Dispatch<React.SetStateAction<IMeeting[]>>;
};
export function UpcomingComponent({ setState, state }: Props) {
  function generateRoom() {
    const roomName = `SchestiMeetRoomNo${Math.random() * 100}-${Date.now()}`;
    const meeting: IMeeting = {
      id: new Date().getTime().toString(),
      date: new Date().toString(),
      topic: 'Random Topic ' + state.length,
      link: '/meeting/' + roomName,
    };
    setState([...state, meeting]);
  }

  if (!state.length) {
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
              title="Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
              className="text-steelGray text-center font-normal"
            />
            <CustomButton
              className="mt-7"
              text={'Schedule a meeting'}
              onClick={generateRoom}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <div>
      {state.map((item, index) => {
        return (
          <div
            key={index}
            className="flex justify-between shadow p-3 my-2 rounded-lg"
          >
            <div className="space-y-1">
              <QuinaryHeading title={item.topic} />
              <SenaryHeading
                title={moment(item.date).format('MMMM Do, YYYY')}
              />
              <QuinaryHeading title={item.link} className="font-medium" />
              <SenaryHeading
                title={`Time: ${moment(item.date).format('h:mm a')}`}
              />
            </div>
            <div>
              <CustomButton
                className="!w-20"
                text={'Join'}
                onClick={() => {
                  window.open(item.link, '_blank');
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
