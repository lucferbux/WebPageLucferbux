import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { NotifyService } from './notify.service';
import { StoreModule } from '@ngrx/store';
import {
  selectEffectiveTheme,
} from './settings/settings.selector';
import {
  AppState,
  reducers,
  metaReducers
} from './core.state';



export {
  selectEffectiveTheme,
  AppState
};

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, { metaReducers }),
  ],
  providers: [
    AuthService,
    AuthGuard,
    NotifyService
  ],
  declarations: []
})
export class CoreModule { }
