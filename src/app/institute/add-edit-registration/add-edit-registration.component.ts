import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-registration',
  templateUrl: './add-edit-registration.component.html',
  styleUrls: ['./add-edit-registration.component.css']
})
export class AddEditRegistrationComponent implements OnInit {
registration_form!: FormGroup;

  constructor(
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.registration_form = this.fb.group({
      admin_registration_date: ['', Validators.required],
    }
    )
    this.registration_form.controls['admin_registration_date'].setValue(new Date().toISOString().slice(0, 10));
  
  }

}
