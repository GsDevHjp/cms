import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-receivedform',
  templateUrl: './receivedform.component.html',
  styleUrls: ['./receivedform.component.css']
})
export class ReceivedformComponent implements OnInit {
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
      institute_date: ['', Validators.required],
      institute_dues: ['', Validators.required],
      institute_payment: ['', Validators.required],
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
