import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.css']
})
export class AddEditCourseComponent implements OnInit {
  disableSelect = new FormControl(false);
  course_form!: FormGroup;
  admin = 1;
  upload: any;
  course_heading: string = 'Add Course'
  actionBtn: string = 'Add'

  constructor(
    private fb: FormBuilder,
    private service: ManageService,
    private matref: MatDialogRef<AddEditCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_course: any
  ) { }

  ngOnInit(): void {
    this.course_form = this.fb.group({
      course_id: [''],
      course_name: ['', Validators.required],
      course_total_fee: [''],
      course_half_fee: ['', Validators.required],
      course_quarter_fee: ['', Validators.required],
      course_monthly_fee: ['', Validators.required],
      course_admission_fee: ['', Validators.required],
      course_duration: [''],
      course_description: ['', Validators.required],
      course_date: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })
    this.course_form.controls['course_date'].setValue(new Date().toISOString().slice(0, 10));

    if (this.edit_course) {
      this.actionBtn = "Update";
      this.course_heading = "Update Course"
      this.course_form.controls['course_id'].setValue(this.edit_course.course_id);
      this.course_form.controls['course_name'].setValue(this.edit_course.course_name);
      this.course_form.controls['course_total_fee'].setValue(this.edit_course.course_total_fee);
      this.course_form.controls['course_half_fee'].setValue(this.edit_course.course_half_fee);
      this.course_form.controls['course_quarter_fee'].setValue(this.edit_course.course_quarter_fee);
      this.course_form.controls['course_monthly_fee'].setValue(this.edit_course.course_monthly_fee);
      this.course_form.controls['course_admission_fee'].setValue(this.edit_course.course_admission_fee);
      this.course_form.controls['course_duration'].setValue(this.edit_course.course_duration);
      this.course_form.controls['course_description'].setValue(this.edit_course.course_description);
      this.course_form.controls['admin_id_fk'].setValue(this.edit_course.admin_id_fk);
    }
  }
  onAdd() {
    console.log(this.course_form.value)
    if (!this.edit_course) {
      if (this.course_form.valid) {
        this.service.post_course(this.course_form.value).subscribe(
          (result: any) => {
            console.log(result)
            this.matref.close();
            this.course_form.reset();
            alert('form successfully...')

          },
          (error: any) => {
            console.log(error)
            alert('data not insert')
          }
        )
      }
    }
    else {
      this.updateCourse()
    }
  }

  updateCourse() {
    this.service.put_course(this.course_form.value).subscribe({
      next: (res) => {
        console.log(res)
        this.matref.close();
        alert('data update successfully')

      },
      error: () => {
        alert('data not update')
      }

    })
  }
  total_clc() {
    this.course_form.controls['course_half_fee'].setValue((this.course_form.get('course_total_fee')?.value) / 2)
    this.course_form.controls['course_quarter_fee'].setValue((this.course_form.get('course_total_fee')?.value) / 4)
    this.course_form.controls['course_monthly_fee'].setValue((this.course_form.get('course_total_fee')?.value) / 12)
  }
}