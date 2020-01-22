import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { PostTableDataSource } from './posts-table-datasource';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PostId } from '../../model/post';
import { FirebaseService } from '../../firebase.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { EditDataService } from '../edit-data.service';
import { AuthService } from '../../core/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'routing-elements/posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PostsTableComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,  {static: true}) sort: MatSort;
  dataSource: PostTableDataSource;
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
    this.dataSource = new PostTableDataSource(this.paginator, this.sort, []);
    
    this.getPosts();
  }

  getPosts() : void {
    this.tfs.retreivePost().subscribe(
      (posts: PostId[]) =>  {
        this.dataSource = new PostTableDataSource(this.paginator, this.sort, posts);
      }
    )
  }

  editRow(row: PostId) {
    this.editService.editPostSource(row);
    this.router.navigate(["/edit/posts"]);
  }

  deleteRow(row: PostId) {
    this.tfs.removePostEntry(row);
  }

  goToUrl(url:string) {
    window.open(url, "_blank");
  } 
}
