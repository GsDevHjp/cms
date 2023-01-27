import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddEditCourseComponent } from '../add-edit-course/add-edit-course.component';

export interface Userdata {
  course_id: number;
  course_fee: number;
  course_name: string;
  course_duration: number;
  course_half_fee: number;
  course_monthly: number
  course_date: string;
  course_total_fee: number;
}

const Userdata: Userdata[] = [
  { course_id: 1, course_fee: 9865, course_name: 'MCA', course_duration: 6, course_half_fee: 750, course_monthly: 6, course_date: '20-02-2023', course_total_fee: 5586 },
  { course_id: 1, course_fee: 2569, course_name: 'BCA', course_duration: 9, course_half_fee: 750, course_monthly: 6, course_date: '20-02-2023', course_total_fee: 5786 },
  { course_id: 1, course_fee: 2895, course_name: 'MCA', course_duration: 6, course_half_fee: 750, course_monthly: 6, course_date: '20-02-2023', course_total_fee: 5986 },
  { course_id: 1, course_fee: 2785, course_name: 'MCA', course_duration: 6, course_half_fee: 750, course_monthly: 6, course_date: '20-02-2023', course_total_fee: 2556 },
];
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  displayedColumns: string[] = ['course_id', 'course_name', 'course_half_fee', 'course_fee', 'course_monthly', 'course_duration', 'course_date', 'course_total_fee', 'action'];
  dataSource = new MatTableDataSource(Userdata);
  count_course: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;

  constructor(
    private dailog: MatDialog,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void { }

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

