import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';


@Component({
  selector: 'app-add-edit-institute',
  templateUrl: './add-edit-institute.component.html',
  styleUrls: ['./add-edit-institute.component.css']
})
export class AddEditInstituteComponent implements OnInit {
  admin = 1;
  InstForm !: FormGroup;
  hide = true;
  actionBtn: string = 'Submit'
  instupdate: string = 'Institute Ragistration'
  constructor(
    @Inject(MAT_DIALOG_DATA) public editinst: any,
    private matref: MatDialogRef<AddEditInstituteComponent>,
    private FromBuilder: FormBuilder,
    private manageservice: ManageService
  ) { }

  ngOnInit(): void {
    this.InstForm = this.FromBuilder.group({
      inst_id: [''],
      inst_name: ['', Validators.required],
      inst_owner_name: ['', Validators.required],
      inst_whatsapp_no: ['', Validators.required],
      inst_email: ['', Validators.required],
      inst_password: ['', Validators.required],
      inst_country: [''],
      inst_state: [''],
      inst_district: [''],
      inst_address: [''],
      account_no: [''],
      inst_ifsc: [''],
      account_holder: [''],
      inst_logo: [''],
      inst_doct: [''],
      inst_doct_number: [''],
      inst_doct_img: [''],
      admin_id_fk: ['', Validators.required]
    })



    if (this.editinst) {
      console.log(this.editinst.inst_id)
      this.actionBtn = "Update";
      this.instupdate = "Update Ragistration";
      this.InstForm.controls['inst_id'].setValue(Number(this.editinst.inst_id));
      this.InstForm.controls['inst_name'].setValue(this.editinst.inst_name);
      this.InstForm.controls['inst_owner_name'].setValue(this.editinst.inst_owner_name);
      this.InstForm.controls['inst_whatsapp_no'].setValue(this.editinst.inst_whatsapp_no);
      this.InstForm.controls['inst_email'].setValue(this.editinst.inst_email);
      this.InstForm.controls['inst_password'].setValue(this.editinst.inst_password);
      this.InstForm.controls['inst_country'].setValue(this.editinst.inst_country);
      this.InstForm.controls['inst_state'].setValue(this.editinst.inst_state);
      this.InstForm.controls['inst_district'].setValue(this.editinst.inst_district);
      this.InstForm.controls['inst_address'].setValue(this.editinst.inst_address);
      this.InstForm.controls['account_no'].setValue(this.editinst.account_no);
      this.InstForm.controls['inst_ifsc'].setValue(this.editinst.inst_ifsc);
      this.InstForm.controls['account_holder'].setValue(this.editinst.account_holder);
      this.InstForm.controls['inst_logo'].setValue(this.editinst.inst_logo);
      this.InstForm.controls['inst_doct'].setValue(this.editinst.inst_doct);
      this.InstForm.controls['inst_doct_number'].setValue(this.editinst.inst_doct_number);
      this.InstForm.controls['inst_doct_img'].setValue(this.editinst.inst_doct_img);
      this.InstForm.controls['admin_id_fk'].setValue(this.editinst.admin_id_fk);
    }
  }


  addInst() {
    const formdata = new FormData();
    formdata.append('inst_name', this.InstForm.get('inst_name')?.value)
    formdata.append('inst_owner_name', this.InstForm.get('inst_owner_name')?.value)
    formdata.append('inst_whatsapp_no', this.InstForm.get('inst_whatsapp_no')?.value)
    formdata.append('inst_email', this.InstForm.get('inst_email')?.value)
    formdata.append('inst_password', this.InstForm.get('inst_password')?.value)
    formdata.append('inst_country', this.InstForm.get('inst_country')?.value)
    formdata.append('inst_state', this.InstForm.get('inst_state')?.value)
    formdata.append('inst_district', this.InstForm.get('inst_district')?.value)
    formdata.append('inst_address', this.InstForm.get('inst_address')?.value)
    formdata.append('account_no', this.InstForm.get('account_no')?.value)
    formdata.append('inst_ifsc', this.InstForm.get('inst_ifsc')?.value)
    formdata.append('account_holder', this.InstForm.get('account_holder')?.value)
    formdata.append('inst_logo', this.InstForm.get('inst_logo')?.value)
    formdata.append('inst_doct', this.InstForm.get('inst_doct')?.value)
    formdata.append('inst_doct_number', this.InstForm.get('inst_doct_number')?.value)
    formdata.append('inst_doct_img', this.InstForm.get('inst_doct_img')?.value)
    formdata.append('admin_id_fk', this.InstForm.get('admin_id_fk')?.value)
    if (!this.editinst) {
      if (this.InstForm.valid) {
        console.log(this.InstForm.value)
        this.manageservice.inst_post(formdata).subscribe(
          (result: any) => {
            console.log(result)
            alert("Institute Added Successfully")
          },
          (error: any) => {
            console.log(error)
            alert("Institute Not Insert")
          }
        )
      }
    }
    else {
      this.updateInst()
    }
  }

  updateInst() {
    // console.log(this.InstForm.value)
    const updatedata = new FormData();
     console.log("inst_name" + this.InstForm.get('inst_name')?.value)

    updatedata.append('inst_id', this.InstForm.get('inst_id')?.value)
    updatedata.append('inst_name', this.InstForm.get('inst_name')?.value)
    updatedata.append('inst_owner_name', this.InstForm.get('inst_owner_name')?.value)
    updatedata.append('inst_whatsapp_no', this.InstForm.get('inst_whatsapp_no')?.value)
    updatedata.append('inst_email', this.InstForm.get('inst_email')?.value)
    updatedata.append('inst_password', this.InstForm.get('inst_password')?.value)
    updatedata.append('inst_country', this.InstForm.get('inst_country')?.value)
    updatedata.append('inst_state', this.InstForm.get('inst_state')?.value)
    updatedata.append('inst_district', this.InstForm.get('inst_district')?.value)
    updatedata.append('inst_address', this.InstForm.get('inst_address')?.value)
    updatedata.append('account_no', this.InstForm.get('account_no')?.value)
    updatedata.append('inst_ifsc', this.InstForm.get('inst_ifsc')?.value)
    updatedata.append('account_holder', this.InstForm.get('account_holder')?.value)
    updatedata.append('inst_logo', this.InstForm.get('inst_logo')?.value)
    updatedata.append('inst_doct', this.InstForm.get('inst_doct')?.value)
    updatedata.append('inst_doct_number', this.InstForm.get('inst_doct_number')?.value)
    updatedata.append('inst_doct_img', this.InstForm.get('inst_doct_img')?.value)
    updatedata.append('admin_id_fk', this.InstForm.get('admin_id_fk')?.value)
    this.manageservice.put_inst(updatedata).subscribe({
      next: (res) => {
        console.log(res)
        alert('Institute Update Successfully')
      },
      error: (error: any) => {
        console.log(error)
        alert('Institute Not Update..')
      }

    })
  }


  OnInstUpload(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.InstForm.get('inst_logo')?.setValue(file)
    }
  }
  OnDoctUpload(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.InstForm.get('inst_doct_img')?.setValue(file)
    }
  }
}
