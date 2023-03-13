import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AddEditInstBookComponent } from '../add-edit-inst-book/add-edit-inst-book.component';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-inst-book',
  templateUrl: './inst-book.component.html',
  styleUrls: ['./inst-book.component.css']
})
export class InstBookComponent implements OnInit {
  displayedColumns: string[] = ['book_id', 'course_id_fk', 'inst_book_title', 'inst_book_description', 'inst_book_img', 'action'];
  dataSource = new MatTableDataSource();
  count_inst_book: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  imgUrl: string = 'assets/';
  login_deatils: any
  login: any
  inst_id: any
  inst_id_for_inst_login: any
  action_btn: boolean = false
  inst_id_for_admin: any;
  inst_id_for_std: any;

  constructor(
    private dailog: MatDialog,
    private router: Router,
    private service: ManageService,
    private popup: NgToastService,
    private confirmServices: NgConfirmService,

  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    const institute_data = this.router.getCurrentNavigation();
    this.inst_id_for_admin = institute_data?.extras
    console.log("admin" + this.inst_id_for_admin)
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id_for_std = this.login.institute_id_fk
    this.inst_id_for_inst_login = this.login.inst_id
    console.log("std" + this.inst_id_for_std)
    console.log("inst" + this.inst_id_for_inst_login)
  }

  ngOnInit(): void {
    if (this.inst_id_for_admin) {
      this.get_book_by_inst_id(this.inst_id_for_admin);
    }
    if (this.inst_id_for_inst_login) {
      this.get_book_by_inst_id(this.inst_id_for_inst_login)
    }
    if (this.inst_id_for_std) {
      this.get_book_by_inst_id(this.inst_id_for_std)
      this.action_btn = true
      this.displayedColumns = ['book_id', 'course_id_fk', 'inst_book_title', 'inst_book_description', 'inst_book_img'];
      const instformdata = new FormData()
      instformdata.append('inst_id', this.inst_id)
      this.service.get_book_by_inst_id(instformdata).subscribe(
        (result: any) => {
          console.log(result)
          this.dataSource.data = result.data
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.count_inst_book = result.data.length
          return
        }
      )
    }
  }

  get_book_by_inst_id(inst_for_all: any) {
    const instformdata = new FormData()
    instformdata.append('inst_id', inst_for_all)
    this.service.get_book_by_inst_id(instformdata).subscribe(
      (res: any) => {
        console.log(res)
        this.dataSource.data = res.data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.count_inst_book = res.data.length
      }
    )
  }

  add_batch(): any {
    this.dailog.open(AddEditInstBookComponent, {
      disableClose: true
    });
  }

  batch_edit(row: any) {
    this.dailog.open(AddEditInstBookComponent, {
      data: row,
    });
  }

  inst_book_delete(row: any) {
    this.confirmServices.showConfirm('Are You Sure To Delete',
      () => {
        const deldata = new FormData();
        deldata.append('inst_book_id', row.inst_book_id);
        this.service.inst_book_delete(deldata).subscribe(
          (res: any) => {
            console.log(res)
            this.popup.success({ detail: 'Success', summary: 'Course Deleted', })
            this.router.navigate(['/institutehome/instbook']);
          }
        )
      },
      () => {
        this.popup.error({ detail: 'Unsuccess', summary: 'Course Not Deleted', })
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

