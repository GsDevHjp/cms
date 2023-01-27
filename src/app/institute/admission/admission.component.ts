import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

export interface Userdata {
  id: number;
  std_id: string;
  std_name: string;
  std_mobile: number;
  course: string;
  batch: string;
  date: string;
  status: string;
  std_roll:number;
}

const Userdata: Userdata[] = [
  {id: 1, std_id:'GS2301202301' , std_name: 'Amarjeet', std_mobile: 9856232154, course:'MCA',batch:'Python',date:'20-02-2023',status:'Success', std_roll:130},
  {id: 1, std_id:'GS2301202302' , std_name: 'Sonu Kumar', std_mobile: 9856232154, course:'12th',batch:' HTML',date:'08-09-2022',status:'Pending', std_roll:130},
  {id: 1, std_id:'GS2301202303' , std_name: 'Akhilesh', std_mobile: 9856232154, course:'MCA',batch:'Python',date:'20-02-2023',status:'Success', std_roll:130},
 
];
@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})

export class AdmissionComponent implements OnInit {
  displayedColumns: string[] = ['id', 'std_id', 'std_name','std_roll', 'std_mobile','course','batch','date','status', 'action'];
  dataSource = new MatTableDataSource(Userdata);
  count_admission:number=0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;
  paginatorRef: any;

  constructor(
    private dailog: MatDialog,
  ) {  }

  ngOnInit(): void {  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


