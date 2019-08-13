import { Component, ChangeDetectorRef, OnDestroy, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {MediaMatcher} from '@angular/cdk/layout';
import {
  AppState,

  selectEffectiveTheme
} from './core/core.module';
import { SettingsState, State } from './core/settings/settings.model';
import {
  actionSettingsChangeTheme
} from './core/settings/settings.actions';
import { selectSettings } from './core/settings/settings.selector';
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
  ) {}

  ngOnInit(): void {
    this.settings$ = this.store.pipe(select(selectSettings));
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
    this.darkModeQuery = this.media.matchMedia('(prefers-color-scheme: dark)');
    this.darkModeQuery.addListener(this.myListener.bind(this));
    this.myListener(this.media.matchMedia('(prefers-color-scheme: dark)'));
  }

  ngOnDestroy() {
    this.darkModeQuery.removeListener(this.myListener);
  }



  myListener(event) {
    const theme = event.matches ? 'DARK-THEME' : 'DEFAULT-THEME';
    this.ngZone.run(() => {
      this.store.dispatch(actionSettingsChangeTheme({ theme }));   
    });
  }
}
