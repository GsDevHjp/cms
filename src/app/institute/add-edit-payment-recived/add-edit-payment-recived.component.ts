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
  enquiry_form!: FormGroup;
  admin = 1;
  upload: any;
  actionBtn: string = 'Add'

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public editenq: any,

  ) {  }

  ngOnInit(): void {
    this.enquiry_form = this.fb.group({
      enq_id: [''],
      std_name: ['', Validators.required],
      father_name: ['', Validators.required],
      mobile: ['', Validators.required],
      course: ['', Validators.required],
      enq_date: ['', Validators.required],
      // gender: ['', Validators.required],
      address: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })

  }
}