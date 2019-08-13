import { createSelector } from '@ngrx/store';

import { SettingsState } from './settings.model';
import { selectSettingsState } from '../core.state';

export const selectSettings = createSelector(
    selectSettingsState,
    (state: SettingsState) => state
  );

export const selectTheme = createSelector(
    selectSettings,
    settings => settings.theme
  );
  
  export const selectAutoNightMode = createSelector(
    selectSettings,
    settings => settings.autoNightMode
  );

  export const selectNightTheme = createSelector(
    selectSettings,
    settings => settings.nightTheme
  );

  export const selectHour = createSelector(
    selectSettings,
    settings => settings.hour
  );
  
  export const selectIsNightHour = createSelector(
    selectAutoNightMode,
    selectHour,
    (autoNightMode, hour) => autoNightMode && (hour >= 21 || hour <= 7)
  );

export const selectEffectiveTheme = createSelector(
    selectTheme,
    selectNightTheme,
    (theme, nightTheme, isNightHour) =>
      (isNightHour ? nightTheme : theme).toLowerCase()
  );
  