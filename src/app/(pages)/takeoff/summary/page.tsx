import SenaryHeading from '@/app/component/headings/senaryHeading';
import Image from 'next/image';

const page = () => {
    return (
        <>
            <section className="m-5">
                <div className="p-3">
                    <SenaryHeading
                        className="text-royalIndigo font-medium"
                        title="Area Measurement (2)"
                    />
                    <div className="my-3 flex">
                        <Image src={'/map.png'} alt="image icon" width={137} height={120} />
                        {/* description */}
                        {/* <div> */}
                        {/* property */}
                        <div className="flex justify-between">
                            <p>Subject</p>
                            <p>Area Measurement</p>
                        </div>
                        {/* </div> */}
                        {/* description */}
                    </div>
                </div>
            </section>
        </>
    );
};

export default page;