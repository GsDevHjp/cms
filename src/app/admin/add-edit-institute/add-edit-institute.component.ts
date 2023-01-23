import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-add-edit-institute',
  templateUrl: './add-edit-institute.component.html',
  styleUrls: ['./add-edit-institute.component.css']
})
export class AddEditInstituteComponent implements OnInit {
  admin = 1;
  InstForm !: FormGroup;
  hide = true;
  constructor(
    private FromBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.InstForm = this.FromBuilder.group({
      institute_name: ['', Validators.required],
      institute_owner: ['', Validators.required],
      institute_whatsapp: ['', Validators.required],
      institute_email: ['', Validators.required],
      institute_password: ['', Validators.required],
      institute_country: [''],
      institute_state: [''],
      institute_distt: [''],
      institute_address: [''],
      institute_account_number: [''],
      account_ifsc_number: [''],
      account_holder_name: [''],
      institute_photo: [''],
      account_gst_number:[''],
      institute_document:[''],
      document_number:[''],
      document_photo:[''],
    })

  }


  addInst() {

  }

  OnUpload(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.InstForm.get('institute_photo')?.setValue(file)
    }
  }




}
