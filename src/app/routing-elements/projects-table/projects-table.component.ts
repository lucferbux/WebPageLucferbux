import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectId } from '../../model/project';
import { FirebaseService } from '../../firebase.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { EditDataService } from '../edit-data.service';
import { AuthService } from '../../core/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'routing-elements/projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.scss']
})
export class ProjectsTableComponent implements OnInit {
  projects: ProjectId[];
  logged: Observable<Boolean>;

  constructor(private tfs: FirebaseService, private editService: EditDataService, private router: Router, public auth: AuthService){
    this.logged =  this.auth.user.pipe(
      map(user => !! user)      
    );
    this.logged.subscribe(
      (active: Boolean) => {
          if(active) {
            // Do stuff
          }
      }
    );

  }
  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.tfs.retreiveProject().subscribe(
      (projects : ProjectId[]) => {
        this.projects = projects
      } 
    )
  }

  editCard(card: ProjectId) {
      this.editService.editProjectSource(card);
      this.router.navigate(["/edit/projects"]);
  }

  deleteCard(card: ProjectId) {
      this.tfs.removeProjectEntry(card);
  }

  goToUrl(url:string) {
    window.open(url, "_blank");
  } 
}
