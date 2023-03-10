import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddEditLedgerComponent } from '../add-edit-ledger/add-edit-ledger.component';
import { ManageService } from 'src/app/manage.service';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit {
  displayedColumns: string[] = ['ledger_id', 'ledger_cash_in_hand', 'ledger_today_Recived', 'ledger_expence', 'ledger_deposit_bank', 'ledger_closing_amount', 'ledger_date', 'ledger_description', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  count_ledger: string = '0'
  constructor(
    private matdialog: MatDialog,
    private service: ManageService,
    private confirmServices:NgConfirmService,
    private popup:NgToastService,
    private router:Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  ngOnInit(): void {
    this.service.get_ledger().subscribe(
      (res: any) => {
        console.log(res)
        this.dataSource.data = res.data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.count_ledger = res.data.length
      }
    )
  }
  delete_ledger(row:any){
    this.confirmServices.showConfirm('Are you sure to delate',
      () => {
        const deldata = new FormData();
        deldata.append('ledger_id', row.ledger_id);
        this.service.delete_ledger(deldata).subscribe(
          (res: any) => {
            console.log(res)
            this.popup.success({ detail: 'Success', summary: 'Ledger Deleted', })
            this.router.navigate(['/institutehome/ledger'])
          }
        )
      },
      () => {
        this.popup.error({ detail: 'Fail', summary: 'Ledger Not Deleted', })
      })
  }
add_ledger(){
  this.matdialog.open(AddEditLedgerComponent)
}
edit_ledger(row: any) {
  this.matdialog.open(AddEditLedgerComponent, {
    data: row,
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