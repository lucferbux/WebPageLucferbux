import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ProjectsTableDataSource } from './projects-table-datasource';
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
  styleUrls: ['./projects-table.component.css']
})
export class ProjectsTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ProjectsTableDataSource;
  logged: Observable<Boolean>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'description', 'link'];

  constructor(private tfs: FirebaseService, private editService: EditDataService, private router: Router, public auth: AuthService){
    this.logged =  this.auth.user.pipe(
      map(user => !! user)      
    );
    this.logged.subscribe(
      (active: Boolean) => {
          if(active) {
            this.displayedColumns = ['title', 'description', 'link', 'more'];
          }
      }
    );

  }
  ngOnInit() {
    this.dataSource = new ProjectsTableDataSource(this.paginator, this.sort, []);
    this.getProjects();
  }

  getProjects() {
    this.tfs.retreiveProject().subscribe(
      (projects : ProjectId[]) => {
        this.dataSource = new ProjectsTableDataSource(this.paginator, this.sort, projects);
      } 
    )
  }

  editRow(row: ProjectId) {
      this.editService.editProjectSource(row);
      this.router.navigate(["/edit/projects"]);
  }

  deleteRow(row: ProjectId) {
      this.tfs.removeProjectEntry(row);
  }

  goToUrl(url:string) {
    window.location.href=url;
  } 
}
