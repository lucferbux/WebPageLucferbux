import { Component } from '@angular/core';
import { TeamId } from '../../model/team';
import { FirebaseService } from '../../firebase.service';
import { Router } from '@angular/router';
import { EditDataService } from '../edit-data.service';
import { AuthService } from '../../core/auth.service';


@Component({
  selector: 'team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.scss']
})
export class TeamDashboardComponent {
  members: TeamId[];


  constructor(private tfs: FirebaseService, private editService: EditDataService, private router: Router, public auth: AuthService ) {
    this.getTeam();
  }
  
  getTeam() : void {
    this.tfs.retreiveTeam().subscribe(
      (data : TeamId[]) => this.members = data
    )
  }
  editTeam(member: TeamId) {
    this.editService.editTeamSource(member);
    this.router.navigate(["/edit/team"]);
  }

  removeMember(member: TeamId) {
    this.tfs.removeTeamEntry(member);
  }

}

