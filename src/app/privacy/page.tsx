/* eslint-disable react/no-unescaped-entities */
import LandingFooter from "../component/footer/LandingFooter";
import { LandingNavbar } from "../component/navbar/LandingNavbar";


const SIDE_LINKS = [
    'GENERAL INFORMATION',
    'PERSONAL DATA AND PROCESSING',
    'LAWFUL BASES FOR PROCESSING',
    'DATA COLLECTION: SCOPE AND PURPOSES',
    'USER RIGHTS',
    'SECURITY AND DATA RETENTION',
    'CHANGES AND CONTACT',
    'ENHANCEMENT OF MARKETING PROFILE',
    'SECURITY ',
    'RETENTION',
    'COMMUNICATIONS FROM SCHESTI',
    'NOTIFICATION OF CHANGES TO THIS PRIVACY POLICY',
    'CHILDREN’S PRIVACY',
    'YOUR RIGHTS',
    'CONTACTING SCHESTI'
]

export default function PrivacyPage() {

    return (
        <section>
            <main
                style={{
                    background: 'linear-gradient(180deg, #8449EB 0%, #6A56F6 100%)',
                }}
                className="h-[501px] relative"
            >
                <LandingNavbar />
                <div className="mt-[101px] xl:mx-auto xl:w-[1063px]">
                    <h1 className="text-center font-extrabold text-white text-[48px] leading-[57px] xl:text-[64px] xl:leading-[80px]">
                        PRIVACY POLICY
                    </h1>
                    <p className="text-center text-white xl:w-[774px] leading-[30px] text-[18px] xl:leading-[44px] font-light xl:text-[24px] xl:mx-auto my-[26px]">
                        Data Controller: Schesti Technologies, Inc., Address: 5109 Hollyridge Dr, Ste 102 Raleigh, NC 27612, USA, Email: legal@Schesti.com
                    </p>
                </div>
            </main>

            <div className="px-[20px] lg:px-[100px] xl:px-[200px] mt-[50px] ">
                <p className="text-base leading-7 font-normal text-[#333E4F]">
                    Schesti is dedicated to safeguarding your personal information. We've aimed to craft this Privacy Policy using clear and straightforward language and to outline our privacy commitments transparently and accessibly. Please read this Privacy Policy carefully before consenting to the processing of your personal data or submitting any personal information on our website, ensuring you fully understand our cooperation terms. This Privacy Policy governs your use of Schesti Services, as detailed in our Terms of Service. It explains how we process the personal data of users on the Schesti Platform, including usage, disclosure conditions, your data rights, and our security measures.
                </p>
            </div>

            <div className="px-[20px] grid grid-cols-12 gap-2 lg:px-[100px] xl:px-[200px] mt-[50px] ">
                <div className="col-span-4 flex flex-col space-y-5">
                    {SIDE_LINKS.map((link) => {
                        return <a className="text-[#333E4F] text-base leading-7 font-medium" href={`#${link}`} key={link}>{link}</a>
                    })}
                </div>
                <div className="col-span-8">
                    <Description
                        title={SIDE_LINKS[0]}
                        description="Schesti is dedicated to safeguarding your personal information. We've aimed to craft this Privacy Policy using clear and straightforward language and to outline our privacy commitments transparently and accessibly. Please read this Privacy Policy carefully before consenting to the processing of your personal data or submitting any personal information on our website, ensuring you fully understand our cooperation terms. This Privacy Policy governs your use of Schesti Services, as detailed in our Terms of Service. It explains how we process the personal data of users on the Schesti Platform, including usage, disclosure conditions, your data rights, and our security measures."
                    />
                    <Description
                        title={SIDE_LINKS[1]}
                        description="Personal data includes any information related to you that allows identification either directly or in combination with other information. Processing encompasses any action taken with your personal data, such as collection, storage, use, and deletion."
                    />

                    <Description
                        title={SIDE_LINKS[2]}
                        description="Schesti processes your data based on consent, service provision under our Terms of Service, legitimate interests (e.g., compliance, business analysis, marketing), legal obligations, or, rarely, to protect vital interests."
                    />

                    <Description
                        title={SIDE_LINKS[3]}
                        description="Schesti collects only necessary information for specific purposes, such as service provision, payment processing, Student, Contractor and Subcontractor verification, marketing, user interaction, analytics, and legal compliance. This includes registration data, communication preferences, usage and cookie data, payment and transaction details, and feedback.
                        We share your data with third-party service providers under strict data protection agreements to support service delivery, security, and legal compliance. This may include analytics, customer communication, payment processing, and marketing services."
                    />
                    <Description
                        title={SIDE_LINKS[4]}
                        description="Schesti collects only necessary information for specific purposes, such as service provision, payment processing, Student, Contractor and Subcontractor verification, marketing, user interaction, analytics, and legal compliance. This includes registration data, communication preferences, usage and cookie data, payment and transaction details, and feedback.
                        We share your data with third-party service providers under strict data protection agreements to support service delivery, security, and legal compliance. This may include analytics, customer communication, payment processing, and marketing services."
                    />
                    <Description
                        title={SIDE_LINKS[5]}
                        description="Schesti collects only necessary information for specific purposes, such as service provision, payment processing, Student, Contractor and Subcontractor verification, marketing, user interaction, analytics, and legal compliance. This includes registration data, communication preferences, usage and cookie data, payment and transaction details, and feedback.
                        We share your data with third-party service providers under strict data protection agreements to support service delivery, security, and legal compliance. This may include analytics, customer communication, payment processing, and marketing services."
                    />
                    <Description
                        title={SIDE_LINKS[6]}
                        description="Schesti collects only necessary information for specific purposes, such as service provision, payment processing, Student, Contractor and Subcontractor verification, marketing, user interaction, analytics, and legal compliance. This includes registration data, communication preferences, usage and cookie data, payment and transaction details, and feedback.
                        We share your data with third-party service providers under strict data protection agreements to support service delivery, security, and legal compliance. This may include analytics, customer communication, payment processing, and marketing services."
                    />
                    <Description
                        title={SIDE_LINKS[7]}
                        description="Schesti collects only necessary information for specific purposes, such as service provision, payment processing, Student, Contractor and Subcontractor verification, marketing, user interaction, analytics, and legal compliance. This includes registration data, communication preferences, usage and cookie data, payment and transaction details, and feedback.
                        We share your data with third-party service providers under strict data protection agreements to support service delivery, security, and legal compliance. This may include analytics, customer communication, payment processing, and marketing services."
                    />
                    <Description
                        title={SIDE_LINKS[8]}
                        description="Schesti collects only necessary information for specific purposes, such as service provision, payment processing, Student, Contractor and Subcontractor verification, marketing, user interaction, analytics, and legal compliance. This includes registration data, communication preferences, usage and cookie data, payment and transaction details, and feedback.
                        We share your data with third-party service providers under strict data protection agreements to support service delivery, security, and legal compliance. This may include analytics, customer communication, payment processing, and marketing services."
                    />
                    <Description
                        title={SIDE_LINKS[9]}
                        description="Schesti collects only necessary information for specific purposes, such as service provision, payment processing, Student, Contractor and Subcontractor verification, marketing, user interaction, analytics, and legal compliance. This includes registration data, communication preferences, usage and cookie data, payment and transaction details, and feedback.
                        We share your data with third-party service providers under strict data protection agreements to support service delivery, security, and legal compliance. This may include analytics, customer communication, payment processing, and marketing services."
                    />
                    <Description
                        title={SIDE_LINKS[10]}
                        description="Schesti collects only necessary information for specific purposes, such as service provision, payment processing, Student, Contractor and Subcontractor verification, marketing, user interaction, analytics, and legal compliance. This includes registration data, communication preferences, usage and cookie data, payment and transaction details, and feedback.
                        We share your data with third-party service providers under strict data protection agreements to support service delivery, security, and legal compliance. This may include analytics, customer communication, payment processing, and marketing services."
                    />
                    <Description
                        title={SIDE_LINKS[11]}
                        description="Schesti collects only necessary information for specific purposes, such as service provision, payment processing, Student, Contractor and Subcontractor verification, marketing, user interaction, analytics, and legal compliance. This includes registration data, communication preferences, usage and cookie data, payment and transaction details, and feedback.
                        We share your data with third-party service providers under strict data protection agreements to support service delivery, security, and legal compliance. This may include analytics, customer communication, payment processing, and marketing services."
                    />
                    <Description
                        title={SIDE_LINKS[12]}
                        description="Schesti collects only necessary information for specific purposes, such as service provision, payment processing, Student, Contractor and Subcontractor verification, marketing, user interaction, analytics, and legal compliance. This includes registration data, communication preferences, usage and cookie data, payment and transaction details, and feedback.
                        We share your data with third-party service providers under strict data protection agreements to support service delivery, security, and legal compliance. This may include analytics, customer communication, payment processing, and marketing services."
                    />
                    <Description
                        title={SIDE_LINKS[13]}
                        description="Schesti collects only necessary information for specific purposes, such as service provision, payment processing, Student, Contractor and Subcontractor verification, marketing, user interaction, analytics, and legal compliance. This includes registration data, communication preferences, usage and cookie data, payment and transaction details, and feedback.
                        We share your data with third-party service providers under strict data protection agreements to support service delivery, security, and legal compliance. This may include analytics, customer communication, payment processing, and marketing services."
                    />
                    <Description
                        title={SIDE_LINKS[14]}
                        description="Schesti collects only necessary information for specific purposes, such as service provision, payment processing, Student, Contractor and Subcontractor verification, marketing, user interaction, analytics, and legal compliance. This includes registration data, communication preferences, usage and cookie data, payment and transaction details, and feedback.
                        We share your data with third-party service providers under strict data protection agreements to support service delivery, security, and legal compliance. This may include analytics, customer communication, payment processing, and marketing services."
                    />
                    <Description
                        title={SIDE_LINKS[15]}
                        description="Schesti collects only necessary information for specific purposes, such as service provision, payment processing, Student, Contractor and Subcontractor verification, marketing, user interaction, analytics, and legal compliance. This includes registration data, communication preferences, usage and cookie data, payment and transaction details, and feedback.
                        We share your data with third-party service providers under strict data protection agreements to support service delivery, security, and legal compliance. This may include analytics, customer communication, payment processing, and marketing services."
                    />
                </div>

            </div>

            <LandingFooter />
        </section>
    );
}

function Description({ description, title }: { title: string, description: string }) {
    return <div id={title} className="mb-2 space-y-2">
        <h3 className="text-[#333E4F] text-base leading-7 font-semibold">{title}</h3>
        <p className="text-[#333E4F] text-base leading-7 font-normal">
            {description}
        </p>
    </div>
}