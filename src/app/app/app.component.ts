import { Component, ChangeDetectorRef, OnDestroy, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {MediaMatcher} from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material';


import {
  AppState,

  selectEffectiveTheme
} from '../core/core.module';
import { SettingsState, State } from '../core/settings/settings.model';
import {
  actionSettingsChangeTheme
} from '../core/settings/settings.actions';
import { selectSettings } from '../core/settings/settings.selector';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  theme$: Observable<string>;
  settings$: Observable<SettingsState>;
  darkModeQuery: MediaQueryList;
  
  constructor(
    private store: Store<State>,
    private media: MediaMatcher, 
    private ngZone: NgZone,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.settings$ = this.store.pipe(select(selectSettings));
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
    this.darkModeQuery = this.media.matchMedia('(prefers-color-scheme: dark)');
    this.darkModeQuery.addListener(this.myListener.bind(this));
    this.myListener(this.media.matchMedia('(prefers-color-scheme: dark)'));
    this.showIosInstallBanner();
  }

  ngOnDestroy() {
    this.darkModeQuery.removeListener(this.myListener);
  }


  async showIosInstallBanner() {

    const isInStandaloneMode = () => ('standalone' in window.navigator);
    // Checks if it should display install popup notification
    if (this.isIos() && !this.isRunningStandalone()) {
      this.openSnackBar("Para installar la app, pulsa el icono de compartir y selecciona 'Añadir a la pantalla de inicio'")
    }
  }

  isIos() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }

  isRunningStandalone() {
    return (window.matchMedia('(display-mode: standalone)').matches);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Ok", {
      duration: 8000,
    });
  }

  myListener(event) {
    const theme = event.matches ? 'DARK-THEME' : 'DEFAULT-THEME';
    
    this.ngZone.run(() => {
      this.store.dispatch(actionSettingsChangeTheme({ theme }));   
    });

    
  }
}
