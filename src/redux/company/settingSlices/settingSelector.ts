import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const selectSettingTarget = (state: RootState) => state.settingTargets;

export const selectSettingTargetsLoading = createSelector(
  [selectSettingTarget],
  (settingTargets) => settingTargets.loading
);

export const selectSettingTargets = createSelector(
  [selectSettingTarget],
  (settingTargets) => settingTargets.data
);
