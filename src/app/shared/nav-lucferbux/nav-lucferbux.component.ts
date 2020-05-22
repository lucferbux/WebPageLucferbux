import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Component} from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { AuthService } from '../../core/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Event, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


export interface linkPage {
  link: string,
  image: string,
  text: string
}

@Component({
  selector: 'nav-lucferbux',
  templateUrl: './nav-lucferbux.component.html',
  styleUrls: ['./nav-lucferbux.component.scss']
})

export class NavLucferbuxComponent {

  logged: Observable<Boolean>;
  isHome = false;
  linksActive: linkPage[];
  isHandset = false;

  iconArrays = [
    {link: "news", image: "home", text: 'navbar.news'},
    {link: "aboutme", image: "face", text: 'navbar.aboutme'},
    {link: "projects", image: "business_center", text: 'navbar.projects'},
    {link: "posts", image: "border_color", text: 'navbar.posts'}
  ]

  iconArraysAuth = [
    {link: "edit/news", image: "build", text: 'navbar.edit'}
  ]

  constructor(private breakpointObserver: BreakpointObserver, 

    public auth: AuthService,
    public snackBar: MatSnackBar,
    public router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private translate: TranslateService) {
        this.logged =  this.auth.user.pipe(
          map(user => !! user)      
        );
        this.matIconRegistry.addSvgIcon(
          "github",
          this.domSanitizer.bypassSecurityTrustResourceUrl("assets/github.svg")
        );
        this.matIconRegistry.addSvgIcon(
          "twitter",
          this.domSanitizer.bypassSecurityTrustResourceUrl("assets/twitter.svg")
        );
        this.matIconRegistry.addSvgIcon(
          "linkedin",
          this.domSanitizer.bypassSecurityTrustResourceUrl("assets/linkedin.svg")
        );

        this.matIconRegistry.addSvgIcon(
          "codepen",
          this.domSanitizer.bypassSecurityTrustResourceUrl("assets/codepen.svg")
        );

        
        this.matIconRegistry.addSvgIcon(
          "webpage",
          this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icon-webpage.svg")
        );

        this.matIconRegistry.addSvgIcon(
          "webpage-black",
          this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icon-webpage-black.svg")
        );

        
        this.breakpointObserver.observe([Breakpoints.XSmall]).subscribe(result => { if(result.matches){ this.isHandset = false } })
        this.breakpointObserver.observe([Breakpoints.Small]).subscribe(result => {   if(result.matches){ this.isHandset = true }  })
        this.breakpointObserver.observe([Breakpoints.Medium]).subscribe(result => { if(result.matches){ this.isHandset = true } })
        this.breakpointObserver.observe([Breakpoints.Large]).subscribe(result => { if(result.matches){ this.isHandset = true } })
        this.breakpointObserver.observe([Breakpoints.XLarge]).subscribe(result => { if(result.matches){ this.isHandset = true } })

        this.router.events.subscribe((event: Event) => {
          if ( event instanceof NavigationEnd ) {
            this.isHome = event.url == "/home" || event.url == "/";
          }
          
        });
       

        this.logged.subscribe(
          (active: Boolean) => {
              this.linksActive = !active ? this.iconArrays : this.iconArrays.concat(this.iconArraysAuth);
          }
        );
    }



    signOut() {
      this.auth.signOut();
      this.openSnackBar("Has cerrado sesión");
    }

    openSnackBar(message: string) {
      this.snackBar.open(message, "Ok", {
        duration: 2000,
      });
    }

    goTwitter() {
      window.open('https://twitter.com/lucferbux', "_blank");
    }   

    goLinkedin() {
      window.open('https://www.linkedin.com/in/lucferbux/', "_blank");
    }

    goGithub() {
      window.open('https://github.com/lucferbux', "_blank");
    }

    goCodepen() {
      window.open('https://codepen.io/lucferbux', "_blank");
    }

}


