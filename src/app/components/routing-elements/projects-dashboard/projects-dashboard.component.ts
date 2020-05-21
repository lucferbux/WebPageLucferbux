import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { EditDataService } from '../../../core/edit-data/edit-data.service';
import { AuthService } from '../../../core/auth/auth.service';
import { Observable } from 'rxjs';
import { ProjectFirebaseService, ProjectId } from 'src/app/core/firebase/project.service';


@Component({
  selector: 'routing-elements/projects-dashboard',
  templateUrl: './projects-dashboard.component.html',
  styleUrls: ['./projects-dashboard.component.scss']
})
export class ProjectDashboardComponent {
  project$: Observable<ProjectId[]>

  constructor(private tfs: ProjectFirebaseService, private editService: EditDataService, private router: Router, public auth: AuthService) {
    this.getData()
  }

  getData(): void {
    // Better subscribe to an observable and call it with async pipe because async unsubscribe itself
    this.project$ = this.tfs.retreiveProject();
  }

  editCard(card: ProjectId) {
    this.editService.editProjectSource(card);
    this.router.navigate(["/edit/projects"]);
  }

  deleteCard(card: ProjectId) {
    this.tfs.removeProjectEntry(card);
  }

  goToUrl(url: string) {
    if (url != null) {
      window.open(url, "_blank");
    }
  }

  // With this Angular will only track and modify the element that's changed
  trackByFn(index, item) {
    return item.id;
  }

}
