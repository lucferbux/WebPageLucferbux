import { Component } from '@angular/core';
import { FirebaseService } from '../../firebase.service';
import { IntroId } from '../../model/intro'
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { EditDataService } from '../edit-data.service';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'introduction-dashboard',
  templateUrl: './introduction-dashboard.component.html',
  styleUrls: ['./introduction-dashboard.component.scss']
})
export class IntroductionDashboardComponent {

  cards: IntroId[];

  constructor(private tfs: FirebaseService, private router: Router, private editService: EditDataService  ,public auth: AuthService) {
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
    this.router.navigate(["/edit/news"]);
  }

  removeCard(card: IntroId) {
    this.tfs.removeIntroEntry(card);
  }

  goToUrl(url:string) {
    window.open(url, "_blank");
  } 

}
