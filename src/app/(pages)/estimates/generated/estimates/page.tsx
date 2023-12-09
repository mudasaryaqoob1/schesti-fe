'use client';
import Button from '@/app/component/customButton/button';
import Heading from '@/app/component/customheading/heading';
import { tertiaryHeading } from '@/globals/tailwindvariables';
import { useRouter } from 'next/navigation';
// import Table from '@/app/component/table/submittedestimate/';
import Pagination from '@/app/component/pagination';
import { submittedestimateData, submittedestimateHeadings } from './data';

const Client = () => {
    const router = useRouter();

    return (
        <>
            <section className="pb-3 px-12">
                <div className="p-5 rounded-s-xl border-2 border-silverGray">
                    <div className="flex justify-between items-center mb-3">
                        <Heading
                            styledVars={tertiaryHeading}
                            title="Submitted Estimate"
                            className="text-graphiteGray"
                        />
                        <Button
                            text="Start New Esstimate"
                            className="!w-auto"
                            icon="plus.svg"
                            iconwidth={20}
                            iconheight={20}
                            onClick={() => router.push('/estimates/generated/add')}
                        />
                    </div>
                    {/* <Table submittedData={submittedestimateData} headings={submittedestimateHeadings} /> */}
                    <Pagination />
                </div>
            </section>
        </>
    );
};

export default Client;