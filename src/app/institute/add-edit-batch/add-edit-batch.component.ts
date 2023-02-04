import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, } from '@angular/router';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-add-edit-batch',
  templateUrl: './add-edit-batch.component.html',
  styleUrls: ['./add-edit-batch.component.css']
})
export class AddEditBatchComponent implements OnInit {
  disableSelect = new FormControl(false);
  batch_form!: FormGroup;
  admin = 1;
  institute_id = 5;
  upload: any;
  actionBtn: string = 'Add'
  batch_heading: string = 'Add Batch'
  course_data: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ManageService,
    private matref: MatDialogRef<AddEditBatchComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_batch: any
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  ngOnInit(): void {
    this.service.get_course().subscribe(
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
      batch_description: ['', Validators.required],
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
      this.updateBatch()
    }
  }

  updateBatch() {
    this.service.put_batch(this.batch_form.value).subscribe({
      next: (res) => {
        console.log(res)
        this.matref.close();
        alert('data update successfully')

      },
      error: (error) => {
        console.log(error)
        alert('data not update')
      }

    })
  }
}