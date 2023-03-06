import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddEditLedgerComponent } from '../add-edit-ledger/add-edit-ledger.component';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit {
  displayedColumns: string[] = ['dis_SL_No', 'cash', 'Sale', 'Expense', 'Deposit', 'offer_name', 'vailid_date', 'offer_condition', 'action' ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  count_ledger:string='0'
  constructor(
    private matdialog:MatDialog
  ){

  }
  ngOnInit(): void {
   
  }
  add_ledger(){
   this.matdialog.open(AddEditLedgerComponent) 
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}