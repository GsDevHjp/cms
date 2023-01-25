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

  ) { }
  ngOnInit(): void {
    this.student_form = this.fb.group({
      std_id: [''],
      std_name: ['', Validators.required],
      std_father_name: [''],
      std_father_occupation: [''],
      std_mobile: ['', Validators.required],
      std_aadhar_no: [''],
      std_email: [''],
      std_dob: [''],
      gender: ['', Validators.required],
      std_state: [''],
      std_district: [''],
      std_date: [''],
      std_image: [''],
      std_address: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })
    this.student_form.controls['std_date'].setValue(new Date().toISOString().slice(0, 10));
  }
}