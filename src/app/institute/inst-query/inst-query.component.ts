import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddEditInstQuizComponent } from '../add-edit-inst-quiz/add-edit-inst-quiz.component';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-inst-query',
  templateUrl: './inst-query.component.html',
  styleUrls: ['./inst-query.component.css']
})
export class InstQueryComponent implements OnInit {

  displayedColumns: string[] = ['quiz_id', 'quiz_question', 'quiz_option_a', 'quiz_option_b', 'quiz_option_c', 'quiz_option_d', 'action'];
  dataSource = new MatTableDataSource();
  count_query: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;
  imgUrl:string = 'http://localhost/cms/src/assets/';
  inst_id_for_admin: any;
  login_deatils: any;
  login: any;
  inst_id_for_inst_login: any;
  inst_id: any;

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
    this.inst_id = this.login.inst_id
    console.log("inst" + this.login.inst_id)
  }

  ngOnInit(): void {
    const fromdata = new FormData()
    fromdata.append('inst_id', this.login.inst_id)
    this.service.get_quiz_by_inst_id(fromdata).subscribe(
      (res: any) => {
        console.log(res)
        this.dataSource.data = res.data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.count_query = res.data.length
      }
    )
  }
  add_course() {
    this.dailog.open(AddEditInstQuizComponent, {
      disableClose: true
    });
  }

  course_edit(row: any) {
    this.dailog.open(AddEditInstQuizComponent, {
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

