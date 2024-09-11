import moment from 'moment';
import { IMeeting } from '@/app/interfaces/meeting.type';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Skeleton } from 'antd';
import { NoMeetings } from './NoMeetings';
import { getClientLocalTimezone } from '@/app/utils/date.utils';
import { MeetingCard } from './MeetingCard';

type Props = {
  state: IMeeting[];
  onOpenModal: () => void;
};

export function UpcomingComponent({ state, onOpenModal }: Props) {
  const meetingsLoading = useSelector(
    (state: RootState) => state.meetings.loading
  );

  if (meetingsLoading) {
    return <Skeleton active className="mt-6" />;
  }

  if (state.length === 0) {
    return <NoMeetings onClick={onOpenModal} />;
  }
  const meetings = state.filter((item) => {
    const current = moment.tz(getClientLocalTimezone());
    const endMeeting = moment(item.endDate).tz(item.timezone);
    return current.isBefore(endMeeting);
  });
  return (
    <div>
      {meetings.length === 0 ? (
        <NoMeetings onClick={onOpenModal} />
      ) : (
        meetings.map((item) => {
          return <MeetingCard item={item} key={item._id} shouldShowEdit />;
        })
      )}
    </div>
  );
}
