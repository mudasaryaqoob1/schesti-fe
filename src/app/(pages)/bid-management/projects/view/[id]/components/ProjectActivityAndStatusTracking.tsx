import { InputComponent } from '@/app/component/customInput/Input';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { IBidActivity } from '@/app/interfaces/bid-management/bid-management.interface';
import { bidManagementService } from '@/app/services/bid-management.service';
import { Skeleton } from 'antd';
import { AxiosError } from 'axios';
import moment from 'moment';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
const ExportProjectActivityAndStatus = dynamic(
  () => import('../../../components/ExportProjectActivityAndStatusTracking')
);


type Props = {
  projectId: string;
}

export function ProjectAcitivityAndStatusTracking({ projectId }: Props) {
  const [activities, setActivities] = useState<IBidActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getProjectActivities();

  }, [projectId]);

  async function getProjectActivities() {
    setLoading(true);
    try {
      const res = await bidManagementService.httpGetProjectActivities(projectId);
      console.log({ activities: res });
      if (res.data?.bidsActivities) {
        setActivities(res.data.bidsActivities)
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      if (err.response?.data) {
        toast.error(err.response?.data.message || err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Skeleton />
  }

  return (
    <div className=" mt-6 mb-4 md:ms-[69px] md:me-[59px] mx-4  p-5 bg-white rounded-lg border shadow-lg">
      <div className="flex items-center justify-between">
        <TertiaryHeading
          title="Activity and Status Tracking"
          className="text-[20px] leading-[30px]"
        />
        <div className="flex items-center space-x-3">
          <div className="pt-2">
            <ExportProjectActivityAndStatus activities={activities} />
          </div>
          <div className="w-96">
            <InputComponent
              label=""
              placeholder="Search"
              name="search"
              type="text"
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        {activities.length > 0 ? activities.map(activity => {
          const activityUser = activity.user;

          return <div key={activity._id} className="flex py-3 px-1 mt-2 space-x-3 border-b border-[#EAECF0] items-center justify-between">
            <Image
              src={'/green-tracking.svg'}
              height={23}
              width={23}
              alt="green tracking icon"
            />
            <div className="flex-1 space-y-2">
              <TertiaryHeading
                title={typeof activityUser !== 'string' ? activityUser.companyName : ""}
                className="font-semibold text-[#344054] text-[14px] leading-5"
              />

              <div className="flex items-center space-x-4">
                <Image
                  src={'/navigation-icon.svg'}
                  height={20}
                  width={20}
                  alt="navigation icon"
                />
                <TertiaryHeading
                  title={typeof activityUser !== 'string' ? activityUser.address : ""}
                  className="text-[#667085] text-[14px] leading-5 font-normal"
                />

                <Image
                  src={'/mail-icon.svg'}
                  height={20}
                  width={20}
                  alt="mail icon"
                />
                <TertiaryHeading
                  title={typeof activityUser !== 'string' ? activityUser.email : ""}
                  className="text-[#667085] text-[14px] leading-5 font-normal"
                />

                <Image
                  src={'/call-icon.svg'}
                  height={20}
                  width={20}
                  alt="mail icon"
                />
                <TertiaryHeading
                  title={typeof activityUser !== 'string' ? String(activityUser.phone) : ""}
                  className="text-[#667085] text-[14px] leading-5 font-normal"
                />
              </div>
            </div>
            <div>
              <TertiaryHeading
                title={moment(activity.createdAt).format('DD MMMM, h:mm A')}
                className="text-[#667085] text-[14px] leading-5 font-normal"
              />
            </div>
          </div>
        }) : null}
      </div>
    </div>
  );
}
