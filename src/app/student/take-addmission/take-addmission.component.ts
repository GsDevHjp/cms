import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddEditTakeAddmissionComponent } from '../add-edit-take-addmission/add-edit-take-addmission.component';

import { ThemePalette } from '@angular/material/core';
import { ManageService } from 'src/app/manage.service';



@Component({
  selector: 'app-take-addmission',
  templateUrl: './take-addmission.component.html',
  styleUrls: ['./take-addmission.component.css']
})
export class TakeAddmissionComponent implements OnInit {
  displayedColumns: string[] = ['admission_id', 'regist_no', 'roll_no', 'std_name',  'course_name', 'batch_name', 'std_whatsapp_no', 'admission_date', 'batch_status'];
  dataSource = new MatTableDataSource();
  count_admission: number = 0;
  color: ThemePalette = 'primary'
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;
  paginatorRef: any;
  login_deatils: any
  login: any
  inst_id: any
  std_id_for_std_login: any
  constructor(
    private dailog: MatDialog,
    private router: Router,
    private service: ManageService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.std_id_for_std_login = this.login.std_id
    console.log("std" + this.std_id_for_std_login)
  }

  ngOnInit(): void {
    const formdata = new FormData()
    formdata.append('std_id', this.std_id_for_std_login)
    this.service.get_admission_id_by_std_id(formdata).subscribe(
      (res: any) => {
        console.log(res)
        this.dataSource.data = res.data
        this.dataSource.sort = this.sort;
        this.count_admission = res.data.length
      }
    )
   
  }
  take_addmission() {
    this.dailog.open(AddEditTakeAddmissionComponent, {
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