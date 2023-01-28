import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AddEditCourseComponent } from '../add-edit-course/add-edit-course.component';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  displayedColumns: string[] = ['course_id', 'course_name', 'course_half_fee', 'course_fee', 'course_monthly', 'course_duration', 'course_date', 'course_total_fee', 'action'];
  dataSource = new MatTableDataSource();
  count_course: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;

  constructor(
    private dailog: MatDialog,
    private router: Router,
    private service:ManageService
  ) {  }

  ngOnInit(): void { 
    this.service.get_course().subscribe(
      (res: any) => {
        console.log(res)
        this.dataSource.data = res.data
        this.dataSource.sort = this.sort;
        this.count_course = res.data.length
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

