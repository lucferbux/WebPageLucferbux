import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Team, TeamId } from '../../model/team';
import { FirebaseService } from '../../firebase.service';
import { Router } from '@angular/router';
import { EditDataService } from '../edit-data.service';
import { AuthService } from '../../core/auth.service';


@Component({
  selector: 'team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.css']
})
export class TeamDashboardComponent {
  members: TeamId[];
  rowHeight: String = "400px";
  isLarge: Boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, private tfs: FirebaseService, private editService: EditDataService, private router: Router, public auth: AuthService ) {
    this.getTeam();
    this.breakpointObserver.observe([Breakpoints.XSmall]).subscribe(result => { if(result.matches){ this.updateInterface("400px", false) } })
    this.breakpointObserver.observe([Breakpoints.Small]).subscribe(result => {   if(result.matches){ this.updateInterface("400px", false) }  })
    this.breakpointObserver.observe([Breakpoints.Medium]).subscribe(result => { if(result.matches){ this.updateInterface("400px", true) } })
    this.breakpointObserver.observe([Breakpoints.Large]).subscribe(result => { if(result.matches){ this.updateInterface("400px", true) } })
  }
  
  getTeam() : void {
    this.tfs.retreiveTeam().subscribe(
      (data : TeamId[]) => this.members = data
    )
  }

  updateInterface(height: String, size: Boolean){
    this.rowHeight = height;
    this.isLarge = size;
  }

  editTeam(member: TeamId) {
    //Update member
    this.editService.editTeamSource(member);
    this.router.navigate(["/edit/team"]);
  }

  removeMember(member: TeamId) {
    this.tfs.removeTeamEntry(member);
  }

}

