import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddEditInstNotificationComponent } from '../add-edit-inst-notification/add-edit-inst-notification.component';
export interface Userdata {
  quiz_option_a: string;
  quiz_option_b: string;
  quiz_option_c: string;
  quiz_option_d: string
}

const Userdata: Userdata[] = [
 {quiz_option_c:'How Are You', quiz_option_a: 'Ayush', quiz_option_b:'8956322145',  quiz_option_d: 'Hajipur', },
 {quiz_option_c:'How Are You', quiz_option_a: 'Munna', quiz_option_b:'7845212356', quiz_option_d: 'Patna', },
 {quiz_option_c:'How Are You', quiz_option_a: 'Rahul', quiz_option_b:'7854212356', quiz_option_d: 'Vaishali', },
 {quiz_option_c:'How Are You', quiz_option_a: 'Sahil', quiz_option_b:'8956234587', quiz_option_d: 'Patna', },
];


@Component({
  selector: 'app-inst-notification',
  templateUrl: './inst-notification.component.html',
  styleUrls: ['./inst-notification.component.css']
})
export class InstNotificationComponent implements OnInit {

  displayedColumns: string[] = ['quiz_id', 'quiz_option_a', 'quiz_option_b', 'action'];
  dataSource = new MatTableDataSource(Userdata);
  count_course: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;
  imgUrl:string = 'http://localhost/cms/src/assets/';


  constructor(
    private dailog: MatDialog,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void { }

  add_course() {
    this.dailog.open(AddEditInstNotificationComponent, {
      disableClose: true
    });
  }

  course_edit(row: any) {
    this.dailog.open(AddEditInstNotificationComponent, {
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

