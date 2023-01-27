import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddEditStudentComponent } from '../add-edit-student/add-edit-student.component';
import { ManageService } from 'src/app/manage.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  displayedColumns: string[] = ['std_id', 'std_name','student_id', 'mobile', 'std_aadhar_no', 'std_email', 'enq_date', 'std_photo', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  imgUrl:string = 'http://localhost/cms/src/assets/';

  constructor(
    private dailog: MatDialog,
    private servies:ManageService
  ) { }

  ngOnInit(): void {

   }



  add_student_details(): any {
    this.dailog.open(AddEditStudentComponent, {
      disableClose: true
    });
  }
  edit_student(row: any) {
    this.dailog.open(AddEditStudentComponent, {
      data: row,
    });
  }

  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
}

