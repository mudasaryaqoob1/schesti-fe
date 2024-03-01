import { IClientInvoice } from "@/app/interfaces/client-invoice.interface";
import { ISettingTarget } from "@/app/interfaces/companyInterfaces/setting.interface";
import moment from "moment";

export function completedTargets(targets: ISettingTarget[], invoices: IClientInvoice[]) {
    return targets.filter(target => {
        return invoices.find(invoice => {
            return target.month === moment(invoice.applicationDate).format('MMMM') && invoice.amountPaid >= Number(target.price);
        })
    })
}

export function remainingTargets(targets: ISettingTarget[], invoices: IClientInvoice[]) {
    return targets.filter(target => {
        return invoices.find(invoice => {
            return target.month === moment(invoice.applicationDate).format('MMMM') && invoice.amountPaid < Number(target.price);
        })
    })
}
export function targetPercentage(completedLength: number, targetsLength: number) {
    return (completedLength / targetsLength) * 100;
}

export function totalCompletedAmount(completedTargets: ISettingTarget[]) {
    return completedTargets.reduce((acc, target) => {
        return acc + Number(target.price);
    }, 0)
}

export function totalRemainingAmount(remainingTargets: ISettingTarget[]) {
    return remainingTargets.reduce((acc, target) => {
        return acc + Number(target.price);
    }, 0)
}

