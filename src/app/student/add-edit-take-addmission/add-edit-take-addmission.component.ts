import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AddEditAddmissionComponent } from 'src/app/institute/add-edit-addmission/add-edit-addmission.component';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-add-edit-take-addmission',
  templateUrl: './add-edit-take-addmission.component.html',
  styleUrls: ['./add-edit-take-addmission.component.css']
})


export class AddEditTakeAddmissionComponent implements OnInit {
  addparty: any;
  admin = 1
  inst_id_fk: any;
  upload: any;
  actionBtn: string = 'Submit'
  admin_id: any;
  course_data: any
  batch_data: any
  login_deatils: any
  login: any
  regist_no: any
  std_id_fk: any
  onSubmit() {
    throw new Error('Method not implemented.');
  }
  resetparty() {
    throw new Error('Method not implemented.');
  }
  disableSelect = new FormControl(false);
  selector: 'radio-overview-example' | undefined
  addmission_form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matref: MatDialogRef<AddEditAddmissionComponent>,
    private service: ManageService
  ) { }

  ngOnInit(): void {
    this.service.get_course().subscribe(
      (res: any) => {
        this.course_data = res.data
      }
    )



    this.addmission_form = this.fb.group({
      regist_no: ['', Validators.required],
      course_id_fk: ['', Validators.required],
      course_duration: [''],
      course_total_fee: [''],
      course_half_fee: [''],
      course_quarter_fee: [''],
      course_monthly_fee: [''],
      course_admission_fee: [''],
      batch_id_fk: ['', Validators.required],
      batch_arrival: [''],
      batch_departure: [''],
      batch_status: [''],
      batch_date: [''],
      roll_no: ['', Validators.required],
      admission_date: [''],
      inst_id_fk: [''],
      std_id_fk: [''],
      admin_id_fk: ['', Validators.required]
    })

    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)

    this.inst_id_fk = this.login.institute_id_fk
    this.std_id_fk = this.login.std_id_fk
    this.regist_no = this.login.std_id

    this.addmission_form.controls['std_id_fk'].setValue(this.login.std_id);
    this.addmission_form.controls['inst_id_fk'].setValue(this.login.institute_id_fk);
    this.addmission_form.controls['regist_no'].setValue(this.inst_id_fk + this.login.std_id);
    this.addmission_form.controls['roll_no'].setValue(this.login.std_id);

  }

  get_course(event: any) {
    console.log(event)
    const courseformdata = new FormData();
    courseformdata.append('course_id', event)
    this.service.get_batch_by_course_id(courseformdata).subscribe(
      (course_res: any) => {
        this.batch_data = course_res.data

        this.addmission_form.controls['course_duration'].setValue(this.batch_data[0].course_duration);
        this.addmission_form.controls['course_admission_fee'].setValue(this.batch_data[0].course_admission_fee);
        this.addmission_form.controls['course_total_fee'].setValue(this.batch_data[0].course_total_fee);
        this.addmission_form.controls['course_half_fee'].setValue(this.batch_data[0].course_half_fee);
        this.addmission_form.controls['course_quarter_fee'].setValue(this.batch_data[0].course_quarter_fee);
        this.addmission_form.controls['course_monthly_fee'].setValue(this.batch_data[0].course_monthly_fee);
        this.addmission_form.controls['batch_id_fk'].setValue(this.batch_data[0].batch_id);
        this.addmission_form.controls['batch_arrival'].setValue(this.batch_data[0].batch_arrival);
        this.addmission_form.controls['batch_departure'].setValue(this.batch_data[0].batch_departure);
        this.addmission_form.controls['batch_status'].setValue(this.batch_data[0].batch_status);
        this.addmission_form.controls['batch_date'].setValue(this.batch_data[0].batch_date);
        this.addmission_form.controls['admission_date'].setValue(new Date().toISOString().slice(0, 10));
      }
    )
  }


  addstd() {
    const formdata = new FormData();
 
    console.log('regist_no' + this.addmission_form.get('regist_no')?.value)
    console.log('roll_no' + this.addmission_form.get('roll_no')?.value)
    console.log('inst_id_fk' + this.addmission_form.get('inst_id_fk')?.value)
    console.log('std_id_fk' + this.addmission_form.get('std_id_fk')?.value)
    console.log('course_id_fk' + this.addmission_form.get('course_id_fk')?.value)
    console.log('batch_id_fk' + this.addmission_form.get('batch_id_fk')?.value)
    console.log('admission_date' + this.addmission_form.get('admission_date')?.value)
    console.log('admin_id_fk' + this.addmission_form.get('admin_id_fk')?.value)


    formdata.append('regist_no', this.addmission_form.get('regist_no')?.value)
    formdata.append('roll_no', this.addmission_form.get('roll_no')?.value)
    formdata.append('inst_id_fk', this.addmission_form.get('inst_id_fk')?.value)
    formdata.append('std_id_fk', this.addmission_form.get('std_id_fk')?.value)
    formdata.append('course_id_fk', this.addmission_form.get('course_id_fk')?.value)
    formdata.append('batch_id_fk', this.addmission_form.get('batch_id_fk')?.value)
    formdata.append('admission_date', this.addmission_form.get('admission_date')?.value)
    formdata.append('admin_id_fk', this.addmission_form.get('admin_id_fk')?.value)

    this.service.std_admission(formdata).subscribe(
      (result: any) => {
        console.log(result)
        alert("Admission Successfully..")
      },
      (error: any) => {
        console.log(error)
        alert("Admission Unsuccess..")
      }
    )
  }

}
