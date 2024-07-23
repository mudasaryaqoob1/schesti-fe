'use client'
import { withAuth } from "@/app/hoc/withAuth"

function ViewContract() {
    return <div>
        View Contract
    </div>
}

export default withAuth(ViewContract)