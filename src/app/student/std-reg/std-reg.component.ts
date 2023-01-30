import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-std-reg',
  templateUrl: './std-reg.component.html',
  styleUrls: ['./std-reg.component.css']
})
export class StdRegComponent implements OnInit {
  hide = true;
  std_regist_from !: FormGroup
  admin = 1;
  constructor(
    private FormBuilder: FormBuilder,
    private manageservice: ManageService
  ) { }

  ngOnInit(): void {
    this.std_regist_from = this.FormBuilder.group({
      institute_id_fk: ['', Validators.required],
      std_name: ['', Validators.required],
      std_whatsapp_no: ['', Validators.required],
      std_email: ['', Validators.required],
      std_address: ['', Validators.required],
      std_password: ['', Validators.required],
      std_regist_date: [new Date().toISOString().slice(0, 10)],
      admin_id_fk: ['', Validators.required],
    })
  }
  std_regist() {
    console.log(this.std_regist_from.value)
    this.manageservice.std_self_reg(this.std_regist_from.value).subscribe(
      (result: any) => {
        console.log(result)
        alert("Registration Successfully..")
      },
      (error: any) => {
        console.log(error)
        alert("Unsuccessfull Registration")
      }
    )
  }
}
