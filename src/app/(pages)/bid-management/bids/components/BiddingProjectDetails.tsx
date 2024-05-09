import CustomButton from '@/app/component/customButton/button';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { bidManagementService } from '@/app/services/bid-management.service';
import { USCurrencyFormat } from '@/app/utils/format';
import { Divider } from 'antd';
import { AxiosError } from 'axios';
import { Country } from 'country-state-city';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { downloadFile } from '@/app/utils/downloadFile';
import { size } from 'lodash';
import { useState } from 'react';

type Props = {
  bid: any;
  refetchSavedBids: any;
  setSelectedBid: any;
};
type RemoveUserBidProps = {
  biddingId: string;
};
export function BiddingProjectDetails({
  bid,
  refetchSavedBids,
  setSelectedBid,
}: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const removeUserBidMutation = useMutation<
    IResponseInterface<{ biddingId: RemoveUserBidProps }>,
    AxiosError<{ message: string }>,
    RemoveUserBidProps
  >({
    //@ts-ignore
    mutationKey: 'saveUserBid',
    mutationFn: async (values: RemoveUserBidProps) => {
      return bidManagementService.httpPostProjectAsBidder(values.biddingId);
    },
    onSuccess(res: any) {
      console.log('res', res);
      if (res.data && res.data) {
        toast.success('Bid removed Successfully');
        setSelectedBid(null);
        refetchSavedBids();
      }
    },
    onError(error: any) {
      console.log('error', error);
      if (error.response?.data?.message) {
        toast.error(error.response?.data.message);
      }
    },
  });

  const downloadAllFiles = async (files: any[]) => {
    files.forEach(async (file: any) => {
      await downloadFile(file.url, file.name);
    });
  };

  const handlePostProjectAsBidder = async () => {
    console.log('ddksk');
    setIsLoading(true);
    try {
      const { data }: any = await bidManagementService.httpPostProjectAsBidder(bid?.projectId?._id);
      if(data) {
        toast.success('Project Posted successfully');
        setIsLoading(false);
      }
    } catch(err: any) {
      setIsLoading(false);
      toast.error(err.response?.data?.message || 'Error: could not post project');
      console.log('could not post project as bidder', );
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <SenaryHeading
          title={`Posted: ${moment(bid?.projectId.createdAt).format('DD MMM YYYY, hh:mm')}`}
          className="text-[#475467] text-sm leading-4 font-normal"
        />
        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-[#E9EBF8] py-[5px] px-[11px]">
            <SenaryHeading
              title={bid?.projectId.stage}
              className="text-[#7138DF] font-normal text-xs leading-4"
            />
          </div>
        </div>
      </div>

      <div className="mt-[14px]">
        <SenaryHeading
          title={bid?.projectId?.projectName}
          className="text-[#475467] text-base leading-6 font-semibold"
        />

        <SenaryHeading
          title={bid?.projectId?.description}
          className="text-[#475467] text-[14px] leading-6 font-normal mt-2"
        />
        <Link
          href={`/bid-management/details/${bid.projectId?._id}`}
          className="text-[#7F56D9] underline underline-offset-2 mt-4 text-[14px] leading-6 font-normal cursor-pointer"
        >
          View full details
        </Link>
      </div>

      <Divider />

      <div className="my-4 space-y-3">
        <div className="flex items-center space-x-1">
          <SenaryHeading
            title="Location:"
            className="text-[#475467] text-sm leading-4 font-normal"
          />
          <SenaryHeading
            title={`${bid?.projectId.city}, ${Country.getCountryByCode(bid?.projectId.country)?.name}`}
            className="text-[#475467] text-sm leading-4 font-semibold"
          />
        </div>

        <div className="flex items-center space-x-1">
          <SenaryHeading
            title="Project Value:"
            className="text-[#475467] text-sm leading-4 font-normal"
          />
          <SenaryHeading
            title={`${USCurrencyFormat.format(bid?.projectId?.projectValue)}`}
            className="text-[#475467] text-sm leading-4 font-semibold"
          />
        </div>

        <div className="flex items-center space-x-1">
          <SenaryHeading
            title="Bid Date:"
            className="text-[#475467] text-sm leading-4 font-normal"
          />
          <SenaryHeading
            title={`${moment(bid?.projectId.bidDueDate).format('DD MMM YYYY, hh:mm')}`}
            className="text-[#475467] text-sm leading-4 font-semibold"
          />
        </div>
      </div>
      <Divider />
      <div className="flex items-center py-[5px] px-[11px] space-x-2 cursor-pointer">
        <Image
          alt="cloud icon"
          src={'/uploadcloud.svg'}
          width={16}
          height={16}
        />
        {size(bid?.projectId?.projectFiles) > 0 && (
          <SenaryHeading
            onClick={() => downloadAllFiles(bid?.projectId?.projectFiles)}
            title="Download all files"
            className="text-[#7138DF] text-xs leading-4 font-semibold underline underline-offset-2"
          />
        )}
      </div>

      <div className="mt-4 space-y-2">
        <CustomButton
          onClick={() => removeUserBidMutation.mutate({ biddingId: bid._id })}
          text="Remove from my bidding projects"
          className="!text-[red] !bg-transparent !border-[red] !text-base !leading-7 "
        />
      </div>
      <div className="mt-4 space-y-2">
        <CustomButton
          onClick={() =>
            router.push(`/bid-management/submit/${bid.projectId?._id}`)
          }
          text="Send Bid"
          className="!bg-[#7F56D9] !text-[#ffffff] !border-[#EAECF0] !text-base !leading-7 "
        />
      </div>
      {
        bid.projectId?.user && bid.projectId?.user.roles.includes('Admin') && (
          <div className="mt-4 space-y-2">
          <CustomButton
            text="Post this project as a bidder"
            onClick={handlePostProjectAsBidder}
            disabled={isLoading}
            className={'!bg-[#F9F5FF] !text-[#7138DF]'}
          />
        </div>
        )
      }
      <div className="mt-4 space-y-2">
        <CustomButton
          onClick={() =>
            router.push(`/bid-management/details/${bid.projectId?._id}`)
          }
          text="View Details"
          className="!bg-[#EAECF0] !text-[#667085] !border-[#EAECF0] !text-base !leading-7 "
        />
      </div>
    </div>
  );
}
