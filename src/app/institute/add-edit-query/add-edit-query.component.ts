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
  constructor(
    @Inject(MAT_DIALOG_DATA) public editquery: any,
    private FormBuilder: FormBuilder,
    private matref: MatDialogRef<AddEditQueryComponent>,
    private manageservice: ManageService,
    private popup: NgToastService,
    private router: Router,
  ) {
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.inst_id
  }

  ngOnInit(): void {
    this.Query_Form = this.FormBuilder.group({
      query_id: [''],
      query_message: ['', Validators.required],
      query_answer: [''],
      query_description: [''],
      institute_id_fk: ['', Validators.required], 
      admin_id_fk: ['', Validators.required],
      query_date: [new Date().toISOString().slice(0, 10)],
    })
    this.Query_Form.controls['institute_id_fk'].setValue(this.inst_id);
  }
  add_query(){
    console.log(this.Query_Form.value)
    this.manageservice.post_query(this.Query_Form.value).subscribe(
      (res:any)=>{
        console.log(res)
        this.popup.success({ detail: 'Success', summary: 'Query Saved',})
      },
      (error:any)=>{
        this.popup.error({ detail: 'Unsuccess', summary: 'Query Not Saved',})
      }
    )
  }
}