import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddEditStudentComponent } from '../add-edit-student/add-edit-student.component';

export interface Userdata {
  id: number;
  std_email:string;
  std_name: string;
  mobile: number;
  std_state: string;
  std_district: string;
  enq_date: string;
  std_aadhar_no: number;
}

const Userdata: Userdata[] = [
  {id: 1, std_email:'abc@gmail.com', std_name: 'Amarjeet Kumar', mobile: 9856232154, std_state:'Bihar',std_district:'Vaishali',enq_date:'20-02-2023',std_aadhar_no:986532125478},
  {id: 1, std_email: 'abc@gmail.com', std_name: 'Amarjeet Kumar', mobile: 9856232154, std_state:'Bihar',std_district:'Vaishali',enq_date:'20-02-2023',std_aadhar_no:986532125478},
];
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  displayedColumns: string[] = ['id', 'std_name', 'mobile', 'std_aadhar_no', 'std_email', 'enq_date', 'std_photo', 'action'];
  dataSource = new MatTableDataSource(Userdata);
  count_student:number=0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;
  paginatorRef: any;
  imgUrl:string = 'http://localhost/cms/src/assets/';

  constructor(
    private dailog: MatDialog,
  ) { }

  ngOnInit(): void { }

  add_student_details(): any {
    this.dailog.open(AddEditStudentComponent, {
      disableClose: true
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

