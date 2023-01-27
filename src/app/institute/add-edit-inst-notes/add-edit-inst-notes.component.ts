import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-add-edit-inst-notes',
  templateUrl: './add-edit-inst-notes.component.html',
  styleUrls: ['./add-edit-inst-notes.component.css']
})
export class AddEditInstNotesComponent implements OnInit {

  disableSelect = new FormControl(false);
  batch_form!: FormGroup;
  admin = 1;
  upload: any;
  actionBtn: string = 'Add'
  course_data:any


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private matref: MatDialogRef<AddEditInstNotesComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_batch: any
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  ngOnInit(): void {
    this.batch_form = this.fb.group({
      course_id: ['', Validators.required],
      book_title: ['', Validators.required],
      book_image: ['', Validators.required],
      book_description: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })

    if (this.edit_batch) {
      this.actionBtn = "Update";
      this.batch_form.controls['course_id'].setValue(this.edit_batch.course_id);
      this.batch_form.controls['book_title'].setValue(this.edit_batch.book_title);
      this.batch_form.controls['book_image'].setValue(this.edit_batch.book_image);
      this.batch_form.controls['book_description'].setValue(this.edit_batch.book_description);
      this.batch_form.controls['admin_id_fk'].setValue(this.edit_batch.admin_id_fk);
    }
  }
  batch_btn() {

  }
}