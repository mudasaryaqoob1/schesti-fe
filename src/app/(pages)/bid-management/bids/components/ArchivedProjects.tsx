import { IBidManagement } from '@/app/interfaces/bid-management/bid-management.interface';
import { useState } from 'react';
import { BidIntro } from '../../sub-contractor/components/BidIntro';
import { BidDetails } from './BidDetails';
import { bidManagementService } from '@/app/services/bid-management.service';
import { useQuery } from 'react-query';

export function ArchivedProjects() {

  const [selectedBid, setSelectedBid] = useState<IBidManagement | null>(null);

  let currentPage = 1

  const params = {
    page: currentPage,
    status: 'archived',
    limit: 10
  }
  const fetchSavedBids = async () => {
    return bidManagementService.httpGetUserSavedBids(params);
  };

  const savedBids = useQuery(['saved-bids'], fetchSavedBids);
  const refetchSavedBids = () => {
    savedBids.refetch();
  };

  const savedUserBids: any =
  savedBids.data && savedBids.data.data
    ? savedBids.data.data?.savedBids
    : [];


  return (
    <div>
      <div className={`grid grid-cols-12 gap-4`}>
        <div className={`${selectedBid ? 'col-span-8' : 'col-span-12'}`}>
          {savedUserBids.map((bidProject: any) => {
            return (
              <BidIntro
                key={bidProject._id}
                bid={bidProject as unknown as IBidManagement}
                onClick={() =>
                  setSelectedBid(bidProject as unknown as IBidManagement)
                }
                isSelected={selectedBid?._id === bidProject._id}
              />
            );
          })}
        </div>
        {selectedBid ? (
          <div className="col-span-4 py-[24px] px-[17px] rounded-lg mt-3 border border-[#E9E9EA]">
            <BidDetails setSelectedBid={setSelectedBid} refetchSavedBids={refetchSavedBids} bid={selectedBid as unknown as IBidManagement} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
