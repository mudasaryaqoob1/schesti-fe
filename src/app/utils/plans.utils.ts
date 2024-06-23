import _ from 'lodash';
import { BidIcon } from '../svgs/component-icons/BidIcon';
import { CRMIcon } from '../svgs/component-icons/CrmIcon';
import { QuantityIcon } from '../svgs/component-icons/QuantityIcon';
import { EstimateIcon } from '../svgs/component-icons/EstimateIcon';
import { FinancialIcon } from '../svgs/component-icons/FinancialIcon';
import { ScheduleIcon } from '../svgs/component-icons/ScheduleIcon';
import { MeetingIcon } from '../svgs/component-icons/MeetingIcon';
import { NetworkingIcon } from '../svgs/component-icons/NetworkIcon';

export const Routes = {
  'Bid Management': {
    Owner: '/bid-management/owner',
    Contractor: '/bid-management/contractor',
    'Sub-Contractor': '/bid-management/sub-contractor',
    Submit: '/bid-management/submit',
    Bidding_Projects: '/bid-management/bids',
    Posted_Projects: '/bid-management/projects',
    Post_A_Project: '/bid-management/post',
  },
  CRM: {
    Clients: '/crm/clients',
    'Sub-Contractors': '/crm/sub-contractors',
    Partners: '/crm/partners',
  },
  'Quantity-Takeoff': {
    Manual: '/takeoff',
    'AI-Takeoff': '#',
  },
  Estimates: {
    'Estimates-Requests': '/estimates/requests',
    'Estimates-List': '/estimates/generate',
  },
  Financial: {
    'Standard-Invoicing': '/financial/standard-invoicing',
    'AIA-Invoicing': '/financial/aia-invoicing',
    'Financial-Tools': '/financial/tools',
  },
  Schedule: '/schedule',
  Meetings: '/meeting',
  Networking: '#',
};

export const OtherRoutes = {
  Settings: {
    General: '/settings/general',
    Plans: '/settings/plans',
    'Category Setup': '/settings/CategorySetup',
    'User Managements': '/settings/companyUser',
    Materials: '/settings/materials',
    Target: '/settings/target',
    'Support Tickets': '/settings/supporttickets',
  },
  Upgrades: '/upgradeplans',
  Dashboard: '/dashboard',
};

export const Plans = {
  'Bid Management': '/bid-management',
  CRM: '/crm',
  'Quantity-Takeoff': '/takeoff',
  Estimates: '/estimates',
  Financial: '/financial',
  Schedule: '/schedule',
  Meetings: '/meeting',
  Networking: '/networking',
} as const;

export const planFeatureOptions = [
  {
    label: 'Bid Management',
    Icon: BidIcon,

    title: 'Bid Management',
    options: [
      {
        label: 'Find Project',
        value: '',
        children: [
          { label: 'Contractor', value: Routes['Bid Management'].Contractor },
          {
            label: 'Sub Contractor',
            value: Routes['Bid Management']['Sub-Contractor'],
          },
        ],
      },
      {
        label: 'Bidding Projects',
        value: Routes['Bid Management'].Bidding_Projects,
      },
      {
        label: 'Posted Projects',
        value: Routes['Bid Management'].Posted_Projects,
      },
      {
        label: 'Post a project',
        value: Routes['Bid Management'].Post_A_Project,
        isAction: true,
      },
    ],
  },

  {
    title: 'CRM',
    Icon: CRMIcon,
    label: 'CRM',
    options: [
      { label: 'Clients', value: Routes.CRM.Clients },
      { label: 'Sub Contractors', value: Routes.CRM['Sub-Contractors'] },
      { label: 'Partners', value: Routes.CRM.Partners },
    ],
  },

  {
    title: 'Quantity Takeoff',
    Icon: QuantityIcon,
    label: 'Quantity Takeoff',
    options: [
      { label: 'Manual', value: Routes['Quantity-Takeoff'].Manual },
      { label: 'AI Takeoff', value: Routes['Quantity-Takeoff']['AI-Takeoff'] },
    ],
  },

  {
    title: 'Estimates',
    Icon: EstimateIcon,
    label: 'Estimates',
    options: [
      {
        label: 'Estimates Requests',
        value: Routes.Estimates['Estimates-Requests'],
      },
      { label: 'Estimates List', value: Routes.Estimates['Estimates-List'] },
    ],
  },

  {
    title: 'Financial',
    Icon: FinancialIcon,
    label: 'Financial',
    options: [
      {
        label: 'Standard Invoicing',
        value: Routes.Financial['Standard-Invoicing'],
      },
      { label: 'AIA Invoicing', value: Routes.Financial['AIA-Invoicing'] },
      { label: 'Financial Tools', value: Routes.Financial['Financial-Tools'] },
    ],
  },

  {
    label: 'Schedule',
    Icon: ScheduleIcon,
    value: Routes.Schedule,
  },

  {
    label: 'Meetings',
    Icon: MeetingIcon,
    value: Routes.Meetings,
  },

  {
    label: 'Networking',
    Icon: NetworkingIcon,
    value: Routes.Networking,
  },
];

export type IPlanFeature = (typeof planFeatureOptions)[number];

export function getPlanFeatureKeyByValue(value: string, options = Plans) {
  const key = _.findKey(options, (val) => val === value);
  return key ? key : '';
}
