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

  onSubmit() {
    throw new Error('Method not implemented.');
  }
  resetparty() {
    throw new Error('Method not implemented.');
  }
  disableSelect = new FormControl(false);
  selector: 'radio-overview-example' | undefined
  addmission_form!: FormGroup;
  upload: any;
  actionBtn: string = 'Submit'
  admin_id: any;
  course_data: any
  batch_data: any
  constructor(
    private fb: FormBuilder,
    private matref: MatDialogRef<AddEditAddmissionComponent>,
    private service: ManageService
  ) { }

  ngOnInit(): void {
    this.service.get_course().subscribe(
      (res: any) => {
        // console.log(res)
        this.course_data = res.data
      }
    )

    this.addmission_form = this.fb.group({
      inst_course: ['', Validators.required],
      batch_name: ['', Validators.required],
      course_admission_fee: ['', Validators.required],
      course_total_fee: ['', Validators.required],
      course_duration: ['', Validators.required],
      course_date: ['', Validators.required],

    }
    )
  }

  get_course(event: any) {
    console.log(event)
    const courseformdata = new FormData();
    courseformdata.append('course_id', event)
    this.service.get_batch_by_course_id(courseformdata).subscribe(
      (course_res: any) => {
        this.batch_data = course_res.data
        console.log(course_res)

        console.log('course_duration' + this.batch_data[0].course_duration)
        console.log('course_admission_fee' + this.batch_data[0].course_admission_fee)
        console.log('course_total_fee' + this.batch_data[0].course_total_fee)
        console.log('date' + new Date().toISOString().slice(0, 10))
        console.log('batch_name' + this.batch_data[0].batch_name)

        this.addmission_form.controls['course_admission_fee'].setValue(this.batch_data[0].course_admission_fee);
        this.addmission_form.controls['course_duration'].setValue(this.batch_data[0].course_duration);
        this.addmission_form.controls['course_total_fee'].setValue(this.batch_data[0].course_total_fee);
        this.addmission_form.controls['course_date'].setValue(new Date().toISOString().slice(0, 10));
        this.addmission_form.controls['batch_name'].setValue(this.batch_data[0].batch_name);
      }
    )
  }


  addstd() {

  }

}