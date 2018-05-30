import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DisseminationTableDataSource } from './dissemination-table-datasource';

@Component({
  selector: 'routing-elements/dissemination-table',
  templateUrl: './dissemination-table.component.html',
  styleUrls: ['./dissemination-table.component.css']
})
export class DisseminationTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: DisseminationTableDataSource;
  @Input() year:string;
  @Input() exampleData;
  

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'description', 'link'];

  ngOnInit() {
    this.dataSource = new DisseminationTableDataSource(this.paginator, this.sort, this.exampleData);
  }
}
