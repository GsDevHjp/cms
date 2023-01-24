import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

export interface UserData {
  institute_id: number;
  institute_name: string;
  institute_owner: string;
  institute_whatsapp: number
  institute_email: string
  institute_address: string
  total_student: number
}

const UserData: UserData[] = [
  { institute_id: 1, institute_name: 'Gs Learning', institute_owner: 'Rohit',institute_whatsapp:9153634848,institute_email:'rohit@gmail.com',institute_address:'Hajipur,Bihar',total_student: 20 },
  { institute_id: 1, institute_name: 'Gs Learning', institute_owner: 'Rohit',institute_whatsapp:9153634848,institute_email:'rohit@gmail.com',institute_address:'Hajipur,Bihar',total_student: 50 },
];
@Component({
  selector: 'app-insstudent',
  templateUrl: './insstudent.component.html',
  styleUrls: ['./insstudent.component.css']
})
export class InsstudentComponent implements OnInit {

  displayedColumns: string[] = ['institute_id', 'institute_name', 'institute_owner', 'institute_whatsapp','institute_email','institute_address','total_student',];
  dataSource!: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dailog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource(UserData);
  }

  ngOnInit(): void {
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
}
