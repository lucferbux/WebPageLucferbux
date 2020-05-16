import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { EditDataService } from '../../../core/edit-data/edit-data.service';
import { PostId, PostFirebaseService } from 'src/app/core/firebase/post.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent {

  card$: Observable<PostId[]>;

  constructor(private tfs: PostFirebaseService, private router: Router, private editService: EditDataService, public auth: AuthService) {
    this.getData()
  }

  getData(): void {
    // Better subscribe to an observable and call it with async pipe because async unsubscribe itself
    this.card$ = this.tfs.retreivePost();
  }

  editCard(card: PostId) {
    //Update Card
    this.editService.editPostSource(card);
    this.router.navigate(["/edit/posts"]);
  }

  removeCard(card: PostId) {
    this.tfs.removePostEntry(card);
  }

  goToUrl(url: string) {
    window.open(url, "_blank");
  }

  // With this Angular will only track and modify the element that's changed
  trackByFn(index, card) {
    return card.id;
  }

}
