import { IBidManagement } from "@/app/interfaces/bid-management/bid-management.interface";
import { useState } from "react";
import { dummyBidProjects } from "../data";
import { BidIntro } from "../../components/BidIntro";
import { BidDetails } from "./BidDetails";

export function ArchivedProjects() {
    const [selectedBid, setSelectedBid] = useState<IBidManagement | null>(null);


    return <div>
        <div className={`grid grid-cols-12 gap-4`}>
            <div className={`${selectedBid ? "col-span-8" : "col-span-12"}`}>
                {dummyBidProjects.map((bidProject) => {
                    return <BidIntro
                        key={bidProject._id}
                        bid={bidProject as unknown as IBidManagement}
                        onClick={() => setSelectedBid(bidProject as unknown as IBidManagement)}
                        isSelected={selectedBid?._id === bidProject._id}
                    />
                })}
            </div>
            {selectedBid ? <div className="col-span-4 py-[24px] px-[17px] rounded-lg mt-3 border border-[#E9E9EA]">
                <BidDetails
                    bid={selectedBid as unknown as IBidManagement}
                />
            </div> : null}
        </div>
    </div>
}