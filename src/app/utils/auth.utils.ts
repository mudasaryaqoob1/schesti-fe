import { IUserInterface } from '../interfaces/user.interface';
import _ from 'lodash';
import { USER_ROLES } from '../enums/role.enums';

const ContractorPages = {
  CompanyDetails: '/companydetails', // will have a user id,
  Plans: '/plans',
};

const SubContractorPages = {
  CompanyDetails: '/companydetails', // will have a user id,
  Trades: '/trades',
  Verification: '/verification',
  Plans: '/plans',
};

const OwnerPages = {
  CompanyDetails: '/companydetails',
  Plans: '/plans',
};

export function navigateUserWhileAuth(user: IUserInterface) {
  console.log(user.userRole);
  if (user.userRole === USER_ROLES.CONTRACTOR) {
    return navigateContractor(user);
  }
  if (user.userRole === USER_ROLES.SUBCONTRACTOR) {
    return navigateSubContractor(user);
  }
  if (user.userRole === USER_ROLES.OWNER) {
    return navigateOwner(user);
  }
  return null;
}

function navigateContractor(user: IUserInterface) {
  const haveCompanyDetails =
    Boolean(user.companyName) &&
    Boolean(user.address) &&
    Boolean(user.industry) &&
    Boolean(user.phone) &&
    Boolean(user.country) &&
    Boolean(user.state) &&
    Boolean(user.city) &&
    Boolean(user.employee);
  console.log('haveCompanyDetails', haveCompanyDetails);
  if (!haveCompanyDetails) {
    return `${ContractorPages.CompanyDetails}/${user._id}`;
  }
  const havePlan = user.planId;
  if (!havePlan) {
    return ContractorPages.Plans;
  }
  return null;
}

function navigateSubContractor(user: IUserInterface) {
  const haveCompanyDetails =
    Boolean(user.companyName) &&
    Boolean(user.address) &&
    Boolean(user.industry) &&
    Boolean(user.phone) &&
    Boolean(user.country) &&
    Boolean(user.state) &&
    Boolean(user.city) &&
    Boolean(user.employee);

  const havePlan = Boolean(user.planId);
  const haveTrades = _.isObject(user.selectedTrades);

  if (!haveCompanyDetails) {
    console.log('Subcontractor', haveCompanyDetails);
    return `${ContractorPages.CompanyDetails}/${user._id}`;
  }

  if (!haveTrades) {
    console.log('Subcontractor', haveTrades);
    return SubContractorPages.Trades;
  }

  if (!havePlan) {
    console.log('Subcontractor', havePlan);
    return SubContractorPages.Plans;
  }
  return null;
}

function navigateOwner(user: IUserInterface) {
  const haveCompanyDetails =
    Boolean(user.organizationName) &&
    Boolean(user.address) &&
    Boolean(user.phone) &&
    Boolean(user.country) &&
    Boolean(user.state) &&
    Boolean(user.city);
  if (!haveCompanyDetails) {
    return `${ContractorPages.CompanyDetails}/${user._id}`;
  }
  const havePlan = Boolean(user.planId);
  if (!havePlan) {
    return OwnerPages.Plans;
  }
  return null;
}

export function CheckOtherRoles(authUserRole: string) {
  // check if the authUserRole is in userRoles using lodash
  const roles = Object.values(USER_ROLES);
  return roles.includes(authUserRole);
}
