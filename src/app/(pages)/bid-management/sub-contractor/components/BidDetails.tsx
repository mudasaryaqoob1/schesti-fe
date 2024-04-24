import React, { useEffect, useState } from 'react';
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
import { CreateRFI } from './CreateRFI';
import Link from 'next/link';
import { isEmpty, size } from 'lodash';
import { SendEmailModal } from './SendEamil';
import { downloadFile } from '@/app/utils/downloadFile';
import { proposalService } from '@/app/services/proposal.service';

type Props = {
  bid: IBidManagement;
  selectedProjectSavedBid?: any;
  setSelectedProjectSavedBid?: any;
};
type RemoveUserBidProps = {
  biddingId: string;
};

type SaveUserBidProps = {
  projectId: string;
  isFavourite?: boolean;
};
export function BidDetails({
  bid,
  selectedProjectSavedBid,
  setSelectedProjectSavedBid,
}: Props) {
  const router = useRouter();

  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [bidSubmittedDetails, setBidSubmittedDetails] = useState(null);

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

  const removeUserBidMutation = useMutation<
    IResponseInterface<{ biddingId: RemoveUserBidProps }>,
    AxiosError<{ message: string }>,
    RemoveUserBidProps
  >({
    //@ts-ignore
    mutationKey: 'saveUserBid',
    mutationFn: async (values: RemoveUserBidProps) => {
      return bidManagementService.httpRemoveUserProjectBid(values.biddingId);
    },
    onSuccess(res: any) {
      console.log('res', res);
      if (res.data && res.data) {
        toast.success('Bid removed Successfully');
        setSelectedProjectSavedBid(null);
      }
    },
    onError(error: any) {
      console.log('error', error);
      if (error.response?.data?.message) {
        toast.error(error.response?.data.message);
        // router.push(`/bid-management/sub-contractor/bids`);
      }
    },
  });

  useEffect(() => {
    if (!isEmpty(bid?._id)) {
      getProjectProposalDetails(bid?._id);
    }
  }, [bid?._id]);

  const getProjectProposalDetails = async (bidProjectId: any) => {
    setIsDetailsLoading(true);
    setBidSubmittedDetails(null);
    try {
      const { data }: any =
        await proposalService.httpGetProposalDetailsByProjectId(bidProjectId);
      if (data && data.bidDetails) {
        setIsDetailsLoading(false);
        setBidSubmittedDetails(data?.bidDetails);
      }
    } catch (err) {
      setIsDetailsLoading(false);
      console.log('could not get project proposal details', err);
    }
  };

  const downloadAllFiles = async (files: any[]) => {
    files.forEach(async (file: any) => {
      await downloadFile(file.url, file.name);
    });
  };

  return (
    <div>
      {bidSubmittedDetails && !isDetailsLoading && (
        <div className="flex rounded p-2 flex-col bg-[#F5F6FA]">
          <SenaryHeading
            title={'You have already submitted a proposal'}
            className="text-[#475467] text-[14px] leading-6 font-normal mt-2"
          />
          <Link
            href={`/bid-management/details/${bid?._id}`}
            className="text-[#27AE60] underline underline-offset-2 mb-2 text-[14px] leading-6 font-normal cursor-pointer"
          >
            View Proposal
          </Link>
        </div>
      )}
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
            alt="share icon"
            src={'/share.svg'}
            width={16}
            height={16}
            className="cursor-pointer"
          />
          <SendEmailModal />
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
        <Link
          href={`/bid-management/details/${bid?._id}`}
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
                <Avatar
                  size={24}
                  src={bid.user?.avatar || bid.user?.companyLogo}
                >
                  {bid.user.name[0]}
                </Avatar>

                <SenaryHeading
                  title={bid.user.companyName}
                  className="text-[#475467] text-[14px] leading-6 font-semibold"
                />
              </div>

              <div className="">
                <SenaryHeading
                  title={bid.user.userRole}
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
        {size(bid?.projectFiles) > 0 && (
          <SenaryHeading
            onClick={() => downloadAllFiles(bid.projectFiles)}
            title="Download all files"
            className="text-[#7138DF] text-xs leading-4 font-semibold underline underline-offset-2"
          />
        )}
      </div>

      <div className="mt-4 space-y-2">
        <CustomButton
          text="Send Bid"
          onClick={() => {
            router.push(`${Routes['Bid Management'].Submit}/${bid._id}`);
          }}
        />

        {isEmpty(selectedProjectSavedBid) ? (
          <CustomButton
            onClick={() => saveUserBidMutation.mutate({ projectId: bid?._id })}
            text="Add to my Bidding Projects"
            className="!bg-white !text-[#7138DF]"
          />
        ) : (
          <CustomButton
            onClick={() =>
              removeUserBidMutation.mutate({
                biddingId: selectedProjectSavedBid?._id,
              })
            }
            text="Remove from my bidding projects"
            className="!text-[red] !bg-transparent !border-[red] !text-base !leading-7 "
          />
        )}

        <CreateRFI
          isProjectOwner={false}
          onSuccess={() => {}}
          projectId={bid._id}
        />
      </div>
    </div>
  );
}
