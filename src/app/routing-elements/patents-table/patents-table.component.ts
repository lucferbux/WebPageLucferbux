import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { PatentsTableDataSource } from './patents-table-datasource';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PatentId } from '../../model/patent';
import { FirebaseService } from '../../firebase.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { EditDataService } from '../edit-data.service';
import { AuthService } from '../../core/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'routing-elements/patents-table',
  templateUrl: './patents-table.component.html',
  styleUrls: ['./patents-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PatentsTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: PatentsTableDataSource;
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
    this.dataSource = new PatentsTableDataSource(this.paginator, this.sort, []);
    this.getPatents();
  }

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;

  getPatents() : void {
    this.tfs.retreivePatent().subscribe(
      (patents: PatentId[]) => this.dataSource = new PatentsTableDataSource(this.paginator, this.sort, patents)
    )
  }

  editRow(row: PatentId) {
    this.editService.editPatentSource(row);
    this.router.navigate(["/edit/patents"]);
  }

  deleteRow(row: PatentId) {
    this.tfs.removePatentEntry(row);
  }

  goToUrl(url:string) {
    window.location.href=url;
  } 
}
