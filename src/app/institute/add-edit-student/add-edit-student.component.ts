import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-add-edit-student',
  templateUrl: './add-edit-student.component.html',
  styleUrls: ['./add-edit-student.component.css']
})

export class AddEditStudentComponent implements OnInit {
  student_form!: FormGroup;
  upload: any;
  ActionBtn: string = 'Add'
  heading_act: string = 'Add Student'
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private matref: MatDialogRef<AddEditStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_std: any,

  ) {  }
  ngOnInit(): void {
    this.student_form = this.fb.group({
      std_id: [''],
      std_name: ['', Validators.required],
      father_name: ['', Validators.required],
      father_occupation: ['', Validators.required],
      mobile: ['', Validators.required],
      std_aadhar_no: ['', Validators.required],
      std_email: ['', Validators.required],
      std_dob: ['', Validators.required],
      gender: ['', Validators.required],
      std_state: ['', Validators.required],
      std_district: ['', Validators.required],
      enq_date: ['', Validators.required],
      std_image: ['', Validators.required],
      address: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })
    this.student_form.controls['enq_date'].setValue(new Date().toISOString().slice(0, 10));
  }
}