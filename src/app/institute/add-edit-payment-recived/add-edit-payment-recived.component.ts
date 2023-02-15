import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-add-edit-payment-recived',
  templateUrl: './add-edit-payment-recived.component.html',
  styleUrls: ['./add-edit-payment-recived.component.css']
})
export class AddEditPaymentRecivedComponent implements OnInit {
  toppings = new FormControl('');
  toppingList: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  disableSelect = new FormControl(false);
  fee_form!: FormGroup;
  admin = 1;
  upload: any;
  actionBtn: string = 'Add'
  fee_heading: string = 'Add Fee'
  student_data: any;
  course_data: any;
  batch_data: any;
  student_single_data: any;
  course_single_data: any;
  monthly_act: boolean = true;
  setvalue: any;
  imgUrl: string = 'https://greensoft.net.in/gscms/assets/profile.png';
  login_deatils: any;
  login: any;
  inst_id: any;
  inst_id_for_inst_login: any;
  autoselect='Offline'

  constructor(
    private popup:NgToastService,
    private fb: FormBuilder,
    private service: ManageService,
    private matref: MatDialogRef<AddEditPaymentRecivedComponent>,
    @Inject(MAT_DIALOG_DATA) public editfee: any,

  ) {
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.inst_id
    this.inst_id_for_inst_login = this.login.inst_id
    console.log(this.login.inst_id)
  }

  ngOnInit(): void {
    const formdata = new FormData()
    formdata.append("inst_id", this.inst_id_for_inst_login)
    this.service.get_student_by_inst_id(formdata).subscribe(
      (std_res: any) => {
        this.student_data = std_res.data
      }
    )
    const courseformdata = new FormData()
    courseformdata.append("inst_id", this.inst_id_for_inst_login)
    this.service.get_course_by_inst_id(courseformdata).subscribe(
      (batch_res: any) => {
        this.course_data = batch_res.data
      }
    )
    const batchformdata = new FormData()
    batchformdata.append("inst_id", this.inst_id_for_inst_login)
    this.service.get_batch_by_inst_id(batchformdata).subscribe(
      (batch_res: any) => {
        console.log(batch_res.data)
        this.batch_data = batch_res.data
      }
    )
    this.fee_form = this.fb.group({
      fee_by_std_id: ['',],
      fee_id: ['',],
      student_id_fk: ['', Validators.required],
      std_father_name: [''],
      std_whatsapp_no: [''],
      std_address: [''],
      std_img: [''],
      course_id_fk: ['', Validators.required],
      course_total_fee: [''],
      course_half_fee: [''],
      course_quarter_fee: [''],
      course_monthly_fee: [''],
      course_admission_fee: [''],
      fee_type: ['', Validators.required],
      fee_monthly: [''],
      fee_mode: ['', Validators.required],
      fee_amount: ['', Validators.required],
      fee_description: ['', Validators.required],
      fee_date: ['', Validators.required],
      batch_id_fk: ['', Validators.required],
      institute_id_fk: [''],
      admin_id_fk: ['', Validators.required]
    })
    this.fee_form.controls['fee_date'].setValue(new Date().toISOString().slice(0, 10));
    if (this.editfee) {
      this.actionBtn = "Update";
      this.fee_heading = "Update"
      this.fee_form.controls['fee_id'].setValue(this.editfee.fee_id);
      this.fee_form.controls['fee_by_std_id'].setValue(this.editfee.std_id);
      this.fee_form.controls['student_id_fk'].setValue(this.editfee.std_id);
      this.fee_form.controls['std_father_name'].setValue(this.editfee.std_father_name);
      this.fee_form.controls['std_whatsapp_no'].setValue(this.editfee.std_whatsapp_no);
      this.fee_form.controls['std_address'].setValue(this.editfee.std_address);
      this.fee_form.controls['course_id_fk'].setValue(this.editfee.course_id);
      this.fee_form.controls['course_total_fee'].setValue(this.editfee.course_total_fee);
      this.fee_form.controls['course_half_fee'].setValue(this.editfee.course_half_fee);
      this.fee_form.controls['course_quarter_fee'].setValue(this.editfee.course_quarter_fee);
      this.fee_form.controls['course_monthly_fee'].setValue(this.editfee.course_monthly_fee);
      this.fee_form.controls['course_admission_fee'].setValue(this.editfee.course_admission_fee);
      this.fee_form.controls['fee_type'].setValue(this.editfee.fee_type);
      this.fee_form.controls['fee_monthly'].setValue(this.editfee.fee_monthly);
      this.fee_form.controls['fee_mode'].setValue(this.editfee.fee_mode);
      this.fee_form.controls['fee_amount'].setValue(this.editfee.fee_amount);
      this.fee_form.controls['fee_description'].setValue(this.editfee.fee_description);
      this.fee_form.controls['std_img'].setValue(this.editfee.std_img);
      this.imgUrl = 'https://greensoft.net.in/gscms/assets/' + this.editfee.std_img;
      this.fee_form.controls['batch_id_fk'].setValue(this.editfee.batch_name);
      this.fee_form.controls['admin_id_fk'].setValue(this.editfee.admin_id_fk);
    }
  }
  get_student_single_data(event: any) {
    const formdata = new FormData();
    formdata.append('std_id', event)
    this.service.get_student_by_std_id(formdata).subscribe(
      (res: any) => {
        console.log(res.data)
        this.student_single_data = res.data
        this.fee_form.controls['fee_by_std_id'].setValue(this.student_single_data.std_id);
        this.fee_form.controls['std_father_name'].setValue(this.student_single_data.std_father_name);
        this.fee_form.controls['std_whatsapp_no'].setValue(this.student_single_data.std_whatsapp_no);
        this.fee_form.controls['std_address'].setValue(this.student_single_data.std_address);
        this.fee_form.controls['std_img'].setValue(this.student_single_data.std_img);
        this.imgUrl = 'https://greensoft.net.in/gscms/assets/' + this.editfee.std_img;
      }
    )
  }
  get_course_single_data(event: any) {
    const courseformdata = new FormData();
    courseformdata.append('course_id', event)
    this.service.get_course_by_course_id(courseformdata).subscribe(
      (res: any) => {
        console.log(res)
        this.course_single_data = res.data
        this.fee_form.controls['course_total_fee'].setValue(this.course_single_data.course_total_fee);
        this.fee_form.controls['course_half_fee'].setValue(this.course_single_data.course_half_fee);
        this.fee_form.controls['course_quarter_fee'].setValue(this.course_single_data.course_quarter_fee);
        this.fee_form.controls['course_monthly_fee'].setValue(this.course_single_data.course_monthly_fee);
        this.fee_form.controls['course_admission_fee'].setValue(this.course_single_data.course_admission_fee);
      }
    )
  }

  fee_btn() {
    console.log(this.fee_form.value)
    const formadd = new FormData();
    formadd.append('student_id_fk', this.fee_form.get('student_id_fk')?.value)
    formadd.append('course_id_fk', this.fee_form.get('course_id_fk')?.value)
    formadd.append('fee_type', this.fee_form.get('fee_type')?.value)
    formadd.append('fee_monthly', this.fee_form.get('fee_monthly')?.value)
    formadd.append('fee_mode', this.fee_form.get('fee_mode')?.value)
    formadd.append('fee_amount', this.fee_form.get('fee_amount')?.value)
    formadd.append('fee_description', this.fee_form.get('fee_description')?.value)
    formadd.append('fee_date', this.fee_form.get('fee_date')?.value)
    formadd.append('batch_id_fk', this.fee_form.get('batch_id_fk')?.value)
    formadd.append('institute_id_fk', this.inst_id)
    formadd.append('admin_id_fk', this.fee_form.get('admin_id_fk')?.value)
    if (!this.editfee) {
      if (this.fee_form.valid) {
        this.service.post_fee(formadd).subscribe(
          (res: any) => {
            console.log(res)
            this.matref.close();
            this.popup.success({ detail: 'Success', summary: 'Payment Insert Successfully..',})
          },

          (error: any) => {
            console.log(error)
            this.popup.error({ detail: 'Unsuccess', summary: 'Payment Not Insert..',})
          }
        )
      }
    }
    else {
      this.updateFee()
    }
  }
  updateFee() {
    const formupdate = new FormData();
    formupdate.append('fee_id', this.fee_form.get('fee_id')?.value)
    formupdate.append('fee_type', this.fee_form.get('fee_type')?.value)
    formupdate.append('fee_monthly', this.fee_form.get('fee_monthly')?.value)
    formupdate.append('fee_mode', this.fee_form.get('fee_mode')?.value)
    formupdate.append('fee_amount', this.fee_form.get('fee_amount')?.value)
    formupdate.append('fee_description', this.fee_form.get('fee_description')?.value)
    formupdate.append('fee_date', this.fee_form.get('fee_date')?.value)
    formupdate.append('student_id_fk', this.fee_form.get('student_id_fk')?.value)
    formupdate.append('course_id_fk', this.fee_form.get('course_id_fk')?.value)
    formupdate.append('batch_id_fk', this.fee_form.get('batch_id_fk')?.value)
    formupdate.append('institute_id_fk', this.inst_id)
    formupdate.append('admin_id_fk', this.fee_form.get('admin_id_fk')?.value)
    this.service.put_fee(formupdate).subscribe({
      next: (res: any) => {
        console.log(res)
        this.matref.close();
        this.popup.success({ detail: 'Success', summary: 'Payment Update Successfully..',})
      },
      error: (error: any) => {
        console.log(error)
        this.popup.error({ detail: 'Unsuccess', summary: 'Payment Not Update..',})
      }
    })
  }
  select_fee_type(event: any) {
    console.log(event)
    if (event == "Monthly Fee") {
      this.monthly_act = false
    }
    else {
      this.monthly_act = true
    }
    if (event == "Admission Fee") {
      this.fee_form.controls['fee_amount'].setValue(this.fee_form.get('course_admission_fee')?.value);
    }
    if (event == "Total Fee") {
      this.fee_form.controls['fee_amount'].setValue(this.fee_form.get('course_total_fee')?.value);
    }
    if (event == "Half Fee") {
      this.fee_form.controls['fee_amount'].setValue(this.fee_form.get('course_half_fee')?.value);
    }
    if (event == "Quarter Fee") {
      this.fee_form.controls['fee_amount'].setValue(this.fee_form.get('course_quarter_fee')?.value);
    }
  }
}