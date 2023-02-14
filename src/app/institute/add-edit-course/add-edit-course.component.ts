import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
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
  inst_id: any
  login_deatils: any
  login: any
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private service: ManageService,
    private matref: MatDialogRef<AddEditCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_course: any
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.inst_id
  }

  ngOnInit(): void {
    this.course_form = this.fb.group({
      course_id: [''],
      course_name: ['', Validators.required],
      course_total_fee: ['', Validators.required],
      course_half_fee: ['', Validators.required],
      course_quarter_fee: ['', Validators.required],
      course_monthly_fee: ['', Validators.required],
      course_admission_fee: [''],
      course_duration: ['', Validators.required],
      course_description: [''],
      course_date: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
      institute_id_fk: ['', Validators.required]
    })
    this.course_form.controls['course_date'].setValue(new Date().toISOString().slice(0, 10));
    this.course_form.controls['institute_id_fk'].setValue(this.inst_id);

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
            this.course_form.reset();
            this.matref.close();
            this.popup.success({ detail: 'Success', summary: 'Course Insert Successfully...', sticky: true, position: 'tr' })
            this.router.navigate(['/institutehome/course']);
          },
          (error: any) => {
            console.log(error)
            this.popup.error({ detail: 'Unsuccess', summary: 'Course Not Insert..', sticky: true, position: 'tr' })
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
        this.popup.success({ detail: 'Success', summary: 'Course Update Successfully...', sticky: true, position: 'tr' })
        this.router.navigate(['institutehome/course']);
      },
      error: () => {
        this.popup.error({ detail: 'Unsuccess', summary: 'Course Not Update..', sticky: true, position: 'tr' })
      }
    })
  }
  total_clc() {
    this.course_form.controls['course_half_fee'].setValue((this.course_form.get('course_total_fee')?.value) / 2)
    this.course_form.controls['course_quarter_fee'].setValue((this.course_form.get('course_total_fee')?.value) / 4)
    this.course_form.controls['course_monthly_fee'].setValue((this.course_form.get('course_total_fee')?.value) / (this.course_form.get('course_duration')?.value))
  }
}