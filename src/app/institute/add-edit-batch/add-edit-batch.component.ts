import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-add-edit-batch',
  templateUrl: './add-edit-batch.component.html',
  styleUrls: ['./add-edit-batch.component.css']
})
export class AddEditBatchComponent implements OnInit {
  disableSelect = new FormControl(false);
  batch_form!: FormGroup;
  admin = 1;
  upload: any;
  actionBtn: string = 'Add'
  course_data:any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private matref: MatDialogRef<AddEditBatchComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_batch: any
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  ngOnInit(): void {
    this.batch_form = this.fb.group({
      batch_id: [''],
      batch_name: ['', Validators.required],
      course_id: ['', Validators.required],
      batch_start: ['', Validators.required],
      batch_date: [''],
      batch_arrival: ['', Validators.required],
      batch_departure: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })
    this.batch_form.controls['batch_date'].setValue(new Date().toISOString().slice(0, 10));

    if (this.edit_batch) {
      this.actionBtn = "Update";
      this.batch_form.controls['batch_id'].setValue(this.edit_batch.batch_id);
      this.batch_form.controls['batch_name'].setValue(this.edit_batch.batch_name);
      this.batch_form.controls['course_id'].setValue(this.edit_batch.course_id);
      this.batch_form.controls['batch_start'].setValue(this.edit_batch.batch_start);
      this.batch_form.controls['batch_date'].setValue(this.edit_batch.batch_date);
      this.batch_form.controls['batch_arrival'].setValue(this.edit_batch.batch_arrival);
      this.batch_form.controls['batch_departure'].setValue(this.edit_batch.batch_departure);
      this.batch_form.controls['admin_id_fk'].setValue(this.edit_batch.admin_id_fk);
    }
  }
  batch_btn() {

  }
}