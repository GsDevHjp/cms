import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddEditInstituteComponent } from '../add-edit-institute/add-edit-institute.component';

export interface UserData {
  institute_id: number;
  institute_name: string;
  institute_owner: string;
  institute_whatsapp: number;
  institute_email: string;
  institute_address: string;
  institute_logo: string;
  institute_identity: string;
}

const UserData: UserData[] = [
  {institute_id: 1, institute_name: 'Gs Learning',institute_owner:'Rohit Kumar', institute_whatsapp:9153637175, institute_email:'gs@gmail.com',institute_address:'hajipur',institute_identity:'aaddhar',institute_logo:'img.jpg',},
  {institute_id: 1, institute_name: 'Gs Learning',institute_owner:'Rohit Kumar', institute_whatsapp:9153637175, institute_email:'gs@gmail.com',institute_address:'hajipur',institute_identity:'aaddhar',institute_logo:'img.jpg',},
  {institute_id: 1, institute_name: 'Gs Learning',institute_owner:'Rohit Kumar', institute_whatsapp:9153637175, institute_email:'gs@gmail.com',institute_address:'hajipur',institute_identity:'aaddhar',institute_logo:'img.jpg',},
  {institute_id: 1, institute_name: 'Gs Learning',institute_owner:'Rohit Kumar', institute_whatsapp:9153637175, institute_email:'gs@gmail.com',institute_address:'hajipur',institute_identity:'aaddhar',institute_logo:'img.jpg',},
];

@Component({
  selector: 'app-institute',
  templateUrl: './institute.component.html',
  styleUrls: ['./institute.component.css']
})


export class InstituteComponent implements OnInit {
  displayedColumns: string[] = ['institute_id', 'institute_name', 'institute_owner','institute_whatsapp','institute_email','institute_address','institute_identity','institute_logo','action'];
  dataSource!: MatTableDataSource<UserData>;
  
  // displayedColumns: string[] = ['institute_id', 'institute_name', 'institute_mobile', 'institute_address','action'];
  // dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  constructor(
    private dailog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource(UserData);
   }

  ngOnInit(): void {
  }

  add_Institute() {
    this.dailog.open(AddEditInstituteComponent, {
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
