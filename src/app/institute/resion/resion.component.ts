import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-resion',
  templateUrl: './resion.component.html',
  styleUrls: ['./resion.component.css']
})
export class ResionComponent implements OnInit {
  disableSelect = new FormControl(false);
  enquiry_form!: FormGroup;
  admin = 1;
  upload: any;
  actionBtn: string = 'Add'
  enquiry_heading: string = 'Add Enquiry'
  course_data: any;
  login_deatils: any
  login: any
  inst_id: any
  inst_id_for_inst_login: any
  autoselect='Male'

  constructor(
    private popup : NgToastService,
    private fb: FormBuilder,
    private router:Router,
    private service: ManageService,
    private matref: MatDialogRef<ResionComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_enq: any
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.inst_id
    this.inst_id_for_inst_login = this.login.inst_id
  }
 
  ngOnInit(): void {
    const formdata = new FormData()
    formdata.append("inst_id", this.inst_id_for_inst_login)
    this.service.get_course_by_inst_id(formdata).subscribe(
      (std_res: any) => {
        this.course_data = std_res.data
      }
    )

    this.enquiry_form = this.fb.group({
      cancel_id: [''],
      cancel_msg: ['', Validators.required], 
      institute_id_fk: [''],
      admin_id_fk: ['', Validators.required]
    })
    this.enquiry_form.controls['std_regist_date'].setValue(new Date().toISOString().slice(0, 10));
   
    this.enquiry_form.controls['institute_id_fk'].setValue(this.login.inst_id);
  }
  enquiry_btn() {
    console.log(this.enquiry_form.value)
    if (!this.edit_enq) {
      if (this.enquiry_form.valid) {
        this.service.post_enquiry(this.enquiry_form.value).subscribe(
          (res: any) => {
            console.log(res)
            this.matref.close();
            this.popup.success({ detail: 'Success', summary: 'Enquiry Saved',})
          },

          (error) => {
            console.log(error)
            this.popup.error({ detail: 'Unsuccess', summary: 'Enquiry Not Saved',})
          }
        )
      }
    } 
  
  }

}