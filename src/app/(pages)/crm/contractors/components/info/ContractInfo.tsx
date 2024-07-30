import SenaryHeading from '@/app/component/headings/senaryHeading';
import { ICrmContract } from '@/app/interfaces/crm/crm-contract.interface';
import moment from 'moment';
import Image from 'next/image';

type Props = {
  contract: ICrmContract;
};

export function ContractInfo({ contract }: Props) {
  function getReceiverName(receiver: ICrmContract['receiver']) {
    if (typeof receiver !== 'string') {
      if (
        receiver.module === 'subcontractors' ||
        receiver.module === 'partners'
      ) {
        return receiver.companyRep;
      }
      return `${receiver.firstName} ${receiver.lastName || ''}`;
    }
    return '';
  }

  function getReceiverCompany(receiver: ICrmContract['receiver']) {
    if (typeof receiver !== 'string') {
      if (
        receiver.module === 'subcontractors' ||
        receiver.module === 'partners'
      ) {
        return receiver.name;
      }
      return receiver.companyName;
    }
    return '';
  }

  return (
    <div>
      <SenaryHeading
        title={contract.title}
        className="text-schestiPrimaryBlack font-bold text-xl leading-7"
      />

      <div className="mt-5 grid grid-cols-4 gap-4">
        <div className="space-y-2">
          <SenaryHeading
            title="Project Name"
            className="text-schestiLightBlack text-base"
          />

          <SenaryHeading
            title={contract.projectName}
            className="text-schestiPrimaryBlack font-normal text-base"
          />
        </div>

        <div className="space-y-2">
          <SenaryHeading
            title="Project Number"
            className="text-schestiLightBlack text-base"
          />

          <SenaryHeading
            title={contract.projectNo}
            className="text-schestiPrimaryBlack font-normal text-base"
          />
        </div>

        <div className="space-y-2">
          <SenaryHeading
            title="Start Date"
            className="text-schestiLightBlack text-base"
          />

          <SenaryHeading
            title={moment(contract.startDate).format('DD/MM/YYYY')}
            className="text-schestiPrimaryBlack font-normal text-base"
          />
        </div>

        <div className="space-y-2">
          <SenaryHeading
            title="End Date"
            className="text-schestiLightBlack text-base"
          />

          <SenaryHeading
            title={moment(contract.endDate).format('DD/MM/YYYY')}
            className="text-schestiPrimaryBlack font-normal text-base"
          />
        </div>
      </div>

      <div className="gap-2 mt-5">
        <SenaryHeading
          title="Description"
          className="text-schestiLightBlack text-base"
        />

        <SenaryHeading
          title={contract.description}
          className="text-schestiPrimaryBlack font-normal text-base"
        />
      </div>

      <div className="mt-5 p-6 bg-gray-50 rounded-md">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <SenaryHeading
              title="Company Information"
              className="text-base text-schestiPrimary font-medium"
            />
            <div>
              <SenaryHeading
                title={
                  typeof contract.user != 'string'
                    ? `${contract.user.name}`
                    : ''
                }
                className="text-schestiPrimaryBlack font-normal text-base"
              />
              <SenaryHeading
                title={
                  typeof contract.user != 'string'
                    ? `${contract.user.companyName || contract.user.organizationName}`
                    : ''
                }
                className="text-schestiPrimaryBlack font-normal text-base"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Image alt="call" src={'/call.svg'} width={20} height={20} />
              <SenaryHeading
                title={
                  typeof contract.user != 'string'
                    ? `${contract.user.phone}`
                    : ''
                }
                className="text-schestiPrimaryBlack font-normal text-base"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Image
                alt="mail"
                src={'/mail-black.svg'}
                width={20}
                height={20}
              />
              <SenaryHeading
                title={
                  typeof contract.user != 'string'
                    ? `${contract.user.email}`
                    : ''
                }
                className="text-schestiPrimaryBlack font-normal text-base"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Image
                alt="location"
                src={'/navigation-black.svg'}
                width={20}
                height={20}
              />
              <SenaryHeading
                title={
                  typeof contract.user != 'string'
                    ? `${contract.user.address}`
                    : ''
                }
                className="text-schestiPrimaryBlack font-normal text-base"
              />
            </div>
          </div>

          <div className="space-y-3">
            <SenaryHeading
              title="Receiver Information"
              className="text-base text-schestiPrimary font-medium"
            />
            <div>
              <SenaryHeading
                title={
                  typeof contract.receiver != 'string'
                    ? `${getReceiverName(contract.receiver)}`
                    : ''
                }
                className="text-schestiPrimaryBlack font-normal text-base"
              />
              <SenaryHeading
                title={
                  typeof contract.receiver != 'string'
                    ? `${getReceiverCompany(contract.receiver)}`
                    : ''
                }
                className="text-schestiPrimaryBlack font-normal text-base"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Image alt="call" src={'/call.svg'} width={20} height={20} />
              <SenaryHeading
                title={
                  typeof contract.receiver != 'string'
                    ? `${contract.receiver.phone}`
                    : ''
                }
                className="text-schestiPrimaryBlack font-normal text-base"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Image
                alt="mail"
                src={'/mail-black.svg'}
                width={20}
                height={20}
              />
              <SenaryHeading
                title={
                  typeof contract.receiver != 'string'
                    ? `${contract.receiver.email}`
                    : ''
                }
                className="text-schestiPrimaryBlack font-normal text-base"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Image
                alt="location"
                src={'/navigation-black.svg'}
                width={20}
                height={20}
              />
              <SenaryHeading
                title={
                  typeof contract.receiver != 'string'
                    ? `${contract.receiver.address}`
                    : ''
                }
                className="text-schestiPrimaryBlack font-normal text-base"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
