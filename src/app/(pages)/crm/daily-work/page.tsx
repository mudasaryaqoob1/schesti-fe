'use client';
import TertiaryHeading from "@/app/component/headings/tertiary";
import { withAuth } from "@/app/hoc/withAuth";

function DailyWorkPage() {


    return (
        <div className="flex flex-col mx-4 md:mx-24 justify-center flex-wrap mt-12">
            <TertiaryHeading className={'mt-1 mb-2'} title="Daily Work" />

        </div>
    );
}

export default withAuth(DailyWorkPage)