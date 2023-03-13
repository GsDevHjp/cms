import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, } from '@angular/router';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-edit-batch',
  templateUrl: './add-edit-batch.component.html',
  styleUrls: ['./add-edit-batch.component.css']
})
export class AddEditBatchComponent implements OnInit {
  disableSelect = new FormControl(false);
  batch_form!: FormGroup;
  admin = 1;
  institute_id: any;
  upload: any;
  actionBtn: string = 'Add'
  batch_heading: string = 'Add Batch'
  course_data: any;
  login_deatils: any;
  login: any
  autoselect = "Yet to start"
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private service: ManageService,
    private matref: MatDialogRef<AddEditBatchComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_batch: any
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.institute_id = this.login.inst_id
  }
  ngOnInit(): void {
    const formdata = new FormData()
    formdata.append("inst_id", this.institute_id)
    this.service.get_course_by_inst_id(formdata).subscribe(
      (std_res: any) => {
        this.course_data = std_res.data
      }
    )

    this.batch_form = this.fb.group({
      batch_id: [''],
      batch_name: ['', Validators.required],
      batch_status: ['', Validators.required],
      batch_date: ['', Validators.required],
      batch_arrival: ['', Validators.required],
      batch_departure: ['', Validators.required],
      batch_description: [''],
      course_id_fk: ['', Validators.required],
      institute_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })
    this.batch_form.controls['batch_date'].setValue(new Date().toISOString().slice(0, 10));

    if (this.edit_batch) {
      this.actionBtn = "Update";
      this.batch_heading = "Update Batch"
      this.batch_form.controls['batch_id'].setValue(this.edit_batch.batch_id);
      this.batch_form.controls['batch_name'].setValue(this.edit_batch.batch_name);
      this.batch_form.controls['batch_status'].setValue(this.edit_batch.batch_status);
      this.batch_form.controls['batch_arrival'].setValue(this.edit_batch.batch_arrival);
      this.batch_form.controls['batch_departure'].setValue(this.edit_batch.batch_departure);
      this.batch_form.controls['batch_description'].setValue(this.edit_batch.batch_description);
      this.batch_form.controls['course_id_fk'].setValue(this.edit_batch.course_id_fk);
      this.batch_form.controls['institute_id_fk'].setValue(this.edit_batch.institute_id_fk);
      this.batch_form.controls['admin_id_fk'].setValue(this.edit_batch.admin_id_fk);
    }
  }
  batch_btn() {
    console.log(this.batch_form.value)
    if (!this.edit_batch) {
      if (this.batch_form.valid) {
        this.service.post_batch(this.batch_form.value).subscribe(
          (res: any) => {
            console.log(res)
            this.matref.close();
            this.router.navigate(['/institutehome/batch']);
            this.popup.success({ detail: 'Success', summary: 'Batch Insert Saved', })
          },
          (error: any) => {
            console.log(error)
            this.popup.error({ detail: 'Unsuccess', summary: 'Batch Not Saved', })
          }
        )
      }
    }
    else {
      this.updateBatch()
    }
  }

  updateBatch() {
    this.service.put_batch(this.batch_form.value).subscribe({
      next: (res) => {
        console.log(res)
        this.matref.close();
        this.router.navigate(['/institutehome/batch']);
        this.popup.success({ detail: 'Success', summary: 'Batch Updated', })
      },
      error: (error) => {
        console.log(error)
        this.popup.error({ detail: 'Unsuccess', summary: 'Batch Not Updated', })
      }
    })
  }
  batch_data_reset() {
    this.batch_form.controls['batch_name'].reset()
    this.batch_form.controls['batch_status'].reset()
    this.batch_form.controls['batch_date'].reset()
    this.batch_form.controls['batch_arrival'].reset()
    this.batch_form.controls['batch_departure'].reset()
    this.batch_form.controls['batch_description'].reset()
    this.batch_form.controls['course_id_fk'].reset()
  }
}
