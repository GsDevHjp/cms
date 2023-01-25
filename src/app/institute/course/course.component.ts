import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddEditCourseComponent } from '../add-edit-course/add-edit-course.component';

export interface Userdata {
  course_id: number;
  admission_fee: number;
  course_name: string;
  course_duration: number;
  half_fee: number;
  course_monthly: number
  course_date: string;
  total_fee: number;
}

const Userdata: Userdata[] = [
  { course_id: 1, admission_fee: 9865, course_name: 'MCA', course_duration: 6, half_fee: 750, course_monthly: 6, course_date: '20-02-2023', total_fee: 56 },
  { course_id: 1, admission_fee: 2569, course_name: 'BCA', course_duration: 9, half_fee: 750, course_monthly: 6, course_date: '20-02-2023', total_fee: 56 },
  { course_id: 1, admission_fee: 2895, course_name: 'MCA', course_duration: 6, half_fee: 750, course_monthly: 6, course_date: '20-02-2023', total_fee: 56 },
  { course_id: 1, admission_fee: 2785, course_name: 'MCA', course_duration: 6, half_fee: 750, course_monthly: 6, course_date: '20-02-2023', total_fee: 56 },
];
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  displayedColumns: string[] = ['course_id', 'course_name', 'admission_fee', 'course_duration', 'half_fee', 'course_monthly', 'total_fee', 'course_date', 'action'];
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

