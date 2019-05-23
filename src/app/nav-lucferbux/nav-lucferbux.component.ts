import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import {MatSnackBar} from '@angular/material';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

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
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  logged: Observable<Boolean>;
  linksActive: linkPage[];
  isHandset = false;

  iconArrays = [
    {link: "introduction", image: "star_border", text: "Introducción"},
    {link: "team", image: "face", text: "¿Quién soy?"},
    {link: "projects", image: "business_center", text: "Proyectos"},
    {link: "patents", image: "border_color", text: "Articulos"},
    //{link: "media", image: "web", text: "Difusión"},
  ]

  iconArraysAuth = [
    {link: "edit/introduction", image: "build", text: "Edit"}
  ]

  constructor(private breakpointObserver: BreakpointObserver, 
    changeDetectorRef: ChangeDetectorRef,  
    media: MediaMatcher, 
    public auth: AuthService,
    public snackBar: MatSnackBar,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
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
        
        this.breakpointObserver.observe([Breakpoints.XSmall]).subscribe(result => { if(result.matches){ this.isHandset = false } })
        this.breakpointObserver.observe([Breakpoints.Small]).subscribe(result => {   if(result.matches){ this.isHandset = true }  })
        this.breakpointObserver.observe([Breakpoints.Medium]).subscribe(result => { if(result.matches){ this.isHandset = true } })
        this.breakpointObserver.observe([Breakpoints.Large]).subscribe(result => { if(result.matches){ this.isHandset = true } })

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
      window.location.href='https://twitter.com/lucferbux';
    }   

    goLinkedin() {
      window.location.href='https://www.linkedin.com/in/lucferbux/';
    }

    goGithub() {
      window.location.href='https://github.com/lucferbux';
    }


}


