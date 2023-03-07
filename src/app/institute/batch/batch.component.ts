import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddEditBatchComponent } from '../add-edit-batch/add-edit-batch.component';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {
  displayedColumns: string[] = ['batch_id', 'course_id_fk', 'batch_name', 'batch_arrival', 'batch_departure', 'batch_date', 'batch_description', 'batch_total_std', 'batch_status', 'action'];
  dataSource = new MatTableDataSource();
  count_batch: number = 0;
  inst_id: any
  action_btn: boolean = false
  Ttalstd: number = 0
  total_batch:any
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;
  login_deatils: any
  login: any
  inst_id_for_inst_login: any
  inst_id_for_admin: any;
  inst_id_for_std: any;
  constructor(
    private dailog: MatDialog,
    private router: Router,
    private service: ManageService,
    private popup: NgToastService,
    private confirmServices: NgConfirmService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    const institute_data = this.router.getCurrentNavigation();
    this.inst_id_for_admin = institute_data?.extras
    console.log("admin" + this.inst_id_for_admin)
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)

    this.inst_id_for_std = this.login.institute_id_fk

    this.inst_id_for_inst_login = this.login.inst_id
    console.log("std" + this.inst_id_for_std)
    console.log("inst" + this.inst_id_for_inst_login)

  }

  ngOnInit(): void {
    
    if (this.inst_id_for_admin) {
      this.get_batch_by_inst_id(this.inst_id_for_admin);
    }
    if (this.inst_id_for_inst_login) {
      this.action_btn = false
      this.get_batch_by_inst_id(this.inst_id_for_inst_login)

     

    }
    if (this.inst_id_for_std) {
      this.get_batch_by_inst_id(this.inst_id_for_std)
      this.action_btn = true
      this.displayedColumns = ['batch_id', 'course_id_fk', 'batch_name', 'batch_arrival', 'batch_departure', 'batch_date', 'batch_description', 'batch_status'];

      const instformdata = new FormData()
      instformdata.append('inst_id', this.inst_id)
      this.service.get_batch_by_inst_id(instformdata).subscribe(
        (result: any) => {
          console.log(result)
          this.dataSource.data = result.data
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.count_batch = result.data.length
          this.router.navigate(['/institutehome/batch']);
          return
        }
      )
    }
  }

  get_batch_by_inst_id(inst_for_all: any) {
    const instformdata = new FormData()
    instformdata.append('inst_id', inst_for_all)
    this.service.get_batch_by_inst_id(instformdata).subscribe(
      (result: any) => {
        console.log(result)
        this.dataSource.data = result.data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.count_batch = result.data.length
      }
    )
  }

  add_batch(): any {
    this.dailog.open(AddEditBatchComponent, {
      disableClose: true
    });
  }

  batch_edit(row: any) {
    this.dailog.open(AddEditBatchComponent, {
      data: row,
    });
  }
  batch_delete(row: any) {
    this.confirmServices.showConfirm('Are you sure to delate',
      () => {
        const deletedata = new FormData();
        deletedata.append('batch_id', row.batch_id);
        this.service.batch_delete(deletedata).subscribe(
          (res: any) => {
            console.log(res)
            this.popup.success({ detail: 'Success', summary: 'Batch Deleted', })
            this.router.navigate(['/institutehome/batch']);
          }
        )
      },
      () => {
        this.popup.error({ detail: 'Unsuccess', summary: 'Batch Not Deleted', })
      })
  }

  onstdview(row:any){
    console.log(row.batch_id)
    
    this.router.navigate(['institutehome/batch/studentbatch'],row)  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

