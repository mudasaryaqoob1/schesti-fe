import CustomButton from '@/app/component/customButton/button';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import {
  IBidManagement,
  ISaveUserBid,
} from '@/app/interfaces/bid-management/bid-management.interface';
import { USCurrencyFormat } from '@/app/utils/format';
import { Routes } from '@/app/utils/plans.utils';
import { Avatar, Divider } from 'antd';
import { Country } from 'country-state-city';
import moment from 'moment';
import Image from 'next/image';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { bidManagementService } from '@/app/services/bid-management.service';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  bid: IBidManagement;
};

type SaveUserBidProps =  {
  projectId: string;
  isFavourite?: boolean;
}
export function BidDetails({ bid }: Props) {
  const router = useRouter();
  const [isFavourite, setIsFavourite] = useState(false);

  const saveUserBidMutation = useMutation<
    IResponseInterface<{ projectId: ISaveUserBid }>,
    AxiosError<{ message: string }>,
    SaveUserBidProps
  >({
    //@ts-ignore
    mutationKey: 'saveUserBid',
    mutationFn: (values: SaveUserBidProps) => {
      return bidManagementService.httpSaveUserProjectBid(values);
    },
    onSuccess(res: any) {
      console.log('res', res);
      if (res.data && res.data.savedUserBid) {
        toast.success('Bid Saved Successfully');
        router.push(`/bid-management/sub-contractor/bids`);
        // Dispatch any necessary actions after successful mutation
      }
    },
    onError(error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response?.data.message);
        router.push(`/bid-management/sub-contractor/bids`);
      } else {
        toast.error('An error occurred while saving the bid.');
      }
    },
  });

  const updateUserBidMutation = useMutation<
  IResponseInterface<{ projectId: ISaveUserBid }>,
  AxiosError<{ message: string }>,
  SaveUserBidProps
>({
  //@ts-ignore
  mutationKey: 'updateUserBid',
  mutationFn: (values: SaveUserBidProps) => {
    return bidManagementService.httpUpdateUserProjectBid(values);
  },
  onSuccess(res: any) {
    if (res.data) {
      toast.success('Bid updated Successfully');
      // Dispatch any necessary actions after successful mutation
    }
  },
  onError(error: any) {
    if (error.response?.data?.message) {
      toast.error(error.response?.data.message);
    } else {
      toast.error('An error occurred while saving the bid.');
    }
  },
});


  return (
    <div>
      <div className="flex items-center justify-between">
        <SenaryHeading
          title={`Posted: ${moment(bid.createdAt).format(
            'DD MMM YYYY, hh:mm'
          )}`}
          className="text-[#475467] text-sm leading-4 font-normal"
        />
        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-[#E9EBF8] py-[5px] px-[11px]">
            <SenaryHeading
              title={bid.stage}
              className="text-[#7138DF] font-normal text-xs leading-4"
            />
          </div>
          <Image
            alt="trash icon"
            src={'/trash.svg'}
            width={16}
            height={16}
            className="cursor-pointer"
          />
          <Image
            alt="share icon"
            src={'/share.svg'}
            width={16}
            height={16}
            className="cursor-pointer"
          />
          <Image
            onClick={() => {
              setIsFavourite(!isFavourite);
              setTimeout(() => {
                updateUserBidMutation.mutate({projectId: bid._id, isFavourite: isFavourite})
              }, 10);
            }}
            alt="favourite icon"
            src={'/red-heart.png'}
            width={16}
            height={16}
            className="cursor-pointer"
          />
          <Image
            alt="mail-black icon"
            src={'/mail-black.svg'}
            width={16}
            height={16}
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="mt-[14px]">
        <SenaryHeading
          title={bid.projectName}
          className="text-[#475467] text-base leading-6 font-semibold"
        />

        <SenaryHeading
          title={bid.description}
          className="text-[#475467] text-[14px] leading-6 font-normal mt-2"
        />

        <p className="text-[#7F56D9] underline underline-offset-2 mt-4 text-[14px] leading-6 font-normal cursor-pointer">
          View full details
        </p>
      </div>

      <Divider />

      <div className="my-4 space-y-3">
        <div className="flex items-center space-x-1">
          <SenaryHeading
            title="Location:"
            className="text-[#475467] text-sm leading-4 font-normal"
          />
          <SenaryHeading
            title={`${bid.city}, ${Country.getCountryByCode(bid.country)
              ?.name}`}
            className="text-[#475467] text-sm leading-4 font-semibold"
          />
        </div>

        <div className="flex items-center space-x-1">
          <SenaryHeading
            title="Project Value:"
            className="text-[#475467] text-sm leading-4 font-normal"
          />
          <SenaryHeading
            title={`${USCurrencyFormat.format(bid.projectValue)}`}
            className="text-[#475467] text-sm leading-4 font-semibold"
          />
        </div>

        <div className="flex items-center space-x-1">
          <SenaryHeading
            title="Bid Date:"
            className="text-[#475467] text-sm leading-4 font-normal"
          />
          <SenaryHeading
            title={`${moment(bid.bidDueDate).format('DD MMM YYYY, hh:mm')}`}
            className="text-[#475467] text-sm leading-4 font-semibold"
          />
        </div>
      </div>

      <Divider />

      <div>
        <SenaryHeading
          title="Who is bidding the project?"
          className="text-[#475467] text-base leading-6 font-semibold"
        />
        {typeof bid.user !== 'string' ? (
          <div className="bg-[#FCFAFF] mt-3 rounded-md  p-3 border border-[#EBEAEC]">
            <div className="flex justify-between">
              <div className="flex mt-1 space-x-2">
                <Avatar size={24} src={bid.user.companyLogo}>
                  {bid.user.name[0]}
                </Avatar>

                <SenaryHeading
                  title={bid.user.companyName}
                  className="text-[#475467] text-[14px] leading-6 font-semibold"
                />
              </div>

              <div className="">
                <SenaryHeading
                  title="Representative"
                  className="text-[#7F56D9] underline underline-offset-2 text-[14px] leading-6 font-normal"
                />
                <SenaryHeading
                  title={bid.user.name}
                  className="text-[#475467] text-[14px] leading-6 font-normal"
                />
              </div>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <SenaryHeading
                title={`Phone: ${bid.user.phone ? bid.user.phone : ''}`}
                className="text-[#475467] text-[14px] leading-6 font-normal"
              />

              <SenaryHeading
                title={`Email: ${bid.user.email}`}
                className="text-[#475467] text-[14px] leading-6 font-normal"
              />
            </div>
          </div>
        ) : null}
      </div>

      <Divider className="my-2" />

      <div className="flex items-center py-[5px] px-[11px] space-x-2 cursor-pointer">
        <Image
          alt="cloud icon"
          src={'/uploadcloud.svg'}
          width={16}
          height={16}
        />
        <SenaryHeading
          title="Download all files"
          className="text-[#7138DF] text-xs leading-4 font-semibold underline underline-offset-2"
        />
      </div>

      <div className="mt-4 space-y-2">
        <CustomButton
          text="Send Bid"
          onClick={() => {
            router.push(`${Routes['Bid Management'].Submit}/${bid._id}`);
          }}
        />

        <CustomButton
          onClick={() => saveUserBidMutation.mutate({projectId: bid?._id})}
          text="Add to my Bidding Projects"
          className="!bg-white !text-[#7138DF]"
        />

        <CustomButton
          text="Send an RFI"
          className="!bg-[#F9F5FF] !text-[#7138DF]"
        />
      </div>
    </div>
  );
}
