import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

export interface UserData {
  institute_id: number;
  institute_name: string;
  institute_owner: string;
  institute_whatsapp: number;
  institute_email: string;
  institute_date: string; 
  institute_address: string;
  institute_payment: number;
  institute_description: string;
}

const UserData: UserData[] = [
  { institute_id: 1, institute_name: 'Gs Learning', institute_owner: 'Rohit Kumar', institute_whatsapp: 9153637175, institute_email: 'gs@gmail.com',institute_date:'25/02/2023', institute_address: 'hajipur',institute_payment:20000,institute_description:'payment successfully' },
];

@Component({
  selector: 'app-admin-paymet-recived',
  templateUrl: './admin-paymet-recived.component.html',
  styleUrls: ['./admin-paymet-recived.component.css']
})
export class AdminPaymetRecivedComponent implements OnInit {
  displayedColumns: string[] = ['institute_id', 'institute_name', 'institute_owner', 'institute_whatsapp', 'institute_email','institute_date', 'institute_address','institute_payment','institute_description'];
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