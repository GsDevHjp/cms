import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AddEditInstQuestionBankComponent } from '../add-edit-inst-question-bank/add-edit-inst-question-bank.component';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-inst-question-bank',
  templateUrl: './inst-question-bank.component.html',
  styleUrls: ['./inst-question-bank.component.css']
})
export class InstQuestionBankComponent implements OnInit {
  displayedColumns: string[] = ['inst_question_bank_id', 'course_id_fk', 'inst_question_bank_title', 'inst_question_bank_description', 'inst_question_bank_img', 'action'];
  dataSource = new MatTableDataSource();
  count_inst_question_bank: number = 0;
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
      this.get_question_bank_by_inst_id(this.inst_id_for_admin);
    }
    if (this.inst_id_for_inst_login) {
      this.get_question_bank_by_inst_id(this.inst_id_for_inst_login)
    }
    if (this.inst_id_for_std) {
      this.get_question_bank_by_inst_id(this.inst_id_for_std)
      this.action_btn = true
      this.displayedColumns = ['inst_question_bank_id', 'course_id_fk', 'inst_question_bank_title', 'inst_question_bank_description', 'inst_question_bank_img', 'action'];
      const instformdata = new FormData()
      instformdata.append('inst_id', this.inst_id)
      this.service.get_question_bank_by_inst_id(instformdata).subscribe(
        (result: any) => {
          console.log(result)
          this.dataSource.data = result.data
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.count_inst_question_bank = result.data.length
          return
        }
      )
    }
  }

  get_question_bank_by_inst_id(inst_for_all: any) {
    const instformdata = new FormData()
    instformdata.append('inst_id', inst_for_all)
    this.service.get_question_bank_by_inst_id(instformdata).subscribe(
      (res: any) => {
        console.log(res)
        this.dataSource.data = res.data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.count_inst_question_bank = res.data.length
      }
    )
  }

  add_inst_question_bank(): any {
    this.dailog.open(AddEditInstQuestionBankComponent, {
      disableClose: true
    });
  }

  batch_edit(row: any) {
    this.dailog.open(AddEditInstQuestionBankComponent, {
      data: row,
    });
  }

  inst_question_bank_delete(row: any) {
    this.confirmServices.showConfirm('Are you sure to delate',
      () => {
        const deldata = new FormData();
        deldata.append('inst_question_bank_id', row.inst_question_bank_id);
        this.service.inst_question_bank_delete(deldata).subscribe(
          (res: any) => {
            console.log(res)
            this.popup.success({ detail: 'Success', summary: 'Course Deleted', })
            this.router.navigate(['/institutehome/instquestionbank']);
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

