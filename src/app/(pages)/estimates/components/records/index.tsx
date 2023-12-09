'use client';
import Button from '@/app/component/customButton/button';
import Heading from '@/app/component/customHeading/heading';
import { tertiaryHeading } from '@/globals/tailwindvariables';
import { useRouter } from 'next/navigation';
import Table from '@/app/component/table/table';
import Pagination from '@/app/component/pagination';
import { estimateRequests, RequestsHeadings } from '../../data';

const Records = () => {
    const router = useRouter();

    return (
        <>
            <section className="pt-2.5 pb-3 px-12">
                <div className="p-5 rounded-s-xl border-2 border-silverGray">
                    <div className="flex justify-between items-center mb-3">
                        <Heading
                            styledVars={tertiaryHeading}
                            title="My Estimate request"
                            classes="text-graphiteGray"
                        />
                        <Button
                            text="Start New Esstimate"
                            className="!w-auto"
                            icon="/plus.svg"
                            iconwidth={20}
                            iconheight={20}
                            onClick={() => router.push('/estimates/requests/takeoff')}
                        />
                    </div>
                    <Table requestsData={estimateRequests} headings={RequestsHeadings} />
                    <Pagination />
                </div>
            </section>
        </>
    );
};

export default Records;
