import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router,   } from '@angular/router';

@Component({
  selector: 'app-add-edit-payment-recived',
  templateUrl: './add-edit-payment-recived.component.html',
  styleUrls: ['./add-edit-payment-recived.component.css']
})
export class AddEditPaymentRecivedComponent implements OnInit {
  disableSelect = new FormControl(false);
  payment_form!: FormGroup;
  admin = 1;
  upload: any;
  actionBtn: string = 'Add'
  student_data: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public editenq: any,
  ) {  }

  ngOnInit(): void {
    this.payment_form = this.fb.group({
      std_id: [''],
      std_name: ['', Validators.required],
      std_mobile: ['', Validators.required],
      std_address: ['', Validators.required],
      course_id: ['', Validators.required],
      batch_id: ['', Validators.required],
      payment_amount: ['', Validators.required],
      payment_month: ['', Validators.required],
      payment_date: ['', Validators.required],
      payment_description: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })
    this.payment_form.controls['payment_date'].setValue(new Date().toISOString().slice(0, 10));
  }
}