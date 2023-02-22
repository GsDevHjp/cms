import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddEditInstNotificationComponent } from '../add-edit-inst-notification/add-edit-inst-notification.component';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-inst-notification',
  templateUrl: './inst-notification.component.html',
  styleUrls: ['./inst-notification.component.css']
})
export class InstNotificationComponent implements OnInit {

  displayedColumns: string[] = ['quiz_id', 'notification', 'description', 'action'];
  dataSource = new MatTableDataSource();
  count_notification: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  login_deatils: any
  login: any
  inst_id:any
  inst_id_for_inst_login: any;

  constructor(
    private dailog: MatDialog,
    private service:ManageService,
    private router:Router
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
    const fromdata = new FormData()
    fromdata.append('inst_id', this.inst_id_for_inst_login)
    this.service.get_notification_by_inst_id(fromdata).subscribe(
      (res: any) => {
        console.log("hdbk"+res)
        this.dataSource.data = res.data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.count_notification = res.data.length
      }
    )
   }

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
  notification_delete(row:any){
    if (confirm("Are you sure to delate")) {
      const deldata = new FormData();
      deldata.append('notification_id', row.notification_id);
      this.service.notification_delete(deldata).subscribe(
        (res: any) => {
          console.log(res)
          alert('data delate sucessfully')
          this.router.navigate(['/institutehome/instnotification'])
        }
      )
    }
    else {
      alert('cancle')
    }
  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

