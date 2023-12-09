'use client';
import Button from '@/app/component/customButton/button';
import Heading from '@/app/component/customHeading/heading';
import { tertiaryHeading } from '@/globals/tailwindvariables';
import { useRouter } from 'next/navigation';
import Table from '@/app/component/table/table';
import Pagination from '../../../../component/pagination';
import { takeoffRecords, takeoffRecordsHeadings } from '../../data';

const Records = () => {
    const router = useRouter();

    return (
        <>
            <section className="pt-2.5 pb-3 px-12">
                <div className="p-5 rounded-s-xl border-2 border-silverGray">
                    <div className="flex justify-between items-center mb-3">
                        <Heading
                            styledVars={tertiaryHeading}
                            title="Recent Measurements"
                            classes="text-graphiteGray"
                        />
                        <Button
                            text="Start Measurements"
                            className="!w-auto"
                            icon="plus.svg"
                            iconwidth={20}
                            iconheight={20}
                            onClick={() => router.push('/createclient')}
                        />
                    </div>

                    <Table
                        takeoffRecords={takeoffRecords}
                        headings={takeoffRecordsHeadings}
                    />
                    <Pagination />

                </div>
            </section>
        </>
    );
};

export default Records;