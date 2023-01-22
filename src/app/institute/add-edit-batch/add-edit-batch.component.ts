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
  actionBtn: string = 'Submit'


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
      batch_select: ['', Validators.required],
      start_batch: ['', Validators.required],
      batch_date: ['', Validators.required],
      batch_form: ['', Validators.required],
      batch_to: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })
    this.batch_form.controls['batch_date'].setValue(new Date().toISOString().slice(0, 10));

    /////////////////////////////////////////////////// For The Edit Course Data ////////////////////////////////////////////////////////////////

    if (this.edit_batch) {
      this.actionBtn = "Update";
      this.batch_form.controls['batch_id'].setValue(this.edit_batch.batch_id);
      this.batch_form.controls['batch_name'].setValue(this.edit_batch.batch_name);
      this.batch_form.controls['batch_select'].setValue(this.edit_batch.batch_select);
      this.batch_form.controls['start_batch'].setValue(this.edit_batch.start_batch);
      this.batch_form.controls['batch_date'].setValue(this.edit_batch.batch_date);
      this.batch_form.controls['batch_form'].setValue(this.edit_batch.batch_form);
      this.batch_form.controls['batch_to'].setValue(this.edit_batch.batch_to);
      this.batch_form.controls['admin_id_fk'].setValue(this.edit_batch.admin_id_fk);
    }
  }
  batch_btn() {

  }
}