import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { Router } from '@angular/router';
import { AddEditCountryComponent } from '../add-edit-country/add-edit-country.component';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  displayedColumns: string[] = ['address_id', 'country', 'description'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  course_count: any
  total_course_count: any;
  constructor(
    private dailog: MatDialog,
    private manageservice: ManageService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.manageservice.get_country().subscribe(
      (instdata: any) => {
        console.log(instdata)
        this.dataSource = new MatTableDataSource(instdata.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.course_count = instdata.data.length
      }
    )
  }

  add_country() {
    this.dailog.open(AddEditCountryComponent, {
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