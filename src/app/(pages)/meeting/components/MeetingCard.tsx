import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import QuinaryHeading from '@/app/component/headings/quinary';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import { IMeeting } from '@/app/interfaces/meeting.type';
import { dayjs } from '@/app/utils/date.utils';
import { Dropdown } from 'antd';
import moment from 'moment';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useCopyToClipboard } from 'usehooks-ts';
import { CreateMeeting } from './CreateMeeting';

type Props = {
  item: IMeeting;
  shouldShowJoin?: boolean;
  shouldShowEdit?: boolean;
};
const TIME_TO_ENABLE = 15; // minutes

export function MeetingCard({
  item,
  shouldShowJoin = true,
  shouldShowEdit = false,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [copiedText, copy] = useCopyToClipboard();
  const [showModal, setShowModal] = useState(false);

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
  return (
    <>
      <CreateMeeting
        showModal={showModal}
        setShowModal={() => setShowModal(false)}
        meeting={item}
      />
      <div className="flex justify-between shadow p-3 my-2 rounded-lg bg-white">
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
              .format('h:mm a')} ${item.timezone}`}
            className="text-[#667085]"
          />
        </div>
        <div className="flex flex-col space-y-2">
          {shouldShowEdit ? (
            <div className="self-center cursor-pointer">
              <Dropdown
                menu={{
                  items: [{ key: 'edit', label: 'Edit' }],
                  onClick: ({ key }) => {
                    if (key === 'edit') {
                      setShowModal(true);
                    }
                  },
                }}
              >
                <Image
                  alt="menu"
                  src={'/more-horizontal.svg'}
                  width={20}
                  height={20}
                />
              </Dropdown>
            </div>
          ) : null}
          {!shouldShowJoin ? null : !enableJoin15MinutesLeft(item) ? (
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
    </>
  );
}
