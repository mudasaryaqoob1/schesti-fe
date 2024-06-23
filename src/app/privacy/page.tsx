/* eslint-disable react/no-unescaped-entities */
import LandingFooter from '../component/footer/LandingFooter';
import { LandingNavbar } from '../component/navbar/LandingNavbar';

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
  'CONTACTING SCHESTI',
];

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
            Data Controller: Schesti Technologies, Inc., Address: 5109
            Hollyridge Dr, Ste 102 Raleigh, NC 27612, USA, Email:
            legal@Schesti.com
          </p>
        </div>
      </main>

      <div className="px-[20px] lg:px-[100px] xl:px-[200px] mt-[50px] ">
        <p className="text-base leading-7 font-normal text-[#333E4F]">
          Schesti is dedicated to safeguarding your personal information. We've
          aimed to craft this Privacy Policy using clear and straightforward
          language and to outline our privacy commitments transparently and
          accessibly. Please read this Privacy Policy carefully before
          consenting to the processing of your personal data or submitting any
          personal information on our website, ensuring you fully understand our
          cooperation terms. This Privacy Policy governs your use of Schesti
          Services, as detailed in our Terms of Service. It explains how we
          process the personal data of users on the Schesti Platform, including
          usage, disclosure conditions, your data rights, and our security
          measures.
        </p>
      </div>

      <div className="px-[20px] grid grid-cols-12 gap-2 lg:px-[100px] xl:px-[200px] my-[50px] ">
        <div className="col-span-4 relative">
          <div className=" flex flex-col space-y-5 top-0 bottom-5 sticky">
            {SIDE_LINKS.map((link) => {
              return (
                <a
                  className="text-[#333E4F] text-base leading-7 font-medium"
                  href={`#${link}`}
                  key={link}
                >
                  {link}
                </a>
              );
            })}
          </div>
        </div>
        <div className="col-span-8">
          <Description
            title={SIDE_LINKS[0]}
            description="Access to the Schesti Platform, including the website, app, and related software, is available with mandatory account registration. You may browse our website without registering, but app use requires account setup. Visiting our website results in log information collection and cookie placement on your device to track your activity. You can opt out of non-essential cookies.
                        Upon account registration, Schesti may collect and process information you provide, including contact details, timezone, preferred language, IP address, and device type. Users can also add profile pictures and chosen currency as per our Refund and Payments Policy.
                        We might update this Privacy Policy, so please review it periodically. Changes will be posted here and communicated via email for significant updates.
                        For any questions regarding this policy or our services, please contact legal@Schesti.com."
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
                        We share your data with third-party service providers under strict data protection agreements to support service delivery, security, and legal compliance. This may include analytics, customer communication, payment processing, and marketing services.
                        "
          />
          <Description
            title={SIDE_LINKS[4]}
            description="You have rights regarding your data, including access, correction, deletion, restriction, portability, objection, and consent withdrawal. We provide mechanisms for exercising these rights, such as account settings and direct contact options."
          />
          <Description
            title={SIDE_LINKS[5]}
            description="Schesti employs technical and organizational measures to ensure data security. Your data is retained only as long as necessary for the purposes for which it is processed, with specific retention periods for different types of data."
          />
          <Description
            title={SIDE_LINKS[6]}
            description={`We reserve the right to modify this Privacy Policy, notifying users of significant changes. For questions or concerns about your data or rights, please contact us at legal@Schesti.com.
                        Schesti is committed to protecting your privacy and ensuring the secure and respectful treatment of your personal data.
                        
                        We do not sell Personal Information. However, we may share your Personal Information with our partners, who may use your Personal Information to contact you, in their sole discretion. Additionally, we will share your Personal Information with third parties where required by law, where it is necessary in connection with the Services, with Service Providers to facilitate use of the Services, or where we have another legitimate interest in doing so. If we are subject to a merger or acquisition with/by another company, we may share information with the other company in connection with the transaction and your Personal Information may be transferred to such company upon completion. Such acquiring company’s right to use your data shall be limited to the terms of this Privacy Policy unless additional notice is provided to you.`}
          />
          <Description
            title={SIDE_LINKS[7]}
            description="We may purchase third party marketing data and add it to our user database to target our advertising and provide pertinent offers to our users. We use this information to enhance the profile of individual users, and it is tied to users’ Personal Information. This information is not collected directly from users, but from third party sources."
          />
          <Description
            title={SIDE_LINKS[8]}
            description="Security of information communicated by or to us over the Internet is of utmost concern to us; however, no data transmission over the Internet can be guaranteed to be 100% secure. The Services incorporate reasonable safeguards to protect the security, integrity, and privacy of the Personal Information we have collected. Please do not use email to communicate information to us that you consider confidential. While we strive to protect your Personal information, Schesti cannot ensure or warrant the security of any information you transmit to us or through the Services."
          />
          <Description
            title={SIDE_LINKS[9]}
            description="Schesti will retain your Personal Information for the period necessary to fulfill the purposes outlined in this Privacy Policy unless a longer retention period is required or permitted by law. We may also retain Usage Information for internal analysis purposes. Usage Information is generally retained for a shorter period of time, except when Usage Information is used to strengthen the security or to improve the functionality of the Services, or we are legally obligated to retain Usage Information for longer periods. "
          />
          <Description
            title={SIDE_LINKS[10]}
            description={`Opt-Out Users may always “opt-out” of having their information used for most purposes. For example, users who no longer wish to receive our newsletter and promotional communications may opt-out of receiving those communications by contacting us at www.Schesti.com/request-a-demo. Notifications for Registered Users Registered users of the Services may receive regular communications from us regarding bid requests we have received, or directly from our users. We may use any contact information we have for Service Providers to provide such communications. 
                        Registered users can update and maintain their Personal Information through the Services. Changes made are immediately reflected throughout our system.
                        Promotional Communications We send all new members an e-mail to verify usernames and passwords. Existing users will occasionally receive information on our services, products and special deals as well. We offer all users the opportunity to opt-out of these communications. 
                        
                        Newsletter We may provide our users with a newsletter about the Services. We also offer users the opportunity to opt-out of these types of communications. Announcements We may occasionally need to send out service-related announcements. Users may not opt-out of these communications, though they may deactivate their account entirely.
                        `}
          />
          <Description
            title={SIDE_LINKS[11]}
            description="Schesti may update this Privacy Policy at any time without prior notice, to reflect changes in Schesti’s practices. Any changes to the Privacy Policy will become effective upon the posting of the updated policy. We will announce any material changes to this Privacy Policy through an alert on the Site and/or via email. 

                        You are encouraged to periodically review this Privacy Policy to stay informed about any changes to it or other policies. Your use of the Services indicates your acceptance of the terms of the Privacy Policy currently in effect."
          />
          <Description
            title={SIDE_LINKS[12]}
            description="The Children’s Online Privacy and Protection Act of 1998 (“COPPA”) defines a “Child” (or “Children” as used herein) as anyone under the age of 13. Schesti strictly complies with COPPA. Therefore, we do not collect or retain information obtained through the Services from individuals we know are under 13, and none of the Services are designed to attract individuals under 13. By using the Services, you confirm that you are at least 13 years old. If you do not meet this age requirement, you must refrain from accessing or using the Services. If you are a parent or guardian and you discover that your Child has provided us with Personal Information, please contact us via one of the methods listed under “Contacting Schesti” below. If we become aware that we have collected Personal Information from Children without parental consent, we take reasonable steps to delete that information from our servers. For further information about COPPA, which pertains to websites targeting children under the age of thirteen (13), please visit the Federal Trade Commission’s website: https://www.ftc.gov/tips-advice/business-center/guidance/complying-coppa-frequently-asked-questions."
          />
          <Description
            title={SIDE_LINKS[13]}
            description="If you are entitled to specific rights regarding your personal information under applicable state law, please contact us at www.Schesti.com/request-a-demo."
          />
          <Description title={SIDE_LINKS[14]}>
            <p className="text-[#333E4F] text-base leading-7 font-normal">
              Users should inform us at{' '}
              <a
                href="/request-a-demo"
                className="text-[#7138DF] font-semibold"
              >
                www.Schesti.com/request-a-demo
              </a>{' '}
              if their Personal Information changes or if they no longer wish to
              use our services. For any questions, concerns, or suggestions
              regarding this Privacy Policy, please contact us at{' '}
              <a
                href="/request-a-demo"
                className="text-[#7138DF] font-semibold"
              >
                www.Schesti.com/request-a-demo
              </a>
              .
            </p>
          </Description>
        </div>
      </div>

      <LandingFooter />
    </section>
  );
}

function Description({
  description,
  title,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div id={title} className="mb-2 space-y-2">
      <h3 className="text-[#333E4F] text-base leading-7 font-semibold">
        {title}
      </h3>
      {children ? (
        children
      ) : (
        <p className="text-[#333E4F] text-base leading-7 font-normal">
          {description}
        </p>
      )}
    </div>
  );
}
