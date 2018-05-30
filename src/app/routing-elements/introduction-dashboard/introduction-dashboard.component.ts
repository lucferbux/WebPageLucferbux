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
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  cards: IntroId[];

  constructor(private breakpointObserver: BreakpointObserver, private tfs: FirebaseService, private router: Router, private editService: EditDataService  ,public auth: AuthService) {
    this.getData()
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

  removeCard(card: IntroId) {
    this.tfs.removeIntroEntry(card);
  }



}
