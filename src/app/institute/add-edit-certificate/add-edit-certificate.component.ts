import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-certificate',
  templateUrl: './add-edit-certificate.component.html',
  styleUrls: ['./add-edit-certificate.component.css']
})
export class AddEditCertificateComponent implements OnInit {
  action_text: string = 'Registraction Form'
  certificate_count: string = "0"
  personal_form!: FormGroup
  permanet_form!: FormGroup
  registration_form!: FormGroup
  document_form!: FormGroup
  admin_id = 1;
  login_deatils: any;
  login: any;
  inst_id: any;
  inst_id_for_inst_login: any;
  autoselect = 'Male'
  editpermanent:any
  certificate_id='0'
  institute_id:any
  course_data:any
  constructor(
    private personal: FormBuilder,
    private permanet: FormBuilder,
    private registration:FormBuilder,
    private document:FormBuilder,
    private services: ManageService,
    private popup: NgToastService,
    private router:Router

  ) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.inst_id
    this.inst_id_for_inst_login = this.login.inst_id

    this.services.get_certificate().subscribe(
      (res:any)=>{
        console.log(res.data[0].certificate_id)
        this.certificate_id = res.data[0].certificate_id
      }
    )
  }

  ngOnInit(): void {
    const formdata = new FormData()
    formdata.append("inst_id", this.inst_id_for_inst_login)
    this.services.get_course_by_inst_id(formdata).subscribe(
      (std_res: any) => {
        this.course_data = std_res.data
      }
    )

    this.personal_form = this.personal.group({
      certificate_id: [''],
      std_name: ['', Validators.required],
      std_father_name: ['', Validators.required],
      std_mother_name: ['', Validators.required],
      std_dob: ['', Validators.required],
      std_contact_no: ['', Validators.required],
      std_alt_contect_no: ['', Validators.required],
      std_email: ['', Validators.required],
      std_aadhar_no: ['', Validators.required],
      std_category: ['', Validators.required],
      std_gender: ['', Validators.required],
      institute_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })

    this.permanet_form = this.permanet.group({
      certificate_id: [''],
      std_village: ['', Validators.required],
      std_post_office: ['', Validators.required],
      std_panchayat: ['', Validators.required],
      std_distric: ['', Validators.required],
      std_block: ['', Validators.required],
      std_pin_code: ['', Validators.required],
      std_area: ['', Validators.required],
      institute_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })
    this.registration_form = this.registration.group({
      certificate_id: [''],
      std_rigistration_no: ['', Validators.required],
      std_center_code: ['', Validators.required],
      std_certificate_no: ['', Validators.required],
      std_total_marks: ['', Validators.required],
      std_rigistration_date: ['', Validators.required],
      std_total_amount: ['', Validators.required],
      std_date_issue: ['', Validators.required],
      course_id_fk: ['', Validators.required],
      std_ref_name: ['', Validators.required],
      institute_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })
    this.document_form = this.document.group({
      certificate_id: [''],
      std_aadhar_card: ['', Validators.required],
      std_gen_certificate: ['', Validators.required],
      std_10th_marksheet: ['', Validators.required],
      std_residential: ['', Validators.required],
      std_image: ['', Validators.required],
      status: ['0'],
      institute_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })

    this.personal_form.controls['institute_id_fk'].setValue(this.login.inst_id);
    this.permanet_form.controls['institute_id_fk'].setValue(this.login.inst_id);
    this.registration_form.controls['institute_id_fk'].setValue(this.login.inst_id);
    this.document_form.controls['institute_id_fk'].setValue(this.login.inst_id);
    this.registration_form.controls['std_rigistration_date'].setValue(new Date().toISOString().slice(0, 10));
  }
  personal_add() {
    const personaldata = new FormData();
    personaldata.append('certificate_id', this.personal_form.get('certificate_id')?.value);
    personaldata.append('std_name', this.personal_form.get('std_name')?.value);
    personaldata.append('std_father_name', this.personal_form.get('std_father_name')?.value);
    personaldata.append('std_mother_name', this.personal_form.get('std_mother_name')?.value);
    personaldata.append('std_dob', this.personal_form.get('std_dob')?.value);
    personaldata.append('std_contact_no', this.personal_form.get('std_contact_no')?.value);
    personaldata.append('std_alt_contect_no', this.personal_form.get('std_alt_contect_no')?.value);
    personaldata.append('std_email', this.personal_form.get('std_email')?.value);
    personaldata.append('std_aadhar_no', this.personal_form.get('std_aadhar_no')?.value);
    personaldata.append('std_category', this.personal_form.get('std_category')?.value);
    personaldata.append('std_gender', this.personal_form.get('std_gender')?.value);
    personaldata.append('institute_id_fk', this.inst_id_for_inst_login);
    personaldata.append('admin_id_fk', this.personal_form.get('admin_id_fk')?.value);
    this.services.post_certificate_personal(personaldata).subscribe(
      (res: any) => {
        console.log(res)
        this.popup.success({ detail: 'Success', summary: 'Personal Data Add' })
        this.router.navigate(['//institutehome/add_edit_certificate'])
      },
      (error: any) => {
        console.log(error)
        this.popup.error({ detail: 'Fail', summary: 'Personal Data Fail' })
      }
    )
}
  permanent_update(){
    console.log(this.permanet_form.value)
    const permanetdata = new FormData();
    permanetdata.append('certificate_id', this.certificate_id);
    permanetdata.append('std_village', this.permanet_form.get('std_village')?.value);
    permanetdata.append('std_post_office', this.permanet_form.get('std_post_office')?.value);
    permanetdata.append('std_panchayat', this.permanet_form.get('std_panchayat')?.value);
    permanetdata.append('std_distric', this.permanet_form.get('std_distric')?.value);
    permanetdata.append('std_block', this.permanet_form.get('std_block')?.value);
    permanetdata.append('std_pin_code', this.permanet_form.get('std_pin_code')?.value);
    permanetdata.append('std_area', this.permanet_form.get('std_area')?.value);
    permanetdata.append('institute_id_fk', this.inst_id_for_inst_login);
    permanetdata.append('admin_id_fk', this.permanet_form.get('admin_id_fk')?.value);
    this.services.put_certificate_permanent(permanetdata).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.popup.success({detail: 'Success', summary: 'Permanet Data Add'})
      },
      error:(error:any)=>{
        console.log(error)
        this.popup.error({ detail: 'Fail', summary: 'Permanet Data Fail' })
      }
    })
  }

  registration_update(){
    console.log(this.registration_form.value)
    const registrationdata = new FormData();
    registrationdata.append('certificate_id', this.certificate_id);
    registrationdata.append('std_rigistration_no', this.registration_form.get('std_rigistration_no')?.value);
    registrationdata.append('std_center_code', this.registration_form.get('std_center_code')?.value);
    registrationdata.append('std_certificate_no', this.registration_form.get('std_certificate_no')?.value);
    registrationdata.append('std_total_marks', this.registration_form.get('std_total_marks')?.value);
    registrationdata.append('std_rigistration_date', this.registration_form.get('std_rigistration_date')?.value);
    registrationdata.append('std_total_amount', this.registration_form.get('std_total_amount')?.value);
    registrationdata.append('std_date_issue', this.registration_form.get('std_date_issue')?.value);
    registrationdata.append('course_id_fk', this.registration_form.get('course_id_fk')?.value);
    registrationdata.append('std_ref_name', this.registration_form.get('std_ref_name')?.value);
    registrationdata.append('institute_id_fk', this.inst_id_for_inst_login);
    registrationdata.append('admin_id_fk', this.registration_form.get('admin_id_fk')?.value);
    this.services.put_certificate_registration(registrationdata).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.popup.success({detail: 'Success', summary: 'Registration Data Add'})
      },
      error:(error:any)=>{
        console.log(error)
        this.popup.error({ detail: 'Fail', summary: 'Registration Data Fail' })
      }
    })
  }
  document_submit(){
    console.log(this.document_form.value)
    const documentdata = new FormData();
    documentdata.append('certificate_id', this.certificate_id);
    documentdata.append('std_aadhar_card', this.document_form.get('std_aadhar_card')?.value);
    documentdata.append('std_gen_certificate', this.document_form.get('std_gen_certificate')?.value);
    documentdata.append('std_10th_marksheet', this.document_form.get('std_10th_marksheet')?.value);
    documentdata.append('std_residential', this.document_form.get('std_residential')?.value);
    documentdata.append('std_image', this.document_form.get('std_image')?.value);
    documentdata.append('status', this.document_form.get('status')?.value);
    documentdata.append('institute_id_fk', this.inst_id_for_inst_login);
    documentdata.append('admin_id_fk', this.document_form.get('admin_id_fk')?.value);
    this.services.put_certificate_document(documentdata).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.popup.success({detail: 'Success', summary: 'Registration Data Add'})
      },
      error:(error:any)=>{
        console.log(error)
        this.popup.error({ detail: 'Fail', summary: 'Registration Data Fail' })
      }
    })
  }

  aadharupload(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.document_form.get('std_aadhar_card')?.setValue(file)
    }
  }
  genupload(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.document_form.get('std_gen_certificate')?.setValue(file)
    }
  }
  markesupload(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.document_form.get('std_10th_marksheet')?.setValue(file)
    }
  }
  redsidentalupload(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.document_form.get('std_residential')?.setValue(file)
    }
  }
  imageupload(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.document_form.get('std_image')?.setValue(file)
    }
  }
}