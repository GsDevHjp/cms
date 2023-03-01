import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { end } from '@popperjs/core';
@Component({
  selector: 'app-converttoadmission',
  templateUrl: './converttoadmission.component.html',
  styleUrls: ['./converttoadmission.component.css']
})
export class ConverttoadmissionComponent implements OnInit {

  student_form!: FormGroup;
  upload: any;
  hide = true;
  ActionBtn: string = 'Add'
  heading_act: string = 'Convert to Admission'
  admin = 1;
  institute_id: any;
  selectedImage: any = 'https://greensoft.net.in/gscms/assets/profile.png';
  status: any = 1
  login_deatils: any
  login: any
  student_id: Number = 0
  inst_id: any;
  std_data: any;
  std: any = 1;
  autoselect = 'Male'
  std_id: any = 0
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private service: ManageService,
    private router: Router,
    private matref: MatDialogRef<ConverttoadmissionComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_std: any,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.inst_id

  }

  ngOnInit(): void {
    this.student_form = this.fb.group({
      std_id: [''],
      std_name: ['', Validators.required],
      std_father_name: ['', Validators.required],
      std_father_occupation: ['', Validators.required],
      std_whatsapp_no: ['', Validators.required],
      std_aadhar: ['', Validators.required],
      std_email: ['', Validators.required],
      std_dob: ['', Validators.required],
      std_gender: ['', Validators.required],
      std_state: ['', Validators.required],
      std_district: ['', Validators.required],
      std_regist_date: ['', Validators.required],
      std_img: ['', Validators.required],
      std_address: ['', Validators.required],
      std_password: ['', Validators.required],
      std_regist_no: ['', Validators.required],
      institute_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })
    this.regist_no_generate()
    this.student_form.controls['std_regist_date'].setValue(new Date().toISOString().slice(0, 10));

    // for enquery to insert 
    if (this.edit_std) {
      this.student_form.controls['std_name'].setValue(this.edit_std.std_name);
      this.student_form.controls['std_father_name'].setValue(this.edit_std.std_father_name);
      this.student_form.controls['std_whatsapp_no'].setValue(this.edit_std.std_whatsapp_no);
      this.student_form.controls['std_gender'].setValue(this.edit_std.std_gender);
      this.student_form.controls['std_regist_date'].setValue(this.edit_std.std_regist_date);
      this.student_form.controls['std_address'].setValue(this.edit_std.std_address);
    }
    this.student_form.controls['institute_id_fk'].setValue(this.login.inst_id);
  }

  student_btn() {
    const fromdata = new FormData()
    fromdata.append('inst_id', this.inst_id)
    fromdata.append('std_email', this.student_form.get('std_email')?.value)
    this.service.std_email_verfiy(fromdata).subscribe(
      (res: any) => {
        console.log(res)
        if (res.success) {
          this.popup.warning({ detail: 'Warning', summary: 'this email already exists ' + res.data[0].std_name, })
    }
        else{

            this.final_submit()
        }
      },
      (error: any) => {
        alert("tow")
      }
    )

  }

  final_submit() {
    this.regist_no_generate()
    const formdata = new FormData();
    formdata.append('std_name', this.student_form.get('std_name')?.value)
    formdata.append('std_father_name', this.student_form.get('std_father_name')?.value)
    formdata.append('std_father_occupation', this.student_form.get('std_father_occupation')?.value)
    formdata.append('std_whatsapp_no', this.student_form.get('std_whatsapp_no')?.value)
    formdata.append('std_aadhar', this.student_form.get('std_aadhar')?.value)
    formdata.append('std_email', this.student_form.get('std_email')?.value)
    formdata.append('std_dob', this.student_form.get('std_dob')?.value)
    formdata.append('std_gender', this.student_form.get('std_gender')?.value)
    formdata.append('std_state', this.student_form.get('std_state')?.value)
    formdata.append('std_district', this.student_form.get('std_district')?.value)
    formdata.append('std_regist_date', this.student_form.get('std_regist_date')?.value)
    formdata.append('std_regist_no', this.student_form.get('std_regist_no')?.value)
    formdata.append('std_img', this.student_form.get('std_img')?.value)
    formdata.append('std_address', this.student_form.get('std_address')?.value)
    formdata.append('std_password', this.student_form.get('std_password')?.value)
    formdata.append('status', '1')
    formdata.append('institute_id_fk', this.login.inst_id)
    formdata.append('admin_id_fk', this.student_form.get('admin_id_fk')?.value)
    if (this.student_form.valid) {
      this.service.post_student(formdata).subscribe(
        (result: any) => {
          console.log(result)
          this.matref.close();
          this.student_form.reset();
          this.popup.success({ detail: 'Success', summary: 'Student Saved', })
          this.router.navigate(['/institutehome/student'])
        },
        (error: any) => {
          console.log(error)
          this.popup.error({ detail: 'Error', summary: 'Student Not Saved', })
        }
      )
    }
  }

  regist_no_generate() {
    const stdfromdata = new FormData()
    stdfromdata.append("inst_id", this.login.inst_id)
    this.service.get_student_by_inst_id(stdfromdata).subscribe(
      (res: any) => {

        this.std_data = res.data
        console.log(this.std_data)
        if (res.success == 1) {
          this.std = res.data.length + 1
        }
      }
    )
    const instname = this.login.inst_name.charAt(this.login.inst_name.indexOf(" ") + 1);
    const instshotname = this.login.inst_name.charAt(0) + (instname)
    this.student_form.controls['std_regist_no'].setValue(instshotname + formatDate(new Date(), 'yyyyMMdd', 'en') + this.std);
  }

  verfiy_email(std_email: any) {

  }


  OnUpload(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.student_form.get('std_img')?.setValue(file)
    }
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
    }
  }

  reset() {
    this.student_form.reset()
  }
}