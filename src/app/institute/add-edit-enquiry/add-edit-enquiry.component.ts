import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-enquiry',
  templateUrl: './add-edit-enquiry.component.html',
  styleUrls: ['./add-edit-enquiry.component.css']
})
export class AddEditEnquiryComponent implements OnInit {
  disableSelect = new FormControl(false);
  enquiry_form!: FormGroup;
  admin = 1;
  upload: any;
  actionBtn: string = 'Add'

  constructor(
    private fb: FormBuilder,
  ) {
    
  }

  ngOnInit(): void {
    this.enquiry_form = this.fb.group({
      enq_id: [''],
      enq_name: ['', Validators.required],
      enq_father_name: [''],
      enq_mobile: ['', Validators.required],
      enq_course: ['', Validators.required],
      enq_date: [''],
      gender: ['', Validators.required],
      enq_address: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })
    this.enquiry_form.controls['enq_date'].setValue(new Date().toISOString().slice(0, 10));

  }
}