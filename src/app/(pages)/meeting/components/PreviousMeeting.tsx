import { IMeeting } from '@/app/interfaces/meeting.type';
import { NoMeetings } from './NoMeetings';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import moment from 'moment-timezone';
import QuinaryHeading from '@/app/component/headings/quinary';
import { getClientLocalTimezone } from '@/app/utils/date.utils';

type Props = {
  meetings: IMeeting[];
};
export function PreviousMeetings({ meetings }: Props) {
  meetings = meetings.filter((m) => {
    const current = moment.tz(getClientLocalTimezone());
    const endMeeting = moment(m.endDate).tz(m.timezone);
    return current.isAfter(endMeeting);
  });
  return meetings.length === 0 ? (
    <NoMeetings onClick={() => {}} />
  ) : (
    meetings.map((item, index) => {
      return (
        <div
          key={index}
          className="flex justify-between shadow p-3 my-2 rounded-lg"
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
            </div>
            <SenaryHeading
              title={`Time: ${moment(item.startDate).format('h:mm a')} ${item.timezone} - ${moment.tz(item.startDate, item.timezone).tz(getClientLocalTimezone()).format('h:mm a')} ${getClientLocalTimezone()}`}
              className="text-[#667085]"
            />
          </div>
        </div>
      );
    })
  );
}
