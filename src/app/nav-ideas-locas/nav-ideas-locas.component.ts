import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import {MatSnackBar} from '@angular/material';

export interface linkPage {
  link: string,
  image: string,
  text: string
}

@Component({
  selector: 'nav-ideas-locas',
  templateUrl: './nav-ideas-locas.component.html',
  styleUrls: ['./nav-ideas-locas.component.css']
})

export class NavIdeasLocasComponent {
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  logged: Observable<Boolean>;
  linksActive: linkPage[];

  iconArrays = [
    {link: "introduction", image: "lightbulb_outline", text: "¿Qué es ideas locas?"},
    {link: "team", image: "people", text: "¿Quiénes somos?"},
    {link: "projects", image: "business_center", text: "Proyectos"},
    {link: "patents", image: "pages", text: "Patentes"},
    {link: "media", image: "web", text: "Difusión"},
  ]

  iconArraysAuth = [
    {link: "edit/introduction", image: "build", text: "Edit"}
  ]

  constructor(private breakpointObserver: BreakpointObserver, 
    changeDetectorRef: ChangeDetectorRef,  
    media: MediaMatcher, 
    public auth: AuthService,
    public snackBar: MatSnackBar) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
        this.logged =  this.auth.user.pipe(
          map(user => !! user)      
        );
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



  

}


