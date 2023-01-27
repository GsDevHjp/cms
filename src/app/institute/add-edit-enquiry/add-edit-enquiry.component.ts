import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  course_data:any;

  constructor(
    private fb: FormBuilder,
    private matref: MatDialogRef<AddEditEnquiryComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_enq: any
  ) { }

  ngOnInit(): void {
    this.enquiry_form = this.fb.group({
      enq_id: [''],
      enq_name: ['', Validators.required],
      enq_father_name: [''],
      enq_mobile: ['', Validators.required],
      course_id: ['', Validators.required],
      enq_date: [''],
      gender: ['', Validators.required],
      enq_address: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })
    this.enquiry_form.controls['enq_date'].setValue(new Date().toISOString().slice(0, 10));
    if(this.edit_enq){
      this.actionBtn='update'
      this.enquiry_form.controls[ 'enq_id'].setValue(this.edit_enq.enq_id)
      this.enquiry_form.controls[ 'enq_name'].setValue(this.edit_enq.enq_name)
      this.enquiry_form.controls[ 'enq_father_name'].setValue(this.edit_enq.enq_father_name)
      this.enquiry_form.controls[ 'enq_mobile'].setValue(this.edit_enq.enq_mobile)
      this.enquiry_form.controls[ 'course_id'].setValue(this.edit_enq.course_id)
      this.enquiry_form.controls[ 'gender'].setValue(this.edit_enq.gender)
      this.enquiry_form.controls[ 'enq_address'].setValue(this.edit_enq.enq_address)
      this.enquiry_form.controls[ 'admin_id_fk'].setValue(this.edit_enq.admin_id_fk)
    }
  }
}