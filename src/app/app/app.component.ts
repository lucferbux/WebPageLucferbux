import { Component, ChangeDetectorRef, OnDestroy, NgZone, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {MediaMatcher} from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  theme$: Observable<string>;
  darkModeQuery: MediaQueryList;

  static isBrowser = new BehaviorSubject<boolean>(null);


  
  constructor(
    private media: MediaMatcher, 
    private ngZone: NgZone,
    public snackBar: MatSnackBar,
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.seti18n();
    AppComponent.isBrowser.next(isPlatformBrowser(platformId));
  }

  ngOnInit(): void {
    this.showIosInstallBanner();
    this.showNewWebpage();
  }

  async showIosInstallBanner() {
    // Checks if it should display install popup notification
    if (this.isIos() && !this.isRunningStandalone()) {
      this.openSnackBar("Para installar la app, pulsa el icono de compartir y selecciona 'Añadir a la pantalla de inicio'")
    }
  }

  showNewWebpage() {

    let snackBarRef = this.snackBar.open("Try my new website (in development)", "Open", {
      duration: 8000,
    });

    snackBarRef.onAction().subscribe(() => {
      window.open("https://lucferbux-webpage.netlify.app/", "_blank");

    })
  }


  seti18n() {
    this.translate.addLangs(['en-US', 'es'])
    this.translate.setDefaultLang('en-US');
    this.translate.use(navigator.language);
  }

  isIos() {
    try {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    } catch (error) {
      return false;
    }
    
  }

  isRunningStandalone() {
    try {
        return window.matchMedia("(display-mode: standalone)").matches;
    } catch (error) {
        return false;
    }
    
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Ok", {
      duration: 8000,
    });
  }

}
