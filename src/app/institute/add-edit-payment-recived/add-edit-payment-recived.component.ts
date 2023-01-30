import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';


@Component({
  selector: 'app-add-edit-payment-recived',
  templateUrl: './add-edit-payment-recived.component.html',
  styleUrls: ['./add-edit-payment-recived.component.css']
})
export class AddEditPaymentRecivedComponent implements OnInit {
  disableSelect = new FormControl(false);
  payment_form!: FormGroup;
  admin = 1;
  upload: any;
  actionBtn: string = 'Add'
  student_data: any;
  course_data : any;
  student_single_data:any;
  data: any[] = [];

  constructor(
    private fb: FormBuilder,
    private service:ManageService,
    @Inject(MAT_DIALOG_DATA) public editenq: any,
  ) {  }

  ngOnInit(): void {
   
    console.log(this.get_student)
    this.service.get_student().subscribe(
      (std_res: any) => {
        this.student_data = std_res.data
        
      }
    )
    this.service.get_course().subscribe(
      (std_res: any) => {
        this.course_data = std_res.data
      }
    )
    this.payment_form = this.fb.group({
      std_id: [''],
      institute_id_fk: ['', Validators.required],
      student_id_fk: ['', Validators.required],
      std_father_name: ['', Validators.required],
      std_mobile: ['', Validators.required],
      std_aadhar: ['', Validators.required],
      course_total_fee: ['', Validators.required],
      course_half_fee: ['', Validators.required],
      course_quarter_fee: ['', Validators.required],
      course_monthly_fee: ['', Validators.required],
      course_admission_fee: ['', Validators.required],
      fee_type: ['', Validators.required],
      fee_monthly: ['', Validators.required],
      fee_mode: ['', Validators.required],
      fee_amount: ['', Validators.required],
      fee_desceiption: ['', Validators.required],
      fee_date: ['', Validators.required],
      batch_id_fk: ['', Validators.required],
      course_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })
    this.payment_form.controls['fee_date'].setValue(new Date().toISOString().slice(0, 10));
  }
  get_student(event:any){
    this.service.get_student().subscribe(
      (res: any) => {
        this.student_single_data = res.data
        this.payment_form.controls['std_id'].setValue(this.student_single_data.std_id);
        this.payment_form.controls['std_father_name'].setValue(this.student_single_data.std_father_name);
        this.payment_form.controls['std_mobile'].setValue(this.student_single_data.std_mobile);
       
        }
    )
  }
}