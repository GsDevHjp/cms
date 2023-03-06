import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-edit-payment-recived',
  templateUrl: './add-edit-payment-recived.component.html',
  styleUrls: ['./add-edit-payment-recived.component.css']
})
export class AddEditPaymentRecivedComponent implements OnInit {
  toppings = new FormControl('');
  toppingList: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  disableSelect = new FormControl(false);
  fee_form!: FormGroup;
  admin = 1;
  upload: any;
  actionBtn: string = 'Add'
  fee_heading: string = 'Fee'
  student_data: any;
  course_data: any;
  batch_data: any;
  student_single_data: any;
  course_single_data: any;
  monthly_act: boolean = true;
  setvalue: any;
  imgUrl: string = 'https://greensoft.net.in/gscms/assets/profile.png';
  login_deatils: any;
  login: any;
  inst_id: any;
  inst_id_for_inst_login: any;
  autoselect='Offline'
  action:boolean = false
  std_id:any
  roll_no:any
  batch_id:any
  dues_amount:any = 0

  constructor(
    private popup:NgToastService,
    private fb: FormBuilder,
    private service: ManageService,
    private router:Router,
    private matref: MatDialogRef<AddEditPaymentRecivedComponent>,
    @Inject(MAT_DIALOG_DATA) public regno: any,

  ) {
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.inst_id
    this.inst_id_for_inst_login = this.login.inst_id
  }

  ngOnInit(): void {
    this.fee_form = this.fb.group({
      std_reg: ['',],
      fee_id: ['',],
      student_id_fk: ['', Validators.required],
      std_father_name: [''],
      std_whatsapp_no: [''],
      std_address: [''],
      std_img: [''],
      course_id_fk: ['', Validators.required],
      course_total_fee: [''],
      course_half_fee: [''],
      course_quarter_fee: [''],
      course_monthly_fee: [''],
      course_admission_fee: [''],
      fee_type: ['', Validators.required],
      fee_monthly: [''],
      fee_mode: ['', Validators.required],
      fee_amount: ['', Validators.required],
      fee_description: [''],
      fee_date: ['', Validators.required],
      batch_id_fk: ['', Validators.required],
      institute_id_fk: [''],
      admin_id_fk: ['', Validators.required],
      roll_no: [''],
      net_amt: [''],
      dist_amt: ['' ],
      dues_amt: [''],
    }) 
    this.fee_form.controls['fee_date'].setValue(new Date().toISOString().slice(0, 10));
    if (this.regno) {
      this.fee_form.controls['std_reg'].setValue(this.regno);
      this.ongetstd(this.regno)
      this.get_dues(this.batch_id,this.regno)
      
    }
  }

  get_course_by_course_id(event: any) {
    const courseformdata = new FormData();
    courseformdata.append('course_id', event)
    this.service.get_course_by_course_id(courseformdata).subscribe(
      (res: any) => {
        this.course_single_data = res.data
        this.fee_form.controls['course_total_fee'].setValue(this.course_single_data.course_total_fee);
        this.fee_form.controls['course_half_fee'].setValue(this.course_single_data.course_half_fee);
        this.fee_form.controls['course_quarter_fee'].setValue(this.course_single_data.course_quarter_fee);
        this.fee_form.controls['course_monthly_fee'].setValue(this.course_single_data.course_monthly_fee);
        this.fee_form.controls['course_admission_fee'].setValue(this.course_single_data.course_admission_fee);
      }
    )
  }

  get_batch_data(event:any){
    
    this.get_dues(event, this.fee_form.get('std_reg')?.value)
  }

  get_dues(batch_id:any , reg_no:any){
    const formdata =  new FormData()
    formdata.append('batch_id', batch_id)
    formdata.append('reg_no', reg_no)
    this.service.get_dues_by_reg_no(formdata).subscribe(
     (res:any)=>{
       this.fee_form.controls['dues_amt'].setValue(res.data[0].dues_amount);
        this.dues_amount = res.data[0].dues_amount
     }
    )
  }
  fee_btn() {
    const formadd = new FormData();
    formadd.append('student_id_fk', this.std_id)
    formadd.append('course_id_fk', this.fee_form.get('course_id_fk')?.value)
    formadd.append('fee_type', this.fee_form.get('fee_type')?.value)
    formadd.append('fee_monthly', this.fee_form.get('fee_monthly')?.value)
    formadd.append('fee_mode', this.fee_form.get('fee_mode')?.value)
    formadd.append('fee_amount', this.fee_form.get('fee_amount')?.value)
    formadd.append('fee_description', this.fee_form.get('fee_description')?.value)
    formadd.append('fee_date', this.fee_form.get('fee_date')?.value)
    formadd.append('batch_id_fk', this.fee_form.get('batch_id_fk')?.value)
    formadd.append('institute_id_fk', this.inst_id)
    formadd.append('admin_id_fk', this.fee_form.get('admin_id_fk')?.value)
    formadd.append('roll_no', this.roll_no)
      if (this.fee_form.valid) {
        this.service.post_fee(formadd).subscribe(
          (res: any) => {
            this.matref.close();
            this.popup.success({ detail: 'Success', summary: 'Payment Saved',})
            this.router.navigate(['/institutehome/fee'])
          },
          (error: any) => {
            this.popup.error({ detail: 'Unsuccess', summary: 'Payment Not Saved',})
          }
        )
      }
  }
 
  select_fee_type(event: any) {
    this.get_dues( this.fee_form.get('batch_id_fk')?.value, this.fee_form.get('std_reg')?.value)


    if (event == "Monthly Fee") {
      this.monthly_act = false
    }
    else {
      this.monthly_act = true
    }
    if (event == "Admission Fee") {
      this.fee_form.controls['fee_amount'].setValue(this.fee_form.get('course_admission_fee')?.value);
      this.fee_form.controls['net_amt'].setValue(this.fee_form.get('course_admission_fee')?.value);
    }
    if (event == "Total Fee") {
      this.fee_form.controls['fee_amount'].setValue(this.fee_form.get('course_total_fee')?.value);
      this.fee_form.controls['net_amt'].setValue(this.fee_form.get('course_total_fee')?.value);
    }
    if (event == "Half Fee") {
      this.fee_form.controls['fee_amount'].setValue(this.fee_form.get('course_half_fee')?.value);
      this.fee_form.controls['net_amt'].setValue(this.fee_form.get('course_half_fee')?.value);
    }
    if (event == "Quarter Fee") {
      this.fee_form.controls['fee_amount'].setValue(this.fee_form.get('course_quarter_fee')?.value);
      this.fee_form.controls['fee_amount'].setValue(this.fee_form.get('course_quarter_fee')?.value);
    }
    this.fee_form.controls['dist_amt'].setValue(0)
  }

  call_std_reg(){
    this.ongetstd(this.fee_form.get('std_reg')?.value)
  }
  ongetstd(std_reg:any){
    const fromdata = new FormData()
    fromdata.append('std_reg',std_reg )
    this.service.get_std_by_reg_no(fromdata).subscribe(
      (res:any)=>{
        this.std_id = res.data[0].std_id
        this.batch_id = res.data[0].batch_id
        this.fee_form.controls['student_id_fk'].setValue(res.data[0].std_name);
        this.fee_form.controls['std_father_name'].setValue(res.data[0].std_father_name);
        this.fee_form.controls['std_whatsapp_no'].setValue(res.data[0].std_whatsapp_no);
        this.fee_form.controls['std_address'].setValue(res.data[0].std_address);
        this.fee_form.controls['course_id_fk'].setValue(res.data[0].course_id);
        this.fee_form.controls['course_total_fee'].setValue(res.data[0].course_total_fee);
        this.fee_form.controls['course_half_fee'].setValue(res.data[0].course_half_fee);
        this.fee_form.controls['course_quarter_fee'].setValue(res.data[0].course_quarter_fee);
        this.fee_form.controls['course_monthly_fee'].setValue(res.data[0].course_monthly_fee);
        this.fee_form.controls['course_admission_fee'].setValue(res.data[0].course_admission_fee);
        this.fee_form.controls['fee_amount'].setValue(res.data[0].fee_amount);
        this.fee_form.controls['std_img'].setValue(res.data[0].std_img);
        this.imgUrl = 'https://greensoft.net.in/gscms/assets/' + res.data[0].std_img;
        this.fee_form.controls['batch_id_fk'].setValue(res.data[0].batch_id);
        this.fee_form.controls['roll_no'].setValue(res.data[0].roll_no);

        // for course and batch 
        this.course_data = res.data
        this.batch_data = res.data


      }
    )
  }

  amount_calc(){
    this.fee_form.controls['net_amt'].setValue((this.fee_form.get('fee_amount')?.value - this.fee_form.get('dist_amt')?.value))
      const dues = Number(this.fee_form.get('fee_amount')?.value) + Number(this.fee_form.get('dist_amt')?.value)
    this.fee_form.controls['dues_amt'].setValue(this.dues_amount - dues )
 

  }   
}