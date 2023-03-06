import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { AddEditStudentComponent } from '../add-edit-student/add-edit-student.component';
import { AddEditPaymentRecivedComponent } from '../add-edit-payment-recived/add-edit-payment-recived.component';
import { Router } from '@angular/router';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-stdbathcby',
  templateUrl: './stdbathcby.component.html',
  styleUrls: ['./stdbathcby.component.css']
})
export class StdbathcbyComponent implements OnInit {
  displayedColumns: string[] = ['std_id', 'std_regist_no', 'std_name', 'std_whatsapp_no', 'std_email', 'std_aadhar', 'std_regist_date', 'std_photo', 'action'];
  dataSource = new MatTableDataSource();
  count_student: number = 0;
  inst_id: any
  rowdata = 0
  login_deatils: any
  login: any
  inst_id_for_inst_login: any
  batch_name:any
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  imgUrl: string = 'https://greensoft.net.in/gscms/assets/';
  color: ThemePalette = 'primary'
  constructor(
    private dailog: MatDialog,
    private service: ManageService,
    private router: Router
  ) {
    const institute_data = this.router.getCurrentNavigation();
    this.inst_id = institute_data?.extras

    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)

  }

  ngOnInit(): void {
      console.log(this.login)

  }
 
  get_std(inst: any, batch_id:any) {
    const instformdata = new FormData()
    instformdata.append('inst_id', inst)
    instformdata.append('batch_id', batch_id)
    this.service.get_std_for_batch_id(instformdata).subscribe(
      (result: any) => {
        console.log(result)
        this.dataSource.data = result.data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.count_student = result.data.length
        return
      }
    )
  }

  fee_pay(row: any) {
    this.dailog.open(AddEditPaymentRecivedComponent, {
      data: row,
      disableClose: true,
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

