import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { Call } from '@angular/compiler';

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
  catselect = 'Select'
  autoselect = 'Male'
  editpermanent: any
  certificate_id: any = 0;
  institute_id: any
  course_data: any
 

  // for new docment  
  url:string = 'https://greensoft.net.in/gscms/assets/certificate/'
  aadhar_url:any = "assets/doc.png"
  aadhar_select:any

  certificate_url:any = "assets/pdf_icon.jpg"
  certificate_select:any

  markseet_url:any = "assets/doc.png"
  markseet_select:any

  image_url:any = "https://greensoft.net.in/gscms/assets/certificate/man.png"
  image_select:any

  constructor(
    private personal: FormBuilder,
    private permanet: FormBuilder,
    private registration: FormBuilder,
    private document: FormBuilder,
    private services: ManageService,
    private popup: NgToastService,
    private router: Router,
  ) {
    this.certificate_id = this.router.getCurrentNavigation()?.extras
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.inst_id

    
  }

  ngOnInit(): void {
    const formdata = new FormData()
    formdata.append("inst_id", this.inst_id)
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
      std_country: ['', Validators.required],
      std_state: ['', Validators.required],
      std_village: ['', Validators.required],
      std_post_office: ['', Validators.required],
      std_panchayat: ['', Validators.required],
      std_distric: ['', Validators.required],
      std_block: ['', Validators.required],
      std_pin_code: ['', Validators.required],
      std_area: ['', Validators.required],
      std_ps: ['', Validators.required],
      institute_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })
    this.registration_form = this.registration.group({
      certificate_id: [''],
      std_rigistration_no: ['', Validators.required],
      std_center_code: ['', Validators.required],
      std_center_name: ['', Validators.required],
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

    if (this.certificate_id > 0) {
      this.action_text = "Update";
      const certificateiddata = new FormData();
      certificateiddata.append('certificate_id', this.certificate_id);
      this.services.get_certificate_by_certificate_id(certificateiddata).subscribe({
        next: (res: any) => {
          this.personal_form.controls['certificate_id'].setValue(res.data[0].certificate_id);
          this.personal_form.controls['std_name'].setValue(res.data[0].std_name);
          this.personal_form.controls['std_father_name'].setValue(res.data[0].std_father_name);
          this.personal_form.controls['std_mother_name'].setValue(res.data[0].std_mother_name);
          this.personal_form.controls['std_dob'].setValue(res.data[0].std_dob);
          this.personal_form.controls['std_contact_no'].setValue(res.data[0].std_contact_no);
          this.personal_form.controls['std_alt_contect_no'].setValue(res.data[0].std_alt_contect_no);
          this.personal_form.controls['std_email'].setValue(res.data[0].std_email);
          this.personal_form.controls['std_aadhar_no'].setValue(res.data[0].std_aadhar_no);
          this.personal_form.controls['std_category'].setValue(res.data[0].std_category);
          this.personal_form.controls['std_gender'].setValue(res.data[0].std_gender);
          this.permanet_form.controls['std_country'].setValue(res.data[0].std_country);
          this.permanet_form.controls['std_state'].setValue(res.data[0].std_state);
          this.permanet_form.controls['std_village'].setValue(res.data[0].std_village);
          this.permanet_form.controls['std_post_office'].setValue(res.data[0].std_post_office);
          this.permanet_form.controls['std_panchayat'].setValue(res.data[0].std_panchayat);
          this.permanet_form.controls['std_distric'].setValue(res.data[0].std_distric);
          this.permanet_form.controls['std_block'].setValue(res.data[0].std_block);
          this.permanet_form.controls['std_pin_code'].setValue(res.data[0].std_pin_code);
          this.permanet_form.controls['std_area'].setValue(res.data[0].std_area);
          this.permanet_form.controls['std_ps'].setValue(res.data[0].std_ps);
          this.registration_form.controls['std_rigistration_no'].setValue(res.data[0].std_rigistration_no);
          this.registration_form.controls['std_center_code'].setValue(res.data[0].std_center_code);
          this.registration_form.controls['std_center_name'].setValue(res.data[0].std_center_name);
          this.registration_form.controls['std_certificate_no'].setValue(res.data[0].std_certificate_no);
          this.registration_form.controls['std_total_marks'].setValue(res.data[0].std_total_marks);
          this.registration_form.controls['std_rigistration_date'].setValue(res.data[0].std_rigistration_date);
          this.registration_form.controls['std_total_amount'].setValue(res.data[0].std_total_amount);
          this.registration_form.controls['std_date_issue'].setValue(res.data[0].std_date_issue);
          this.registration_form.controls['course_id_fk'].setValue(res.data[0].course_id_fk);
          this.registration_form.controls['std_ref_name'].setValue(res.data[0].std_ref_name);

          // for docment form           
          this.markseet_url = this.url + res.data[0].std_10th_marksheet
          this.aadhar_url = this.url + res.data[0].std_aadhar_card
          this.certificate_url = this.url + res.data[0].std_gen_certificate
          this.image_url = this.url +  res.data[0].std_image

          // for update as same 
          this.aadhar_select = res.data[0].std_aadhar_card
          this.certificate_select = res.data[0].std_gen_certificate
          this.markseet_select = res.data[0].std_10th_marksheet
          this.image_select = res.data[0].std_image
        }
      })
    }
  }
  
  personal_add() {
    if(this.certificate_id > 0){
      const personaldata = new FormData();
      personaldata.append('certificate_id', this.certificate_id);
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
      personaldata.append('institute_id_fk', this.inst_id);
      personaldata.append('admin_id_fk', this.personal_form.get('admin_id_fk')?.value);
      this.services.put_certificate_personal(personaldata).subscribe(
        (res: any) => {
          console.log(res)
          this.popup.success({ detail: 'Success', summary: 'Updated' })
        },
        (error: any) => {
          console.log(error)
          this.popup.error({ detail: 'Fail', summary: 'Not' })
        }
      )


      return
    }
      const personaldata = new FormData();
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
      personaldata.append('institute_id_fk', this.inst_id);
      personaldata.append('admin_id_fk', this.personal_form.get('admin_id_fk')?.value);
      this.services.post_certificate_personal(personaldata).subscribe(
        (res: any) => {
          console.log(res)
          this.popup.success({ detail: 'Success', summary: 'Personal Data Add' })
        },
        (error: any) => {
          console.log(error)
          this.popup.error({ detail: 'Fail', summary: 'Personal Data Fail' })
        }
      )
   
  }


  permanent_update() {
    console.log(this.permanet_form.value)
    const permanetdata = new FormData();
    permanetdata.append('certificate_id', this.certificate_id);
    permanetdata.append('std_country', this.permanet_form.get('std_country')?.value);
    permanetdata.append('std_state', this.permanet_form.get('std_state')?.value);
    permanetdata.append('std_ps', this.permanet_form.get('std_ps')?.value);
    permanetdata.append('std_village', this.permanet_form.get('std_village')?.value);
    permanetdata.append('std_post_office', this.permanet_form.get('std_post_office')?.value);
    permanetdata.append('std_panchayat', this.permanet_form.get('std_panchayat')?.value);
    permanetdata.append('std_distric', this.permanet_form.get('std_distric')?.value);
    permanetdata.append('std_block', this.permanet_form.get('std_block')?.value);
    permanetdata.append('std_pin_code', this.permanet_form.get('std_pin_code')?.value);
    permanetdata.append('std_area', this.permanet_form.get('std_area')?.value);
    permanetdata.append('institute_id_fk', this.inst_id);
    permanetdata.append('admin_id_fk', this.permanet_form.get('admin_id_fk')?.value);
    this.services.put_certificate_permanent(permanetdata).subscribe({
      next: (res: any) => {
        console.log(res)
        this.popup.success({ detail: 'Success', summary: 'Permanet Data Add' })
      },
      error: (error: any) => {
        console.log(error)
        this.popup.error({ detail: 'Fail', summary: 'Permanet Data Fail' })
      }
    })
  }

  registration_update() {
    const registrationdata = new FormData();
    registrationdata.append('certificate_id', this.certificate_id);
    registrationdata.append('std_rigistration_no', this.registration_form.get('std_rigistration_no')?.value);
    registrationdata.append('std_center_code', this.registration_form.get('std_center_code')?.value);
    registrationdata.append('std_center_name', this.registration_form.get('std_center_name')?.value);
    registrationdata.append('std_certificate_no', this.registration_form.get('std_certificate_no')?.value);
    registrationdata.append('std_total_marks', this.registration_form.get('std_total_marks')?.value);
    registrationdata.append('std_rigistration_date', this.registration_form.get('std_rigistration_date')?.value);
    registrationdata.append('std_total_amount', this.registration_form.get('std_total_amount')?.value);
    registrationdata.append('std_date_issue', this.registration_form.get('std_date_issue')?.value);
    registrationdata.append('course_id_fk', this.registration_form.get('course_id_fk')?.value);
    registrationdata.append('std_ref_name', this.registration_form.get('std_ref_name')?.value);
    registrationdata.append('institute_id_fk', this.inst_id);
    registrationdata.append('admin_id_fk', this.registration_form.get('admin_id_fk')?.value);
    this.services.put_certificate_registration(registrationdata).subscribe({
      next: (res: any) => {
        console.log(res)
        this.popup.success({ detail: 'Success', summary: 'Registration Data Add' })
      },
      error: (error: any) => {
        console.log(error)
        this.popup.error({ detail: 'Fail', summary: 'Registration Data Fail' })
      }
    })
  }

  document_submit() { 
    console.log(this.certificate_id)
    const documentdata = new FormData();
    documentdata.append('certificate_id', this.certificate_id);
    documentdata.append('std_aadhar_card', this.aadhar_select[0]);
    documentdata.append('std_gen_certificate', this.certificate_select[0]);
    documentdata.append('std_10th_marksheet', this.markseet_select[0]);
    documentdata.append('std_image',this.image_select[0]);
    documentdata.append('institute_id_fk', this.inst_id);
    this.services.put_certificate_document(documentdata).subscribe({
      next: (res: any) => {
        console.log(res)
        this.popup.success({ detail: 'Success', summary: 'Registration Data Add' })
        this.router.navigate(['/institutehome/certificate'])
      },
      error: (error: any) => {
        console.log(error)
        this.popup.error({ detail: 'Fail', summary: 'Registration Data Fail' })
      }
    })
  }


// fro aadhar upload 
onaadhar(files:any) {
if (files.length === 0) {
  return;
}
const reader = new FileReader();
this.aadhar_select = files;
console.log(this.aadhar_select)
reader.onload = () => {
  this.aadhar_url = reader.result;
};
reader.readAsDataURL(this.aadhar_select[0]);
}
  
  
// fro oncertificate upload 
oncertificate(files:any) {
if (files.length === 0) {
  return;
}
const reader = new FileReader();
this.certificate_select = files;
reader.onload = () => {
  this.certificate_url = reader.result;
console.log(this.certificate_select)
};
reader.readAsDataURL(this.certificate_select[0]);
  }

// fro markseet upload 
onmarkseet(files:any) {
if (files.length === 0) {
  return;
}
let reader = new FileReader();
this.markseet_select = files;
reader.onload = () => {
  this.markseet_url = reader.result;
  console.log(this.markseet_select)
};
reader.readAsDataURL(this.markseet_select[0]);
  }

// fro image  upload 
onimage(files:any) {
if (files.length === 0) {
  return;
}
let mimeType = files[0].type;
if (mimeType.match(/image\/*/) == null) {
  console.log('Only images are supported.');
  return;
}
let reader = new FileReader();
this.image_select = files;
reader.onload = () => {
  this.image_url = reader.result;
};
reader.readAsDataURL(this.image_select[0]);
  }

  get_certificate_id(){
    if(this.certificate_id > 0){

      return
    }
    
    const formdataedit =  new FormData()
    formdataedit.append("inst_id", this.inst_id)

    this.services.get_certificate_by_inst_id(formdataedit).subscribe(
      (result: any) => {
        console.log(result.data[0].certificate_id)
        this.certificate_id = result.data[0].certificate_id
      }
    )
  }


}