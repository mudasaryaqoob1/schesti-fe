'use client';
import Button from '@/app/component/customButton/button';
import { useRouter } from 'next/navigation';
import Table from '@/app/component/table/table';
import Pagination from '../../../../component/pagination';
import { takeoffRecords, takeoffRecordsHeadings } from '../../data';
import TertiaryHeading from '@/app/component/headings/tertiary';

const Records = () => {
    const router = useRouter();

    return (
        <>
            <section className="pt-2.5 pb-3 px-12">
                <div className="p-5 rounded-s-xl border-2 border-silverGray">
                    <div className="flex justify-between items-center mb-3">
                        <TertiaryHeading
                            title="Recent Measurements"
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