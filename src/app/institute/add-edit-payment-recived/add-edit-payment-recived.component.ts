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
  fee_form!: FormGroup;
  admin = 1;
  upload: any;
  actionBtn: string = 'Add'
  student_data: any;
  course_data : any;
  batch_data:any;
  student_single_data:any;
  course_single_data:any;
  imgUrl:string = 'http://localhost/cms/src/assets/user.png';
  constructor(
    private fb: FormBuilder,
    private service:ManageService,
    private matref: MatDialogRef<AddEditPaymentRecivedComponent>,
    @Inject(MAT_DIALOG_DATA) public editenq: any,
  ) {  }

  ngOnInit(): void {
       this.service.get_student().subscribe(
      (std_res: any) => {
        this.student_data = std_res.data
      }
    )
    this.service.get_course().subscribe(
      (batch_res: any) => {
        this.course_data = batch_res.data
      }
    )
    this.service.get_batch().subscribe(
      (batch_res: any) => {
        this.batch_data = batch_res.data
      }
    )
    this.fee_form = this.fb.group({
      std_id:['',],
      student_id_fk: ['', Validators.required],
      std_father_name: [''],
      std_mobile: [''],
      std_address: [''],
      course_id_fk: ['', Validators.required],
      course_total_fee: [''],
      course_half_fee: [''],
      course_quarter_fee: [''],
      course_monthly_fee: [''],
      course_admission_fee: [''],
      fee_type: ['', Validators.required],
      fee_monthly: ['', Validators.required],
      fee_mode: ['', Validators.required],
      fee_amount: ['', Validators.required],
      fee_description: ['', Validators.required],
      fee_date: ['', Validators.required],
      std_img: [''],
      batch_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })
    this.fee_form.controls['fee_date'].setValue(new Date().toISOString().slice(0, 10));
  }
  get_student_single_data(event:any){
    const formdata = new FormData();
    formdata.append('std_id', event)
    this.service.get_student_by_std_id(formdata).subscribe(
      (res: any) => {
        console.log(res.data)
        this.student_single_data = res.data
        this.fee_form.controls['std_id'].setValue(this.student_single_data.std_id);
        this.fee_form.controls['std_father_name'].setValue(this.student_single_data.std_father_name);
        this.fee_form.controls['std_mobile'].setValue(this.student_single_data.std_mobile);
        this.fee_form.controls['std_address'].setValue(this.student_single_data.std_address);
        this.fee_form.controls['std_img'].setValue(this.student_single_data.std_img);
        this.imgUrl = 'assets/'+ this.student_single_data.std_img;
        
      }
    )
}
get_course_single_data(event:any){
    const coursedata = new FormData();
    coursedata.append('course_id', event)
    this.service.get_course_by_course_id(coursedata).subscribe(
      (res: any) => {
        console.log(res.data)
        this.course_single_data = res.data
        this.fee_form.controls['batch_id_fk'].setValue(this.course_single_data.batch_id_fk);
        this.fee_form.controls['course_total_fee'].setValue(this.course_single_data.course_total_fee);
        this.fee_form.controls['course_half_fee'].setValue(this.course_single_data.course_half_fee);
        this.fee_form.controls['course_quarter_fee'].setValue(this.course_single_data.course_quarter_fee);
        this.fee_form.controls['course_monthly_fee'].setValue(this.course_single_data.course_monthly_fee);
        this.fee_form.controls['course_admission_fee'].setValue(this.course_single_data.course_admission_fee);
      }
    )
}
fee_btn(){
  console.log(this.fee_form.value)
  const formadd = new FormData();
  formadd.append('student_id_fk', this.fee_form.get('student_id_fk')?.value)
  formadd.append('course_id_fk', this.fee_form.get('course_id_fk')?.value)
  formadd.append('fee_type', this.fee_form.get('fee_type')?.value)
  formadd.append('fee_monthly', this.fee_form.get('fee_monthly')?.value)
  formadd.append('fee_mode', this.fee_form.get('fee_mode')?.value)
  formadd.append('fee_amount', this.fee_form.get('fee_amount')?.value)
  formadd.append('fee_description', this.fee_form.get('fee_description')?.value)
  formadd.append('fee_date', this.fee_form.get('fee_date')?.value)
  formadd.append('batch_id_fk', this.fee_form.get('batch_id_fk')?.value)
  formadd.append('admin_id_fk', this.fee_form.get('admin_id_fk')?.value)
  if(this.fee_form.valid){
  this.service.post_fee(formadd).subscribe(
    (res:any)=>{
      console.log(res)
      this.matref.close();
      alert('form successfully...')
    },
    
    (error:any)=>{
      console.log(error)
      alert('data not insert')
    }
  )
}
else{
  alert('please fill up the form')
}
}
}