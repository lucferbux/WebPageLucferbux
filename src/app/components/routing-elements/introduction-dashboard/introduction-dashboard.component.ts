import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { EditDataService } from '../../../core/edit-data/edit-data.service';
import { IntroId, IntroFirebaseService } from 'src/app/core/firebase/intro.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'introduction-dashboard',
  templateUrl: './introduction-dashboard.component.html',
  styleUrls: ['./introduction-dashboard.component.scss']
})
export class IntroductionDashboardComponent {

  card$: Observable<IntroId[]>;

  constructor(private tfs: IntroFirebaseService, private router: Router, private editService: EditDataService, public auth: AuthService) {
    this.getData()
  }

  getData(): void {
    // Better subscribe to an observable and call it with async pipe because async unsubscribe itself
    this.card$ = this.tfs.retreiveIntro();
  }

  editCard(card: IntroId) {
    //Update Card
    this.editService.editIntroSource(card);
    this.router.navigate(["/edit/news"]);
  }

  removeCard(card: IntroId) {
    this.tfs.removeIntroEntry(card);
  }

  goToUrl(url: string) {
    window.open(url, "_blank");
  }

  // With this Angular will only track and modify the element that's changed
  trackByFn(index, card) {
    return card.id;
  }

}
