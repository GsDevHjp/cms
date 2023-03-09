import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-query',
  templateUrl: './add-edit-query.component.html',
  styleUrls: ['./add-edit-query.component.css']
})
export class AddEditQueryComponent implements OnInit {
  admin = 1
  Query_Form !: FormGroup
  actionBtn: string = "Add"
  instupdate: string = "Query"
  login_deatils: any;
  login: any;
  inst_id: any;
  autoselect='Low'
  constructor(
    @Inject(MAT_DIALOG_DATA) public editquery: any,
    private FormBuilder: FormBuilder,
    private matref: MatDialogRef<AddEditQueryComponent>,
    private manageservice: ManageService,
    private popup: NgToastService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public edit_queary: any

  ) {
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.inst_id
  }

  ngOnInit(): void {
    this.Query_Form = this.FormBuilder.group({
      query_id: [''],
      query_message: ['', Validators.required],
      query_answer: ['',Validators.required],
      query_priority: [''],
      institute_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    })
    this.Query_Form.controls['institute_id_fk'].setValue(this.inst_id);

    if (this.edit_queary) {
      this.actionBtn = "Update";
      this.Query_Form.controls['query_id'].setValue(this.edit_queary.query_id);
      this.Query_Form.controls['query_message'].setValue(this.edit_queary.query_message);
      this.Query_Form.controls['query_answer'].setValue(this.edit_queary.query_answer);
      this.Query_Form.controls['query_priority'].setValue(this.edit_queary.query_priority);
      this.Query_Form.controls['admin_id_fk'].setValue(this.edit_queary.admin_id_fk);
    }
  }
  add_query() {
    this.manageservice.put_quary(this.Query_Form.value).subscribe({
      next: (res) => {
        console.log(res)
        this.matref.close();
        this.popup.success({ detail: 'Success', summary: 'Query Updated', })
        this.router.navigate(['/institutehome/instquery'])

      },
      error: () => {
        this.popup.error({ detail: 'Unsuccess', summary: 'Query Not Updated',})
      }
    })
  }
}
