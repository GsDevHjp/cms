import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    private matref: MatDialogRef<AddEditStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_std: any

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

    if (this.edit_std) {
      this.ActionBtn = "Update";
      this.student_form.controls['std_id'].setValue(this.edit_std.std_id);
      this.student_form.controls['std_name'].setValue(this.edit_std.std_name);
      this.student_form.controls['std_father_occupation'].setValue(this.edit_std.std_father_occupation);
      this.student_form.controls['std_mobile'].setValue(this.edit_std.std_mobile);
      this.student_form.controls['std_aadhar_no'].setValue(this.edit_std.std_aadhar_no);
      this.student_form.controls['std_email'].setValue(this.edit_std.std_email);
      this.student_form.controls['std_dob'].setValue(this.edit_std.std_dob);
      this.student_form.controls['gender'].setValue(this.edit_std.gender);
      this.student_form.controls['std_state'].setValue(this.edit_std.std_state);
      this.student_form.controls['std_district'].setValue(this.edit_std.std_district);
      this.student_form.controls['std_image'].setValue(this.edit_std.std_image);
      this.student_form.controls['std_address'].setValue(this.edit_std.std_address);
      this.student_form.controls['admin_id_fk'].setValue(this.edit_std.admin_id_fk);
    }
  }
}