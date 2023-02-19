import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddEditCourseComponent } from '../add-edit-course/add-edit-course.component';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  displayedColumns: string[] = ['course_id', 'course_name', 'course_duration', 'course_total_fee', 'course_half_fee', 'course_quarter_fee', 'course_monthly_fee', 'course_admission_fee', 'course_description', 'course_date', 'action'];
  dataSource = new MatTableDataSource();
  count_course: number = 0;
  inst_id_for_admin: any
  inst_id_for_inst_login: any
  inst_id_for_std: any
  inst_id:any;
  std_id: any
  action_btn: boolean = false
  Course: string = "Course Details"
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;
  month: string = 'month'
  login_deatils: any
  login: any
  constructor(
    private dailog: MatDialog,
    private router: Router,
    private service: ManageService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    const institute_data = this.router.getCurrentNavigation();
    this.inst_id_for_admin = institute_data?.extras
    console.log("admin" + this.inst_id_for_admin)
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)

    this.inst_id_for_std = this.login.institute_id_fk

    // this.inst_id = this.login.institute_id_fk
    this.inst_id_for_inst_login = this.login.inst_id
    console.log("std" + this.inst_id_for_std)
    console.log("inst" + this.inst_id_for_inst_login)

  }

  ngOnInit(): void {
    if (this.inst_id_for_admin) {
      // this.action_btn = true
      // this.displayedColumns = ['course_id', 'course_name', 'course_duration', 'course_total_fee', 'course_half_fee', 'course_quarter_fee', 'course_monthly_fee', 'course_admission_fee', 'course_description', 'course_date'];
      this.get_course_by_inst_id(this.inst_id_for_admin);
    }
    if (this.inst_id_for_inst_login) {
      this.get_course_by_inst_id(this.inst_id_for_inst_login)
    }
    if (this.inst_id_for_std) {
      this.get_course_by_inst_id(this.inst_id_for_std)
      this.action_btn = true
      this.displayedColumns = ['course_id', 'course_name', 'course_duration', 'course_total_fee', 'course_half_fee', 'course_quarter_fee', 'course_monthly_fee', 'course_admission_fee', 'course_description', 'course_date'];
      const instformdata = new FormData()
      instformdata.append('inst_id', this.inst_id)
      this.service.get_course_by_inst_id(instformdata).subscribe(
        (result: any) => {
          console.log(result)
          this.dataSource.data = result.data
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.count_course = result.data.length
          this.router.navigate(['/institutehome/course']);
          return
        }
      )
    }
  }

  get_course_by_inst_id(inst_for_all: any) {
    const instformdata = new FormData()
    instformdata.append('inst_id', inst_for_all)
    this.service.get_course_by_inst_id(instformdata).subscribe(
      (result: any) => {
        console.log(result)
        this.dataSource.data = result.data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.count_course = result.data.length
      }
    )
  }
  add_course() {
    this.dailog.open(AddEditCourseComponent, {
      disableClose: true
    });
  }
  course_edit(row: any) {
    this.dailog.open(AddEditCourseComponent, {
      data: row,
    });
  }
  course_delete(row: any) {
    if (confirm("Are you sure to delate")) {
      const deldata = new FormData();
      deldata.append('course_id', row.course_id);
      this.service.course_delete(deldata).subscribe(
        (res: any) => {
          console.log(res)
          alert('data delate sucessfully')
        }
      )
    }
    else {
      alert('cancle')
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