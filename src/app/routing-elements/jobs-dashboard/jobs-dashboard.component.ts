import { Component } from '@angular/core';
import { JobId } from '../../model/jobs';
import { FirebaseService } from '../../firebase.service';
import { Router } from '@angular/router';
import { EditDataService } from '../edit-data.service';
import { AuthService } from '../../core/auth.service';


@Component({
  selector: 'job-dashboard',
  templateUrl: './jobs-dashboard.component.html',
  styleUrls: ['./jobs-dashboard.component.scss']
})
export class JobsDashboardComponent {
  members: JobId[];


  constructor(private tfs: FirebaseService, private editService: EditDataService, private router: Router, public auth: AuthService ) {
    this.getJobs();
  }
  
  getJobs() : void {
    this.tfs.retreiveJob().subscribe(
      (data : JobId[]) => this.members = data
    )
  }
  editJob(member: JobId) {
    this.editService.editJobSource(member);
    this.router.navigate(["/edit/aboutme"]);
  }

  removeMember(member: JobId) {
    this.tfs.removeJobEntry(member);
  }

}

