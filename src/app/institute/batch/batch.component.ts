import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AddEditBatchComponent } from '../add-edit-batch/add-edit-batch.component';
export interface Userdata {
  id: number;
  batch_name: string;
  mobile: number;
  batch_select: string;
  batch_to: string;
  batch_date: string;
  batch_form: string;
  batch_total_std :number;
  batch_status:string;
}

const Userdata: Userdata[] = [
  { id: 1, batch_name: 'Ayush', mobile: 9856232154, batch_select: 'BCA', batch_to: '00:08 PM', batch_date: '20-02-2023', batch_form: '00:07 AM' ,batch_total_std:200,batch_status:'Success'},
  { id: 1, batch_name: 'Munna', mobile: 9856232154, batch_select: 'BCA', batch_to: '00:08 PM', batch_date: '20-02-2023', batch_form: '00:07 AM' ,batch_total_std:500,batch_status:'Pending'},
  { id: 1, batch_name: 'Ayush', mobile: 9856232154, batch_select: 'BCA', batch_to: '00:08 PM', batch_date: '20-02-2023', batch_form: '00:07 AM' ,batch_total_std:100,batch_status:'Success'},
];
@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {
  displayedColumns: string[] = ['batch_id', 'batch_name', 'batch_select', 'batch_date', 'batch_form', 'batch_to','batch_total_std', 'batch_status','action'];
  dataSource = new MatTableDataSource(Userdata);
  count_batch:number=0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;

  constructor(
    private dailog: MatDialog,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

