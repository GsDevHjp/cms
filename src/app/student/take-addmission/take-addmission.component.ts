import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AddEditTakeAddmissionComponent } from '../add-edit-take-addmission/add-edit-take-addmission.component';

@Component({
  selector: 'app-take-addmission',
  templateUrl: './take-addmission.component.html',
  styleUrls: ['./take-addmission.component.css']
})
export class TakeAddmissionComponent implements OnInit {
  displayedColumns: string[] = ['course_id', 'course_name', 'admission_fee', 'course_duration', 'half_fee', 'course_monthly', 'total_fee', 'course_date', 'action'];
  dataSource = new MatTableDataSource();
  course_count: any;
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
    add_course() {
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