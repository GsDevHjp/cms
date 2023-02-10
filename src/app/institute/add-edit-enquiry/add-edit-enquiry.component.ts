import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-add-edit-enquiry',
  templateUrl: './add-edit-enquiry.component.html',
  styleUrls: ['./add-edit-enquiry.component.css']
})
export class AddEditEnquiryComponent implements OnInit {
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
  constructor(
    private fb: FormBuilder,
    private service: ManageService,
    private matref: MatDialogRef<AddEditEnquiryComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_enq: any
  ) {
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
      enq_id: [''],
      std_name: ['', Validators.required],
      std_father_name: [''],
      std_whatsapp_no: ['', Validators.required],
      course_id_fk: ['', Validators.required],
      std_regist_date: [''],
      std_gender: ['', Validators.required],
      std_address: ['', Validators.required],
      institute_id_fk: [''],
      admin_id_fk: ['', Validators.required]
    })
    this.enquiry_form.controls['std_regist_date'].setValue(new Date().toISOString().slice(0, 10));
    if (this.edit_enq) {
      this.actionBtn = 'update'
      this.enquiry_heading = 'Update Enquiry'
      this.enquiry_form.controls['enq_id'].setValue(this.edit_enq.enq_id)
      this.enquiry_form.controls['std_name'].setValue(this.edit_enq.std_name)
      this.enquiry_form.controls['std_father_name'].setValue(this.edit_enq.std_father_name)
      this.enquiry_form.controls['std_whatsapp_no'].setValue(this.edit_enq.std_whatsapp_no)
      this.enquiry_form.controls['std_gender'].setValue(this.edit_enq.std_gender)
      this.enquiry_form.controls['std_address'].setValue(this.edit_enq.std_address)
      this.enquiry_form.controls['course_id_fk'].setValue(this.edit_enq.course_id)
      this.enquiry_form.controls['institute_id_fk'].setValue(this.login.inst_id);
      this.enquiry_form.controls['admin_id_fk'].setValue(this.edit_enq.admin_id_fk)
    }
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
            alert('form successfully...')
          },
          (error) => {
            console.log(error)
            alert('data not insert')
          }
        )
      }
    }
    else {
      this.enquiryUpdate()
    }
  }
  enquiryUpdate() {
    this.service.put_enquiry(this.enquiry_form.value).subscribe({
      next: (res) => {
        console.log(res)
        this.matref.close()
        alert('update successfully')
      },
      error: (error) => {
        console.log(error)
        alert('data not update')
      }
    })
  }
}