import { DownOutlined } from '@ant-design/icons';

import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import { useQuery } from 'react-query';
import { bidManagementService } from '@/app/services/bid-management.service';
import { Skeleton } from 'antd';
import momentTimezone from 'moment-timezone';
import { getTimezoneFromCountryAndState } from '@/app/utils/date.utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { bidManagementOwnerActions } from '@/redux/bid-management/owner.slice';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

type Props = {
  id: string;
};
export function ProjectIntro({ id }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const bid = useSelector(
    (state: RootState) => state.bidManagementOwner.project
  );

  const query = useQuery(
    ['getOwnerProjectById', id],
    () => {
      return bidManagementService.httpGetOwnerProjectById(id);
    },
    {
      onSuccess(data) {
        if (data.data && data.data.project) {
          dispatch(
            bidManagementOwnerActions.setProjectAction(data.data.project)
          );
        }
      },
      onError(error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data.message);
      },
    }
  );

  if (query.isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="flex justify-between items-center">
      <div className="space-y-3">
        <SenaryHeading
          title={bid ? bid.projectName : ''}
          className="text-[#1D2939] text-2xl font-semibold leading-9"
        />
        <div className="flex space-x-4 items-center text-[#667085] text-base leading-6 font-normal">
          <SenaryHeading
            title={`Creation Date: ${bid ? momentTimezone(bid.createdAt).format('MM/DD/YYYY hh:mm A') : ''}`}
          />
          <SenaryHeading
            title={`Bid Date: ${bid ? momentTimezone(bid.bidDueDate).format('MM/DD/YYYY hh:mm A') + ' ' + getTimezoneFromCountryAndState(bid.country, bid.state) : ''}  `}
          />
        </div>
      </div>

      <div className="flex items-center space-x-3 flex-1 justify-end">
        <div className="flex items-center justify-between p-3 w-[234px] bg-[#FFF2F0] rounded-lg">
          <SenaryHeading
            title="Project Status"
            className="text-[#1D2939] font-normal text-[14px] leading-4"
          />

          <div className="flex items-center border border-[#DC6803] py-1 pr-[10px] pl-3 rounded-full space-x-2">
            <SenaryHeading
              title={bid ? bid.status : ''}
              className="text-[#B54708] capitalize text-[14px] font-medium leading-6"
            />
            <DownOutlined className="text-xs text-[#B54708]" />
          </div>
        </div>
        <WhiteButton
          text="Edit"
          className="!w-28"
          icon="/edit-05.svg"
          iconwidth={20}
          iconheight={20}
        />

        <CustomButton
          text="Update"
          className="!w-32"
          icon={'/plus.svg'}
          iconwidth={20}
          iconheight={20}
        />
      </div>
    </div>
  );
}
