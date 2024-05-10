import { USER_ROLES_ENUM } from '@/app/constants/constant';
import { IUserInterface } from '../interfaces/user.interface';

const ContractorPages = {
    CompanyDetails: "/companydetails", // will have a user id,
    Plans: "/plans",
}

const SubContractorPages = {
    CompanyDetails: "/companydetails", // will have a user id,
    Trades: "/trades",
    Verification: "/verification",
    Plans: "/plans"
}

const OwnerPages = {
    CompanyDetails: "/companydetails",
    Plans: "/plans",
}


export function navigateUserWhileAuth(user: IUserInterface) {
    if (user.userRole === USER_ROLES_ENUM.CONTRACTOR) {
        return navigateContractor(user);
    }
    if (user.userRole === USER_ROLES_ENUM.SUBCONTRACTOR) {
        return navigateSubContractor(user);
    }
    if (user.userRole === USER_ROLES_ENUM.OWNER) {
        return navigateOwner(user);
    }
    return null;
}

function navigateContractor(user: IUserInterface) {
    const haveCompanyDetails = user.companyName && user.address && user.industry && user.phone && user.country && user.state && user.city;
    if (!haveCompanyDetails) {
        return ContractorPages.CompanyDetails;
    }
    const havePlan = user.planId;
    if (!havePlan) {
        return ContractorPages.Plans;
    }
    return null;
}

function navigateSubContractor(user: IUserInterface) {
    const haveCompanyDetails = user.companyName && user.address && user.industry && user.phone && user.country && user.state && user.city;
    if (!haveCompanyDetails) {
        return SubContractorPages.CompanyDetails;
    }
    const haveTrades = user.selectedTrades;
    if (!haveTrades) {
        return SubContractorPages.Plans;
    }
    const haveVerification = user.verificationsData?.license && user.verificationsData?.preQualification && user.verificationsData?.secretaryOfState;
    if (!haveVerification) {
        return SubContractorPages.Verification;
    }
    const havePlan = user.planId;
    if (!havePlan) {
        return SubContractorPages.Plans;
    }
    return null;

}

function navigateOwner(user: IUserInterface) {

    const haveCompanyDetails = user.companyName && user.address && user.industry && user.phone && user.country && user.state && user.city;
    if (!haveCompanyDetails) {
        return OwnerPages.CompanyDetails;
    }
    const havePlan = user.planId;
    if (!havePlan) {
        return OwnerPages.Plans;
    }
    return null;
}