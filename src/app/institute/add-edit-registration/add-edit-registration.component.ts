import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-add-edit-registration',
  templateUrl: './add-edit-registration.component.html',
  styleUrls: ['./add-edit-registration.component.css']
})
export class AddEditRegistrationComponent implements OnInit {
  inst_regist_from!: FormGroup;
  admin = 1;
  hide = true;
  constructor(
    private FormBuilder: FormBuilder,
    private manageservice: ManageService
  ) { }

  ngOnInit(): void {
    this.inst_regist_from = this.FormBuilder.group({
      inst_name: ['', Validators.required],
      inst_owner_name: ['', Validators.required],
      inst_whatsapp_no: ['', Validators.required],
      inst_email: ['', Validators.required],
      inst_password: ['', Validators.required],
      inst_address: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
      inst_regist_date: [new Date().toISOString().slice(0, 10)],
    })
  }

  inst_regist() {
    console.log(this.inst_regist_from.value)
    this.manageservice.inst_self_reg(this.inst_regist_from.value).subscribe(
      (result: any) => {
        console.log(result)
        alert("Registration Successfully..")
      }
      
    )
  }
  form_reset(){
    this.inst_regist_from.reset()
  }
}



