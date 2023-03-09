import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ManageService } from 'src/app/manage.service';
import { AddEditQueryComponent } from '../add-edit-query/add-edit-query.component';

@Component({
  selector: 'app-inst-query',
  templateUrl: './inst-query.component.html',
  styleUrls: ['./inst-query.component.css']
})

export class InstQueryComponent implements OnInit {

  displayedColumns: string[] = ['quiz_id', 'query_priority', 'query_message', 'query_answer', 'query_date', 'action'];
  dataSource = new MatTableDataSource();
  count_query: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  login_deatils: any
  login: any
  inst_id: any
  inst_id_for_inst_login: any;

  constructor(
    private dailog: MatDialog,
    private router: Router,
    private service: ManageService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.institute_id_fk
    this.inst_id_for_inst_login = this.login.inst_id
  }

  ngOnInit(): void {
    // const fromdata = new FormData()
    // fromdata.append('inst_id', this.inst_id_for_inst_login)
    this.service.get_query_by_inst_id().subscribe(
      (res: any) => {
        console.log("hdbk" + res)
        this.dataSource.data = res.data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.count_query = res.data.length
      }
    )
  }
  add_quiz() {
    this.dailog.open(AddEditQueryComponent, {
      disableClose: true
    });
  }

  course_edit(row: any) {
    this.dailog.open(AddEditQueryComponent, {
      data: row,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

