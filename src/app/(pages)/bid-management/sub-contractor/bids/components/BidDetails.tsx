import CustomButton from '@/app/component/customButton/button';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import { USCurrencyFormat } from '@/app/utils/format';
import { Divider } from 'antd';
import { Country } from 'country-state-city';
import moment from 'moment';
import Image from 'next/image';

type Props = {
  bid: any;
};
export function BidDetails({ bid }: Props) {
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
          <Image
            alt="trash icon"
            src={'/trash.svg'}
            width={16}
            height={16}
            className="cursor-pointer"
          />
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
        <SenaryHeading
          title="Download all files"
          className="text-[#7138DF] text-xs leading-4 font-semibold underline underline-offset-2"
        />
      </div>

      <div className="mt-4 space-y-2">
        <CustomButton
          text="Send Bid"
          className="!bg-[#EAECF0] !text-[#667085] !border-[#EAECF0] !text-base !leading-7 "
        />
      </div>
    </div>
  );
}
