import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const selectSettingTarget = (state: RootState) => state.settingTargets;
export const selectCompanySetup = (state: RootState) => state.companySetups;

// setting targets
export const selectSettingTargetsLoading = createSelector(
  [selectSettingTarget],
  (settingTargets) => settingTargets.loading
);

export const selectSettingTargets = createSelector(
  [selectSettingTarget],
  (settingTargets) => settingTargets.data
);

// company setup
export const selectCompanySetupLoading = createSelector(
  [selectCompanySetup],
  (settingTargets) => settingTargets.loading
);

export const selectCompanySetups = createSelector(
  [selectCompanySetup],
  (settingTargets) => settingTargets.data
);