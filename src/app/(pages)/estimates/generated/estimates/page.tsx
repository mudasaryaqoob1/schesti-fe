import Button from '@/app/component/customButton/button';
import Table from '@/app/component/table/table';
import Pagination from '@/app/component/pagination';
import { submittedestimateHeadings } from './data';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { bg_style } from '@/globals/tailwindvariables';
import Link from 'next/link';

const Client = () => {

    return (
        <section className="pt-7 px-16 pb-6">
            <div className={`${bg_style} p-5`}>
                <div className="flex justify-between items-center mb-3">
                    <TertiaryHeading
                        title="Submitted Estimate"
                        className="text-graphiteGray"
                    />
                    <Link href={'/estimates/generated'}>
                        <Button
                            text="Start New Esstimate"
                            className="!w-auto"
                            icon="/plus.svg"
                            iconwidth={20}
                            iconheight={20}
                        />
                    </Link>
                </div>
                <Table headings={submittedestimateHeadings} />
                <Pagination />
            </div>
        </section>
    );
};

export default Client;