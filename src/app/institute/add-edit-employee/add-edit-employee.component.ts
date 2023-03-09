import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {
  empForm !: FormGroup;
  admin_id = 1;
  actionBtn: string = 'Add'
  profileI: any = null;
  photo: any
  login_deatils: any;
  login: any;
  inst_id: any;
  inst_id_for_inst_login: any;
  image_url:any = "https://greensoft.net.in/gscms/assets/certificate/man.png"
  image_select:any

  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private manageService: ManageService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private matref: MatDialogRef<AddEditEmployeeComponent>
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.inst_id
    this.inst_id_for_inst_login = this.login.inst_id
  }

  ngOnInit(): void {
    this.empForm = this.fb.group({
      emp_id: ['',],
      emp_name: ['', Validators.required],
      emp_email: ['', Validators.required],
      emp_account_no: ['', Validators.required],
      emp_whatsapp: ['', Validators.required],
      emp_password: ['', Validators.required],
      emp_ac_holder_name: ['', Validators.required],
      emp_aadhar_no: ['', Validators.required],
      emp_photo: ['', Validators.required],
      emp_ifsc: ['', Validators.required],
      emp_address: [''],
      institute_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    })

    //////////////////// for edit data /////////////////////

    if (this.editData) {
      this.actionBtn = "Update";
      this.empForm.controls['emp_id'].setValue(Number(this.editData.emp_id));
      this.empForm.controls['emp_name'].setValue(this.editData.emp_name);
      this.empForm.controls['emp_whatsapp'].setValue(this.editData.emp_whatsapp);
      this.empForm.controls['emp_email'].setValue(this.editData.emp_email);
      this.empForm.controls['emp_password'].setValue(this.editData.emp_password);
      this.empForm.controls['emp_address'].setValue(this.editData.emp_address);
      this.empForm.controls['emp_ac_holder_name'].setValue(this.editData.emp_ac_holder_name);
      this.empForm.controls['emp_aadhar_no'].setValue(this.editData.emp_aadhar_no);
      this.empForm.controls['emp_account_no'].setValue(this.editData.emp_account_no);
      this.empForm.controls['emp_ifsc'].setValue(this.editData.emp_ifsc);
      this.empForm.controls['emp_photo'].setValue(this.editData.emp_photo);
      this.empForm.controls['institute_id_fk'].setValue(this.editData.institute_id_fk);
      this.empForm.controls['admin_id_fk'].setValue(this.editData.admin_id_fk);
    }
    this.empForm.controls['institute_id_fk'].setValue(this.login.inst_id);
  }

  onSubmit() {
    console.log(this.empForm.value)
    const formdata = new FormData();
    formdata.append('emp_name', this.empForm.get('emp_name')?.value)
    formdata.append('emp_whatsapp', this.empForm.get('emp_whatsapp')?.value)
    formdata.append('emp_email', this.empForm.get('emp_email')?.value)
    formdata.append('emp_password', this.empForm.get('emp_password')?.value)
    formdata.append('emp_address', this.empForm.get('emp_address')?.value)
    formdata.append('emp_ac_holder_name', this.empForm.get('emp_ac_holder_name')?.value)
    formdata.append('emp_aadhar_no', this.empForm.get('emp_aadhar_no')?.value)
    formdata.append('emp_account_no', this.empForm.get('emp_account_no')?.value)
    formdata.append('emp_ifsc', this.empForm.get('emp_ifsc')?.value)
    formdata.append('emp_photo', this.empForm.get('emp_photo')?.value)
    formdata.append('institute_id_fk', this.inst_id_for_inst_login)
    formdata.append('admin_id_fk', this.empForm.get('admin_id_fk')?.value)
    if (!this.editData) {
      this.manageService.postEmployee(formdata).subscribe(
        (result: any) => {
          console.log(result)
          this.matref.close();
          this.popup.success({ detail: 'Success', summary: 'Employee Saved' })
          this.router.navigate(['/institutehome/employee']);

        },
        (error: any) => {
          console.log(error)
          this.popup.error({ detail: 'Error', summary: 'Employee Not Saved ' })
        }
      )
    }
    else {
      this.updateEmp()
    }
  }

  updateEmp() {
    console.log(this.empForm.value)
    const formdataedit = new FormData();
    formdataedit.append('emp_id', this.empForm.get('emp_id')?.value)
    formdataedit.append('emp_name', this.empForm.get('emp_name')?.value)
    formdataedit.append('emp_aadhar_no', this.empForm.get('emp_aadhar_no')?.value)
    formdataedit.append('emp_ac_holder_name', this.empForm.get('emp_ac_holder_name')?.value)
    formdataedit.append('emp_account_no', this.empForm.get('emp_account_no')?.value)
    formdataedit.append('emp_address', this.empForm.get('emp_address')?.value)
    formdataedit.append('emp_email', this.empForm.get('emp_email')?.value)
    formdataedit.append('emp_ifsc', this.empForm.get('emp_ifsc')?.value)
    formdataedit.append('emp_password', this.empForm.get('emp_password')?.value)
    formdataedit.append('emp_photo', this.empForm.get('emp_photo')?.value)
    formdataedit.append('emp_whatsapp', this.empForm.get('emp_whatsapp')?.value)
    formdataedit.append('institute_id_fk', this.inst_id_for_inst_login)
    formdataedit.append('admin_id_fk', this.empForm.get('admin_id_fk')?.value)
    this.manageService.putEmployee(formdataedit).subscribe({
      next: (res) => {
        console.log(res)
        this.matref.close();
        this.popup.success({ detail: 'Success', summary: 'Employee Updated' })
        this.router.navigate(['/institutehome/employee']);
      },
      error: (error) => {
        console.log(error)
        this.popup.error({ detail: 'Error', summary: 'Employee Not Updated' })
      }
    })
  }
  resetEmp() {
    this.empForm.reset()
  }
  onimage(files:any) {
    if (files.length === 0) {
      return;
    }
  }
  
  onPhotoUpload(e: any) {
    if (e.target.files) {
      const profile = e.target.files[0];
      this.profileI = e.target.files[0] ?? null;
      this.empForm.get('emp_photo')?.setValue(profile);
    }
  }

}

