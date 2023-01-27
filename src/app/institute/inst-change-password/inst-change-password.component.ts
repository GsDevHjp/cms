import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-inst-change-password',
  templateUrl: './inst-change-password.component.html',
  styleUrls: ['./inst-change-password.component.css']
})
export class InstChangePasswordComponent implements OnInit {
  disableSelect = new FormControl(false);
  batch_form!: FormGroup;
  admin = 1;
  upload: any;
  actionBtn: string = 'Add'


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private matref: MatDialogRef<InstChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_batch: any
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  ngOnInit(): void {
    this.batch_form = this.fb.group({
      quiz_question: ['', Validators.required],
      quiz_option_a: ['', Validators.required],
      quiz_option_b: ['', Validators.required],
      quiz_option_c: ['', Validators.required],
      quiz_option_d: ['', Validators.required],
      quiz_answer: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })

    if (this.edit_batch) {
      this.actionBtn = "Update";
      this.batch_form.controls['quiz_question'].setValue(this.edit_batch.quiz_question);
      this.batch_form.controls['quiz_option_a'].setValue(this.edit_batch.quiz_option_a);
      this.batch_form.controls['quiz_option_b'].setValue(this.edit_batch.quiz_option_b);
      this.batch_form.controls['quiz_option_c'].setValue(this.edit_batch.quiz_option_c);
      this.batch_form.controls['quiz_option_d'].setValue(this.edit_batch.quiz_option_d);
      this.batch_form.controls['quiz_answer'].setValue(this.edit_batch.quiz_answer);
      this.batch_form.controls['admin_id_fk'].setValue(this.edit_batch.admin_id_fk);
    }
  }
  batch_btn() {

  }
}