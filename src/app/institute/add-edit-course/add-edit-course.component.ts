import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  actionBtn: string = 'Add'

  constructor(
    private fb: FormBuilder,
    private matref: MatDialogRef<AddEditCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_course: any
  ) {
    
  }

  ngOnInit(): void {
    this.course_form = this.fb.group({
      course_id: [''],
      course_name: ['', Validators.required],
      course_fee_half: [''],
      course_fee: ['', Validators.required],
      course_monthly: ['', Validators.required],
      course_duration: ['', Validators.required],
      course_date: [''],
      course_total_fee: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })
    this.course_form.controls['course_date'].setValue(new Date().toISOString().slice(0, 10));

  }
}