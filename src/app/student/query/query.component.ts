import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLinkWithHref } from '@angular/router';
import { StdQueryComponent } from '../std-query/std-query.component';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {

  displayedColumns: string[] = ['query_id', 'std_query', 'std_query_ans', 'std_query_date', 'action'];
  dataSource = new MatTableDataSource();
  query_count: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;
  constructor(
    private popup:NgToastService,
    private dailog: MatDialog,
    private router: Router,
    private manageservice: ManageService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    this.manageservice.query_view().subscribe(
      (instdata: any) => {
        console.log(instdata)
        this.dataSource = new MatTableDataSource(instdata.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.query_count = instdata.data.length
      }
    )
  }
  add_course() {
    this.dailog.open(StdQueryComponent, {
      disableClose: true
    });
  }

  editmsg(row: any) {
    this.dailog.open(StdQueryComponent, {
      data: row
    })
  }

  deleteQuery(row: any) {
    if (confirm("Are You Sure To Delete")) {
      const deletedata = new FormData();
      deletedata.append('query_id', row.query_id);
      console.log(row.query_id)
      this.manageservice.delete_query(deletedata).subscribe(
        (res: any) => {
          this.popup.success({ detail: 'Success', summary: 'Query Delete Successfully..'})
          this.router.navigate(['/studenthome/query'])
        }
      )
    }
    else {
      this.popup.error({ detail: 'Unsuccess', summary: 'Query Not Delete..'})
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
