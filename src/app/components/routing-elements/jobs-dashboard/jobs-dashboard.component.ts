import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EditDataService } from '../../../core/edit-data/edit-data.service';
import { AuthService } from '../../../core/auth/auth.service';
import { JobsFirebaseService, JobId } from 'src/app/core/firebase/jobs.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'job-dashboard',
  templateUrl: './jobs-dashboard.component.html',
  styleUrls: ['./jobs-dashboard.component.scss']
})
export class JobsDashboardComponent {
  member$: Observable<JobId[]>


  constructor(private tfs: JobsFirebaseService, private editService: EditDataService, private router: Router, public auth: AuthService ) {
    this.getJobs();
  }
  
  getJobs() : void {
    this.member$ = this.tfs.retreiveJob();
  }
  editJob(member: JobId) {
    this.editService.editJobSource(member);
    this.router.navigate(["/edit/aboutme"]);
  }

  removeMember(member: JobId) {
    this.tfs.removeJobEntry(member);
  }

  // With this Angular will only track and modify the element that's changed
  trackByFn(index, item) {
    return item.id;
  }

}

