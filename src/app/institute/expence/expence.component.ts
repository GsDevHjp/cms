import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ManageService } from 'src/app/manage.service';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';
import { AddEditExpenceComponent } from '../add-edit-expence/add-edit-expence.component';

@Component({
  selector: 'app-expence',
  templateUrl: './expence.component.html',
  styleUrls: ['./expence.component.css']
})
export class ExpenceComponent implements OnInit {

  displayedColumns: string[] = ['slno', 'expense_type', 'expense_amount', 'expense_pay_to', 'expense_mobile', 'expense_date', 'expense_desc', 'action'];
  dataSource = new MatTableDataSource();
  expence_count: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  login_deatils: any
  login: any
  inst_id: any
  inst_id_for_inst_login: any;

  constructor(
    private dailog: MatDialog,
    private service: ManageService,
    private router: Router,
    private popup: NgToastService,
    private confirmServices: NgConfirmService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.institute_id_fk
    this.inst_id_for_inst_login = this.login.inst_id
  }

  ngOnInit(): void {
    this.service.get_expence().subscribe(
      (res: any) => {
        this.dataSource.data = res.data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.expence_count = res.data.length
      }
    )
  }

  add_expense() {
    this.dailog.open(AddEditExpenceComponent, {
      disableClose: true
    });
  }
  edit_expense(row: any) {
    this.dailog.open(AddEditExpenceComponent, {
      data: row,
    });
  }
  expence_delete(row: any) {
    this.confirmServices.showConfirm('Are you sure to delate',
      () => {
        const deldata = new FormData();
        deldata.append('expense_id', row.expense_id);
        this.service.expence_delete(deldata).subscribe(
          (res: any) => {
            console.log(res)
            this.popup.success({ detail: 'Success', summary: 'Expence Deleted', })
            this.router.navigate(['/institutehome/expence'])
          }
        )
      },
      () => {
        this.popup.error({ detail: 'Unsuccess', summary: 'Expence Not Deleted', })
      })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

