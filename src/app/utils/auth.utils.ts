import { IUserInterface } from '../interfaces/user.interface';
import { USER_ROLES_ENUM } from '../constants/constant';

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
  if (
    user.userRole === USER_ROLES_ENUM.PROFESSOR ||
    user.userRole === USER_ROLES_ENUM.STUDENT
  ) {
    return navigateEducational(user);
  } else if (
    user.userRole === USER_ROLES_ENUM.CONTRACTOR ||
    user.userRole === USER_ROLES_ENUM.SUBCONTRACTOR ||
    user.userRole === USER_ROLES_ENUM.ARCHITECT ||
    user.userRole === USER_ROLES_ENUM.VENDOR
  ) {
    return navigateBusiness(user);
  }
  if (user.userRole === USER_ROLES_ENUM.OWNER) {
    return navigateOwner(user);
  }
  return null;
}

function navigateBusiness(user: IUserInterface) {
  if (
    user.userRole === USER_ROLES_ENUM.CONTRACTOR ||
    user.userRole === USER_ROLES_ENUM.SUBCONTRACTOR ||
    user.userRole === USER_ROLES_ENUM.VENDOR ||
    user.userRole === USER_ROLES_ENUM.ARCHITECT
  ) {
    const haveCompanyDetails =
      Boolean(user.companyName) &&
      Boolean(user.address) &&
      // Boolean(user.industry) &&
      Boolean(user.phone) &&
      Boolean(user.country) &&
      Boolean(user.state) &&
      Boolean(user.city) &&
      Boolean(user.employee);

    if (!haveCompanyDetails) {
      return `${ContractorPages.CompanyDetails}/${user._id}`;
    }

    const haveTrades = user.selectedTrades && user.selectedTrades.length != 0;

    if (user.userRole == USER_ROLES_ENUM.SUBCONTRACTOR && !haveTrades) {
      return SubContractorPages.Trades;
    }

    const havePlan = user.subscription && user.subscription.status === 'active';

    if (!havePlan) {
      return ContractorPages.Plans;
    }
  }
  return null;
}

function navigateEducational(user: IUserInterface) {
  if (
    (user.userRole === USER_ROLES_ENUM.PROFESSOR ||
      user.userRole === USER_ROLES_ENUM.STUDENT) &&
    user.isActive === 'pending'
  ) {
    return '/pending';
  }
  const haveDetails =
    Boolean(user.university) &&
    Boolean(user.address) &&
    Boolean(user.educationalDocuments.length) &&
    Boolean(user.phone) &&
    Boolean(user.country) &&
    Boolean(user.state) &&
    Boolean(user.city);

  const havePlan = user.subscription && user.subscription.status === 'active';

  if (!haveDetails) {
    return `${ContractorPages.CompanyDetails}/${user._id}`;
  }
  console.log('plan', havePlan);

  if (!havePlan) {
    console.log('Subcontractor', havePlan);
    return SubContractorPages.Plans;
  }
  return '/dashboard';
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
  const havePlan = user.subscription && user.subscription.status === 'active';
  if (!havePlan) {
    return OwnerPages.Plans;
  }
  return null;
}

export function CheckOtherRoles(authUserRole: string) {
  // check if the authUserRole is in userRoles using lodash
  const roles = Object.values(USER_ROLES_ENUM);
  return roles.includes(authUserRole);
}
