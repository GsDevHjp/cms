import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddEditInstNotificationComponent } from '../add-edit-inst-notification/add-edit-inst-notification.component';
export interface Userdata {
  notification: string;
  description: string;
}

const Userdata: Userdata[] = [
 { notification: 'Ayush', description:'8956322145', },
 { notification: 'Ayush', description:'8956322145', },
 { notification: 'Ayush', description:'8956322145', },
 { notification: 'Ayush', description:'8956322145', },
 { notification: 'Ayush', description:'8956322145', },
 { notification: 'Ayush', description:'8956322145', },
 
];

@Component({
  selector: 'app-inst-notification',
  templateUrl: './inst-notification.component.html',
  styleUrls: ['./inst-notification.component.css']
})
export class InstNotificationComponent implements OnInit {

  displayedColumns: string[] = ['quiz_id', 'notification', 'description', 'action'];
  dataSource = new MatTableDataSource(Userdata);
  count_notification: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dailog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void { }

  add_notification() {
    this.dailog.open(AddEditInstNotificationComponent, {
      disableClose: true
    });
  }

  notification_edit(row: any) {
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

