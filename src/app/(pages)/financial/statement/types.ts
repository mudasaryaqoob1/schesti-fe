export type IFinancialStatementState = {
    assets: {
        cashClearing: number,
        startUpInventory: number,

        // Accumulated Depreciation
        accumulatedDepreciationVehicle: number;
        totalAccumulatedDepreciation: number;
    },

    liabilities: {
        healthInsurancePayable: number,
        shareHoldersPayable: number,
        totalLongTermLiabilities: number,
        statePayrollTaxesPayable: number,

    },

    equity: {
        capitalStock: number,
        otherPaidInCapital: number,
        retainedEarnings: number,
    }
}


export type IFinancialStatementCalculatedValues = {
    assets: {
        cashOnBank: number,
        totalStandardInvoices: number,
        contractReceivable: number,
        totalCurrentAssets: () => number,
    },
    longTermAssets: {
        totalLongTermAssets: number,
    }
}