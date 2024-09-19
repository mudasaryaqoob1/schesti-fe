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


    }
}