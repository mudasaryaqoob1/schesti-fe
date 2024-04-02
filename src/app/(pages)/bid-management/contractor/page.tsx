'use client';
import { withAuth } from "@/app/hoc/withAuth";

function ContractorScreen() {
    return (
        <div>
            <h1>Contractor</h1>
        </div>
    )
}

export default withAuth(ContractorScreen);