import {
    ActionReducerMap,
    MetaReducer,
    createFeatureSelector
  } from '@ngrx/store';
import { SettingsState } from './settings/settings.model';
import { settingsReducer } from './settings/settings.reducer';
import { debug } from './meta-reducers/debug.reducer';
import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';
import { environment } from '../../environments/environment';

export const reducers: ActionReducerMap<AppState> = {
  settings: settingsReducer
};

export const metaReducers: MetaReducer<AppState>[] = [
  initStateFromLocalStorage
];

if (!environment.production) {
  if (!environment.production) {
    metaReducers.unshift(debug);
  }
}

export interface AppState {
    settings: SettingsState;
  }
  
export const selectSettingsState = createFeatureSelector<
  AppState,
  SettingsState
>('settings');