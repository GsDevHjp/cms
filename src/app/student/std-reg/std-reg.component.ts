import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
  inst_data: any
  inst_id: any
  inst_name: any
  std_id: any
  std_regist_no: any
  current_date: any;
  letter: any
  std: number = 1
  std_data: any
  inst_id_for_regist: any
  constructor(
    private FormBuilder: FormBuilder,
    private manageservice: ManageService,
    private matref: MatDialogRef<StdRegComponent>,
  ) { }

  ngOnInit(): void {

    this.manageservice.institute_view().subscribe(
      (res: any) => {
        this.inst_data = res.data
      }
    )


    this.std_regist_from = this.FormBuilder.group({
      institute_id_fk: ['', Validators.required],
      std_name: ['', Validators.required],
      std_whatsapp_no: ['', Validators.required],
      std_email: ['', Validators.required],
      std_address: ['', Validators.required],
      std_password: ['', Validators.required],
      std_regist_no: [''],
      std_regist_date: [new Date().toISOString().slice(0, 10)],
      admin_id_fk: ['', Validators.required],
    })
  }

  regist_no_generate(event: any) {
    const stdfromdata = new FormData()
    stdfromdata.append("inst_id", event)
    this.manageservice.get_student_by_inst_id(stdfromdata).subscribe(
      (res: any) => {
        this.std_data = res.data
        console.log(this.std_data)
        if (res.success == 1) {
          this.std = res.data.length + 1
        }
      }
    )


    const formdata = new FormData()
    formdata.append('inst_id', event)
    this.manageservice.get_inst_by_inst_id(formdata).subscribe(
      (res: any) => {
        console.log(res.data.inst_name.charAt(0))
        this.std_regist_from.controls['std_regist_no'].setValue(res.data.inst_name.charAt(0) + formatDate(new Date(), 'yyyyMMdd', 'en') + this.std);

      }
    )

  }

  reset(){
    this.std_regist_from.reset()
  }

  std_regist() {
    console.log(this.std_regist_from.value)
    this.manageservice.std_self_reg(this.std_regist_from.value).subscribe(
      (result: any) => {
        console.log(result)
        this.matref.close()
        alert("Registration Successfully..")
      },
      (error: any) => {
        console.log(error)
        alert("Unsuccessfull Registration")
      }
    )
  }
}
