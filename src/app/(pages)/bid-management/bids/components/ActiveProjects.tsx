import { IBidManagement } from '@/app/interfaces/bid-management/bid-management.interface';
import { BidIntro } from '../../sub-contractor/components/BidIntro';
import { useState } from 'react';
import { BidDetails } from './BidDetails';
import { useQuery } from 'react-query';
import { bidManagementService } from '@/app/services/bid-management.service';
import { proposalService } from '@/app/services/proposal.service';


export function ActiveProjects() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBid, setSelectedBid] = useState<IBidManagement | null>(null);
  const [selectedBidProjectDetails, setSelectedBidProjectDetails] = useState<any>(null);

  let currentPage = 1

  const params = {
    page: currentPage,
    status: 'active',
    limit: 10
  }
  const fetchSavedBids = async () => {
    return bidManagementService.httpGetUserSavedBids(params);
  };

  const getProjectProposalDetails = async (bidProject: any) => {
    setIsLoading(true);
    setSelectedBidProjectDetails(null);
    try {
      setSelectedBid(bidProject as unknown as IBidManagement);

      const { data }: any = await proposalService.httpGetProposalDetailsByProjectId(bidProject.projectId?._id);
      if(data) {
        setIsLoading(false);
        setSelectedBidProjectDetails(data?.bidDetails);
      }
    } catch(err){
      setIsLoading(false);
      console.log('could not get project proposal details', err);
    }
  }

  const savedBids = useQuery(['saved-bids'], fetchSavedBids);

  const savedUserBids: any =
  savedBids.data && savedBids.data.data
    ? savedBids.data.data?.savedBids
    : [];


  return (
    <div>
      <div className={`grid grid-cols-12 gap-4`}>
        <div className={`${selectedBid ? 'col-span-8' : 'col-span-12'}`}>
          {savedUserBids.map((bidProject: any) =>
            <BidIntro
              key={bidProject._id}
              bid={bidProject as unknown as IBidManagement}
              onClick={() => getProjectProposalDetails(bidProject)}
              isSelected={selectedBid?._id === bidProject._id}
            />
          )}
        </div>
        {isLoading ? <h1>Loading...</h1> : !isLoading && selectedBid && selectedBidProjectDetails ? (
          <div className="col-span-4 py-[24px] px-[17px] rounded-lg mt-3 border border-[#E9E9EA]">
            <BidDetails bid={selectedBid} selectedBidProjectDetails={selectedBidProjectDetails} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
