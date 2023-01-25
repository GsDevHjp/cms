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
  institute_state: string
  institute_district: string
  total_admission:number
}

const UserData: UserData[] = [
  { institute_id: 1, institute_name: 'Gs Learning', institute_owner: 'Rohit', institute_whatsapp: 9153634848, institute_email: 'rohit@gmail.com',institute_state:'Bihar',institute_district:'Vaishali', total_admission: 20 },
  { institute_id: 1, institute_name: 'Gs Learning', institute_owner: 'Rohit', institute_whatsapp: 9153634848, institute_email: 'rohit@gmail.com',institute_state:'Bihar',institute_district:'Vaishali', total_admission: 80 },
  { institute_id: 1, institute_name: 'Gs Learning', institute_owner: 'Rohit', institute_whatsapp: 9153634848, institute_email: 'rohit@gmail.com',institute_state:'Bihar',institute_district:'Vaishali', total_admission: 250 },
];
@Component({
  selector: 'app-insadmission',
  templateUrl: './insadmission.component.html',
  styleUrls: ['./insadmission.component.css']
})
export class InsadmissionComponent implements OnInit {

  displayedColumns: string[] = ['institute_id', 'institute_name', 'institute_owner', 'institute_whatsapp', 'institute_email', 'institute_state','institute_district','total_admission'];
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

