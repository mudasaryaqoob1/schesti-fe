import _ from 'lodash';
import { BidIcon } from '../svgs/component-icons/BidIcon';
import { CRMIcon } from '../svgs/component-icons/CrmIcon';
import { QuantityIcon } from '../svgs/component-icons/QuantityIcon';
import { EstimateIcon } from '../svgs/component-icons/EstimateIcon';
import { FinancialIcon } from '../svgs/component-icons/FinancialIcon';
import { ScheduleIcon } from '../svgs/component-icons/ScheduleIcon';
import { MeetingIcon } from '../svgs/component-icons/MeetingIcon';
import { NetworkingIcon } from '../svgs/component-icons/NetworkIcon';
import { ContractIcon } from '../svgs/component-icons/ContractsIcon';

export const Routes = {
  'Bid Management': {
    Posted_Projects: '/bid-management/projects',
    Contractor: '/bid-management/contractor',
    'Sub-Contractor': '/bid-management/sub-contractor',
    Submit: '/bid-management/submit',
    Bidding_Projects: '/bid-management/bids',
    Post_A_Project: '/bid-management/post',
  },
  CRM: {
    Clients: '/crm/clients',
    'Sub-Contractors': '/crm/sub-contractors',
    Partners: '/crm/partners',
    Architects: '/crm/architects',
    Vendors: '/crm/vendors',
    Daily_Work: '/crm/daily-work',
  },
  Contracts: '/contracts',
  'Quantity-Takeoff': {
    Manual: '/take-off',
    'AI-Takeoff': '#',
  },
  Estimates: {
    'Estimates-Requests': '/estimates/requests',
    'Estimates-List': '/estimates/generate',
  },
  Financial: {
    'Financial-Tools': '/financial/tools',
    'Standard-Invoicing': '/financial/standard-invoicing',
    'AIA-Invoicing': '/financial/aia-invoicing',
  },
  Schedule: '/schedule',
  Meetings: '/meeting',
  Networking: '/networking',
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
    Company_Roles: '/settings/companyUser/roles',
  },
  Upgrades: '/upgradeplans',
  Dashboard: '/dashboard',
  Contracts: '/contracts',
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
    value: '/bid-management',
    title: 'Bid Management',
    options: [
      {
        label: 'Find Project',
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
    value: '/crm',
    options: [
      { label: 'Clients', value: Routes.CRM.Clients },
      { label: 'Sub Contractors', value: Routes.CRM['Sub-Contractors'] },
      { label: 'Partners', value: Routes.CRM.Partners },
      { label: 'Architects', value: Routes.CRM.Architects },
      { label: 'Vendors', value: Routes.CRM.Vendors },
      { label: 'Daily Work', value: Routes.CRM.Daily_Work },
    ],
  },
  {
    Icon: ContractIcon,
    label: 'Contracts',
    value:Routes.Contracts,
  },

  {
    title: 'Quantity Takeoff',
    Icon: QuantityIcon,
    label: 'Quantity Takeoff',
    value: '/takeoff',
    options: [
      { label: 'Manual', value: Routes['Quantity-Takeoff'].Manual },
      { label: 'AI Takeoff', value: Routes['Quantity-Takeoff']['AI-Takeoff'] },
    ],
  },

  {
    title: 'Estimates',
    Icon: EstimateIcon,
    label: 'Estimates',
    value: '/estimates',
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
    value: '/financial',
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

type RoutesType = typeof Routes;
export function getRouteFromPermission(permission: string) {
  for (const category in Routes) {
    if (typeof Routes[category as keyof RoutesType] === 'object') {
      const subRoutes = Routes[category as keyof RoutesType] as Record<
        string,
        string
      >;
      for (const subRoute in subRoutes) {
        if (subRoutes[subRoute].includes(permission)) {
          return subRoutes[subRoute];
        }
      }
    } else {
      if (
        Routes[category as keyof RoutesType].toString().includes(permission)
      ) {
        return Routes[category as keyof RoutesType];
      }
    }
  }
  return undefined;
}
