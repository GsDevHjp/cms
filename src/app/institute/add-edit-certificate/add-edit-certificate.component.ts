import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-certificate',
  templateUrl: './add-edit-certificate.component.html',
  styleUrls: ['./add-edit-certificate.component.css']
})
export class AddEditCertificateComponent implements OnInit {
  action_text: string = 'Registraction Form'
  certificate_count: string = "0"
  personal_form!: FormGroup

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
   

    this.personal_form = this.fb.group({
      batch_id: [''],
      std_name: ['', Validators.required],
      std_father_name: ['', Validators.required],
      std_dob: ['', Validators.required],
      std_contact_no: ['', Validators.required],
      std_alt_contect_no: ['', Validators.required],
      std_email: [''],
      std_aadhar_no: ['', Validators.required],
      std_category: ['', Validators.required],
      std_gender: ['', Validators.required],
      institute_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })
  }
  personal_next(){
    console.log(this.personal_form.value)
  }
}