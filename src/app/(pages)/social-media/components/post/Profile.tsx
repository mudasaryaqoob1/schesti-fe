import { voidFc } from '@/app/utils/types';
import clsx from 'clsx';
import moment from 'moment';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

type Props = {
  onClick?: voidFc;
  feeling?: string;
  date?: string;
  name?: string;
  avatar?: string;
  isOwner?: boolean;
  from?: string;
};
const ProfileAvatar = ({
  name,
  feeling,
  date,
  onClick = () => { },
  avatar = '/profileAvatar.png',
  isOwner = false,
  from = '',
}: Props) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={onClick}>
      <Image className='rounded-full' width={36} height={36} src={avatar} alt={name ?? ''} />
      <div>
        <div className="flex gap-2 items-start">
          {
            name && (
              <p className="font-bold text-xs text-graphiteGray">{name}</p>
            )
          }
          {from && <p className="text-xs text-graphiteGray"> from {from}</p>}
          {feeling && (
            <p className="text-xs text-graphiteGray">
              - {feeling && `is feeling ${feeling}`}.
            </p>
          )}
          {isOwner && (
            <sup className="bg-schestiPrimary text-xs font-medium text-white rounded-sm p-1">
              you
            </sup>
          )}
        </div>
        {
          date && (
            <p
              className={twMerge(
                clsx('mt-1.5 text-coolGray text-[10px]', isOwner && 'mt-0')
              )}
            >
              {moment(date).fromNow()}
            </p>
          )
        }

      </div>
    </div>
  );
};

export default ProfileAvatar;
