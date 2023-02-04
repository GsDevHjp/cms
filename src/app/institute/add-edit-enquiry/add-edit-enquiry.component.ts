import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';

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
  enquiry_heading: string ='Add Enquiry'
  course_data: any;

  constructor(
    private fb: FormBuilder,
    private service: ManageService,
    private matref: MatDialogRef<AddEditEnquiryComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_enq: any
  ) { }

  ngOnInit(): void {
    this.service.get_course().subscribe(
      (std_res: any) => {
        this.course_data = std_res.data
      }
    )

    this.enquiry_form = this.fb.group({
      enq_id: [''],
      enq_name: ['', Validators.required],
      enq_father_name: [''],
      enq_mobile: ['', Validators.required],
      course_id_fk: ['', Validators.required],
      enq_date: [''],
      enq_gender: ['', Validators.required],
      enq_address: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })
    this.enquiry_form.controls['enq_date'].setValue(new Date().toISOString().slice(0, 10));
    if (this.edit_enq) {
      this.actionBtn = 'update'
      this.enquiry_heading = 'Update Enquiry'
      this.enquiry_form.controls['enq_id'].setValue(this.edit_enq.enq_id)
      this.enquiry_form.controls['enq_name'].setValue(this.edit_enq.enq_name)
      this.enquiry_form.controls['enq_father_name'].setValue(this.edit_enq.enq_father_name)
      this.enquiry_form.controls['enq_mobile'].setValue(this.edit_enq.enq_mobile)
      this.enquiry_form.controls['enq_gender'].setValue(this.edit_enq.enq_gender)
      this.enquiry_form.controls['enq_address'].setValue(this.edit_enq.enq_address)
      this.enquiry_form.controls['course_id_fk'].setValue(this.edit_enq.course_id_fk)
      this.enquiry_form.controls['admin_id_fk'].setValue(this.edit_enq.admin_id_fk)
    }
  }
  enquiry_btn() {
    console.log(this.enquiry_form.value)
    if (!this.edit_enq) {
      if (this.enquiry_form.valid) {
        this.service.post_enquiry(this.enquiry_form.value).subscribe(
          (res: any) => {
            console.log(res)
            this.matref.close();
            alert('form successfully...')
          },
          (error) => {
            console.log(error)
            alert('data not insert')
          }
        )
      }
    }
    else {
      this.enquiryUpdate()
    }
  }
  enquiryUpdate() {
    this.service.put_enquiry(this.enquiry_form.value).subscribe({
      next: (res) => {
        console.log(res)
        this.matref.close()
        alert('update successfully')
      },
      error: (error) => {
        console.log(error)
        alert('data not update')
      }
    })
  }
}