import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ReceivedformComponent } from '../receivedform/receivedform.component';

export interface UserData {
  institute_id: number;
  institute_name: string;
  institute_owner: string;
  institute_whatsapp: number;
  institute_email: string;
  institute_address: string;
  institute_dues: number;
}

const UserData: UserData[] = [
  { institute_id: 1, institute_name: 'Gs Learning', institute_owner: 'Rohit Kumar', institute_whatsapp: 9153637175, institute_email: 'gs@gmail.com', institute_address: 'Hajipur Bihar', institute_dues: 200 },
  { institute_id: 1, institute_name: 'Gs Learning', institute_owner: 'Rohit Kumar', institute_whatsapp: 9153637175, institute_email: 'gs@gmail.com', institute_address: 'Hajipur Bihar', institute_dues: 200 },
]
@Component({
  selector: 'app-admin-dues',
  templateUrl: './admin-dues.component.html',
  styleUrls: ['./admin-dues.component.css']
})
export class AdminDuesComponent implements OnInit {
  displayedColumns: string[] = ['institute_id', 'institute_name', 'institute_owner', 'institute_whatsapp', 'institute_email','institute_address','institute_dues','action'];
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
  add_payment() {
    this.dailog.open(ReceivedformComponent, {
      disableClose: true
    });
  }
}