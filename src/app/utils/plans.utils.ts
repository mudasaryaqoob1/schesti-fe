export const Routes = {
  'Bid Management': {
    Owner: '/bid-management/owner',
    Contractor: '/bid-management/contractor',
    'Sub-Contractor': '/bid-management/sub-contractor',
  },
  CRM: {
    Clients: '/crm/clients',
    'Sub-Contractors': '/crm/sub-contractors',
    Partners: '/crm/partners',
  },
  'Quantity-Takeoff': {
    Manual: '/quantity-takeoff/manual',
    'AI-Takeoff': '/quantity-takeoff/ai-takeoff',
  },
  Estimates: {
    'Estimates-Requests': '/estimates/requests',
    'Estimates-List': '/estimates/list',
  },
  Financial: {
    'Standard-Invoicing': '/financial/standard-invoicing',
    'AIA-Invoicing': '/financial/aia-invoicing',
    'Financial-Tools': '/financial/tools',
  },
  Schedule: '/schedule',
  Meetings: '/meeting',
  Networking: '/networking',
};
export const planFeatureOptions = [
  {
    title: 'Bid Management',
    label: 'Bid Management',
    options: [
      { label: 'Owner', value: Routes['Bid Management'].Owner },
      { label: 'Contractor', value: Routes['Bid Management'].Contractor },
      {
        label: 'Sub Contractor',
        value: Routes['Bid Management']['Sub-Contractor'],
      },
    ],
  },

  {
    title: 'CRM',
    label: 'CRM',
    options: [
      { label: 'Clients', value: Routes.CRM.Clients },
      { label: 'Sub Contractors', value: Routes.CRM['Sub-Contractors'] },
      { label: 'Partners', value: Routes.CRM.Partners },
    ],
  },

  {
    title: 'Quantity Takeoff',
    label: 'Quantity Takeoff',
    options: [
      { label: 'Manual', value: Routes['Quantity-Takeoff'].Manual },
      { label: 'AI Takeoff', value: Routes['Quantity-Takeoff']['AI-Takeoff'] },
    ],
  },

  {
    title: 'Estimates',
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
    value: Routes.Schedule,
  },

  {
    label: 'Meetings',
    value: Routes.Meetings,
  },

  {
    label: 'Networking',
    value: Routes.Networking,
  },
];

export function getPlanFeatureKeyByValue(
  value: string,
  options = planFeatureOptions
) {
  for (const option of options) {
    if (option.options) {
      for (const subOption of option.options) {
        if (subOption.value === value) {
          return `${option.title} - ${subOption.label}`;
        }
      }
    } else if (option.value === value) {
      return option.value;
    }
  }
  return '';
}
