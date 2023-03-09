import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
@Component({
  selector: 'app-std-query',
  templateUrl: './std-query.component.html',
  styleUrls: ['./std-query.component.css']
})
export class StdQueryComponent implements OnInit {
  admin = 1
  Query_Form !: FormGroup
  actionBtn: string = "Submit"
  headbtn: string = "Query"
  login_deatils: any;
  login: any;
  std_id: any;
  autoselect='Low'
  inst_id: any;
  inst_id_for_inst_login: any;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public editquery: any,
    private FormBuilder: FormBuilder,
    private matref: MatDialogRef<StdQueryComponent>,
    private manageservice: ManageService,
    private popup: NgToastService,
    private router: Router,
  ) {
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    console.log(this.login.std_name)
    this.std_id = this.login.std_id

    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.institute_id_fk
  }

  ngOnInit(): void {
    this.Query_Form = this.FormBuilder.group({
      query_id: [''],
      query_priority: ['', Validators.required],
      query_message: ['', Validators.required],
      query_date: ['', Validators.required],
      std_id_fk:[''],
      institute_id_fk:[''],
      admin_id_fk: ['', Validators.required],
    })
    this.Query_Form.controls['query_date'].setValue(new Date().toISOString().slice(0, 10));
    this.Query_Form.controls['std_id_fk'].setValue(this.login.std_id);
    this.Query_Form.controls['institute_id_fk'].setValue(this.login.institute_id_fk);
  }
  add_query() {
    console.log(this.Query_Form.value)
    this.manageservice.post_std_query(this.Query_Form.value).subscribe(
      (res:any)=>{
        console.log(res)
        this.matref.close();
        this.popup.success({ detail: 'Success', summary: 'Query Saved',})
        this.router.navigate(['/studenthome/query'])
      },
      (error:any)=>{
        this.popup.error({ detail: 'Unsuccess', summary: 'Query Not Saved',})
      }
    )
  }
}