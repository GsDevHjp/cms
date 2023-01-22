import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddEditInstituteComponent } from '../add-edit-institute/add-edit-institute.component';

export interface UserData {
  institute_id: number;
  institute_name: string;
  institute_mobile: number;
  institute_address: string;
}

const UserData: UserData[] = [
  {institute_id: 1, institute_name: 'Gs Learning', institute_mobile: 9153637175, institute_address: 'Hajipur'},
  {institute_id: 2, institute_name: 'Rn Learning', institute_mobile: 9153537178, institute_address: 'Hajipur'},
];

@Component({
  selector: 'app-institute',
  templateUrl: './institute.component.html',
  styleUrls: ['./institute.component.css']
})


export class InstituteComponent implements OnInit {
  displayedColumns: string[] = ['institute_id', 'institute_name', 'institute_mobile', 'institute_address','action'];
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
