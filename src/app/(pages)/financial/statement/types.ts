export type IFinancialStatementState = {
    assets: {
        firstCitizenBankPayables: number,
        firstCitizenBankRevenue: number,
        cashClearing: number,
        startUpInventory: number,

        // Accumulated Depreciation
        accumulatedDepreciationVehicle: number;
        totalAccumulatedDepreciation: number;
    }
}