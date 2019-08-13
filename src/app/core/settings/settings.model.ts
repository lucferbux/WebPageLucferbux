import { AppState } from '../core.module';

export const NIGHT_MODE_THEME = 'DARK-THEME';



export interface SettingsState {
  theme: string;
  nightTheme: string;
  autoNightMode: boolean;
  hour: number;
}

export interface State extends AppState {
  settings: SettingsState;
}
