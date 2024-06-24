import SenaryHeading from '@/app/component/headings/senaryHeading';
import { IBidManagement } from '@/app/interfaces/bid-management/bid-management.interface';
import { USCurrencyFormat } from '@/app/utils/format';
import { Country } from 'country-state-city';
import moment from 'moment';
import Image from 'next/image';

type Props = {
  bid: IBidManagement;
  onClick?: () => void;
  isSelected?: boolean;
  selectedBid: any;
};
export function BidProjectDetail({ bid, onClick, isSelected }: Props) {
  return (
    <div
      className={`mt-3 rounded-lg ${isSelected ? 'bg-[#e0e3e6]' : 'bg-[#F2F4F7]'}  border border-[#E8E3EF] p-4 cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <Image src={'/trade.svg'} width={18} height={18} alt="trade icon" />
        <SenaryHeading
          title={bid.projectName}
          className="font-medium text-[#001556] text-base leading-6"
        />
      </div>
      <div className="mt-[17px] flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="space-y-2">
            <SenaryHeading
              title="Posted:"
              className="text-[#475467] font-normal text-xs leading-4"
            />

            <SenaryHeading
              title={moment(bid.createdAt).format('DD MMM YYYY, hh:mm')}
              className="text-[#475467] font-semibold text-xs leading-4"
            />
          </div>
          <div className="space-y-2">
            <SenaryHeading
              title="Bid Date:"
              className="text-[#475467] font-normal text-xs leading-4"
            />

            <SenaryHeading
              title={moment(bid.bidDueDate).format('DD MMM YYYY, hh:mm')}
              className="text-[#475467] font-semibold text-xs leading-4"
            />
          </div>
          <div className="space-y-2">
            <SenaryHeading
              title="Location:"
              className="text-[#475467] font-normal text-xs leading-4"
            />

            <SenaryHeading
              title={`${bid?.city}, ${Country.getCountryByCode(bid.country)?.name}`}
              className="text-[#475467] font-semibold text-xs leading-4"
            />
          </div>
          <div className="space-y-2">
            <SenaryHeading
              title="Project value: "
              className="text-[#475467] font-normal text-xs leading-4"
            />

            <SenaryHeading
              title={USCurrencyFormat.format(bid?.projectValue as number)}
              className="text-[#475467] font-semibold text-xs leading-4"
            />
          </div>

          <div className="rounded-full bg-schestiLightPrimary py-[5px] px-[11px]">
            <SenaryHeading
              title={bid.stage}
              className="text-schestiPrimary font-normal text-xs leading-4"
            />
          </div>
        </div>
        <Image
          src={'/forward-arrow.svg'}
          width={46}
          height={36}
          alt="forward arrow icon"
          className="cursor-pointer"
          onClick={onClick}
        />
      </div>
    </div>
  );
}
