import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';

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
  admin_id = 1;
  login_deatils: any;
  login: any;
  inst_id: any;
  inst_id_for_inst_login: any;
  autoselect = 'Male'
  editpermanent:any
  certificate_id:any = 1
  constructor(
    private personal: FormBuilder,
    private permanet: FormBuilder,
    private services: ManageService,
    private popup: NgToastService,

  ) {
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

    if (this.editpermanent) {
      this.permanet_form.controls['certificate_id'].setValue(this.personal_form.get('personal_form')?.value);
      this.permanet_form.controls['personal_form'].setValue(this.editpermanent.personal_form);
      this.permanet_form.controls['std_village'].setValue(this.editpermanent.std_village);
      this.permanet_form.controls['std_post_office'].setValue(this.editpermanent.std_post_office);
      this.permanet_form.controls['std_panchayat'].setValue(this.editpermanent.std_panchayat);
      this.permanet_form.controls['std_distric'].setValue(this.editpermanent.std_distric);
      this.permanet_form.controls['std_block'].setValue(this.editpermanent.std_block);
      this.permanet_form.controls['std_pin_code'].setValue(this.editpermanent.std_pin_code);
      this.permanet_form.controls['std_area'].setValue(this.editpermanent.std_area);
      this.permanet_form.controls['institute_id_fk'].setValue(this.editpermanent.institute_id_fk);
      this.permanet_form.controls['admin_id_fk'].setValue(this.editpermanent.admin_id_fk);
    }

    this.personal_form.controls['institute_id_fk'].setValue(this.login.inst_id);
    this.permanet_form.controls['institute_id_fk'].setValue(this.login.inst_id);
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
      },
      (error: any) => {
        console.log(error)
        this.popup.error({ detail: 'Fail', summary: 'Personal Data Fail' })
      }
    )
}
  permanent_add(){
    alert(this.inst_id_for_inst_login)
    alert(this.certificate_id)
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
}