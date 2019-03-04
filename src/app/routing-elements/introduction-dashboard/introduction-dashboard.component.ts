import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { FirebaseService } from '../../firebase.service';
import { Observable } from 'rxjs';
import { Intro, IntroId } from '../../model/intro'
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { EditDataService } from '../edit-data.service';


@Component({
  selector: 'introduction-dashboard',
  templateUrl: './introduction-dashboard.component.html',
  styleUrls: ['./introduction-dashboard.component.css']
})
export class IntroductionDashboardComponent {
  rowHeight: String = "300px";
  isLarge: Boolean = false;
  cards: IntroId[];

  constructor(private breakpointObserver: BreakpointObserver, private tfs: FirebaseService, private router: Router, private editService: EditDataService  ,public auth: AuthService) {
    this.getData()
    this.breakpointObserver.observe([Breakpoints.XSmall]).subscribe(result => { if(result.matches){ this.updateInterface("350px", false) } })
    this.breakpointObserver.observe([Breakpoints.Small]).subscribe(result => {   if(result.matches){ this.updateInterface("300px", false) }  })
    this.breakpointObserver.observe([Breakpoints.Medium]).subscribe(result => { if(result.matches){ this.updateInterface("450px", true) } })
    this.breakpointObserver.observe([Breakpoints.Large]).subscribe(result => { if(result.matches){ this.updateInterface("450px", true) } })
 
  }

  getData(): void {
    this.tfs.retreiveIntro().subscribe(
        (data : IntroId[]) => {
        this.cards = data;
      } 
      
    )
  }

  editCard(card: IntroId) {
    //Update Card
    this.editService.editIntroSource(card);
    this.router.navigate(["/edit/introduction"]);
  }

  updateInterface(height: String, size: Boolean){
    this.rowHeight = height;
    this.isLarge = size;
  }

  removeCard(card: IntroId) {
    this.tfs.removeIntroEntry(card);
  }



}
