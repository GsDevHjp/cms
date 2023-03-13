import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AddEditInstNotesComponent } from '../add-edit-inst-notes/add-edit-inst-notes.component';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-inst-notes',
  templateUrl: './inst-notes.component.html',
  styleUrls: ['./inst-notes.component.css']
})
export class InstNotesComponent implements OnInit {
  displayedColumns: string[] = ['inst_notes_id', 'course_id_fk', 'inst_notes_title', 'inst_notes_description', 'inst_notes_img', 'action'];
  dataSource = new MatTableDataSource();
  count_inst_notes: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  imgUrl: string = 'assets/';
  login_deatils: any
  login: any
  inst_id: any
  inst_id_for_inst_login: any
  inst_id_for_admin: any;
  inst_id_for_std: any;
  action_btn: boolean = false

  constructor(
    private dailog: MatDialog,
    private router: Router,
    private service: ManageService,
    private popup:NgToastService,
    private confirmServices:NgConfirmService
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
      this.get_notes_by_inst_id(this.inst_id_for_admin);
    }
    if (this.inst_id_for_inst_login) {
      this.get_notes_by_inst_id(this.inst_id_for_inst_login)
    }
    if (this.inst_id_for_std) {
      this.get_notes_by_inst_id(this.inst_id_for_std)
      this.action_btn = true
      this.displayedColumns = ['inst_notes_id', 'course_id_fk', 'inst_notes_title', 'inst_notes_description', 'inst_notes_img', 'action'];
      const instformdata = new FormData()
      instformdata.append('inst_id', this.inst_id)
      this.service.get_notes_by_inst_id(instformdata).subscribe(
        (result: any) => {
          console.log(result)
          this.dataSource.data = result.data
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.count_inst_notes = result.data.length
          return
        }
      )
    }
  }


  get_notes_by_inst_id(inst_for_all: any) {
    const instformdata = new FormData()
    instformdata.append('inst_id', inst_for_all)
    this.service.get_notes_by_inst_id(instformdata).subscribe(
      (res: any) => {
        console.log(res)
        this.dataSource.data = res.data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.count_inst_notes = res.data.length
      }
    )
  }

  add_inst_notes(): any {
    this.dailog.open(AddEditInstNotesComponent, {
      disableClose: true
    });
  }

  batch_edit(row: any) {
    this.dailog.open(AddEditInstNotesComponent, {
      data: row,
    });
  }
  inst_notes_delete(row: any) {
    this.confirmServices.showConfirm('Are You Sure To Delete',
      () => {
        const deldata = new FormData();
        deldata.append('inst_notes_id', row.inst_notes_id);
        this.service.inst_notes_delete(deldata).subscribe(
          (res: any) => {
            console.log(res)
            this.popup.success({ detail: 'Success', summary: 'Course Deleted', })
            this.router.navigate(['/institutehome/instnotes']);
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

