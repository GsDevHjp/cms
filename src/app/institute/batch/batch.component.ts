import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AddEditBatchComponent } from '../add-edit-batch/add-edit-batch.component';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {
  displayedColumns: string[] = ['batch_id', 'course_id_fk', 'batch_name', 'batch_arrival', 'batch_departure', 'batch_status', 'batch_date', 'batch_total_std', 'batch_description', 'action'];
  dataSource = new MatTableDataSource();
  count_batch: number = 0;
  inst_id: any
  action_btn: boolean = false
  Ttalstd: number = 0
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;
  login_deatils: any
  login: any
  inst_id_for_inst_login:any
  constructor(
    private dailog: MatDialog,
    private router: Router,
    private service: ManageService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    const institute_data = this.router.getCurrentNavigation();
    this.inst_id = institute_data?.extras

    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.institute_id_fk
    this.inst_id_for_inst_login  = this.login.inst_id
  }

  ngOnInit(): void {
    if (this.inst_id > 0) {
      this.action_btn = true
      this.displayedColumns = ['batch_id', 'course_id_fk', 'batch_name', 'batch_arrival', 'batch_departure', 'batch_status', 'batch_date', 'batch_total_std', 'batch_description'];
      const instformdata = new FormData()
      instformdata.append('inst_id', this.inst_id)
      this.service.get_batch_by_inst_id(instformdata).subscribe(
        (result: any) => {
          console.log(result)
          this.dataSource.data = result.data
          this.dataSource.sort = this.sort;
          this.count_batch = result.data.length
          return
        }
      )
    }
    else {
      const instlogin = new FormData()
      instlogin.append('inst_id', this.inst_id_for_inst_login)
      this.service.get_batch_by_inst_id(instlogin).subscribe(
        (res: any) => {
          console.log(res)
          this.dataSource.data = res.data
          this.dataSource.sort = this.sort;
          this.count_batch = res.data.length
          this.dataSource.paginator = this.paginator;

        }
      )
    }
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
    if (confirm("Are you sure to delate")) {
      const deldata = new FormData();
      deldata.append('batch_id', row.batch_id);
      this.service.batch_delete(deldata).subscribe(
        (res: any) => {
          alert('data delate sucessfully')
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

