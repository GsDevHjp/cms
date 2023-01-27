import { Component, OnInit,Inject } from '@angular/core';
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
  constructor(
    @Inject(MAT_DIALOG_DATA) public editstd: any,
    private matref: MatDialogRef<AddEditInstituteComponent>,
    private FromBuilder: FormBuilder,
    private manageservice :ManageService
  ) { }

  ngOnInit(): void {
    this.InstForm = this.FromBuilder.group({
      institute_name: ['', Validators.required],
      institute_owner: ['', Validators.required],
      institute_whatsapp: ['', Validators.required],
      institute_email: ['', Validators.required],
      institute_password: ['', Validators.required],
      institute_country: [''],
      institute_state: [''],
      institute_dist: [''],
      institute_address: [''],
      institute_account_number: [''],
      account_ifsc_number: [''],
      account_holder_name: [''],
      institute_photo: [''],
      institute_document: [''],
      document_number: [''],
      document_photo: [''],
      admin_id_fk:['', Validators.required]
    })

  }


  addInst() {
    const formdata = new FormData();
    formdata.append('institute_name', this.InstForm.get('institute_name')?.value)
    formdata.append('institute_owner', this.InstForm.get('institute_owner')?.value)
    formdata.append('institute_whatsapp', this.InstForm.get('institute_whatsapp')?.value)
    formdata.append('institute_email', this.InstForm.get('institute_email')?.value)
    formdata.append('institute_password', this.InstForm.get('institute_password')?.value)
    formdata.append('institute_country', this.InstForm.get('institute_country')?.value)
    formdata.append('institute_state', this.InstForm.get('institute_state')?.value)
    formdata.append('institute_dist', this.InstForm.get('institute_dist')?.value)
    formdata.append('institute_address', this.InstForm.get('institute_address')?.value)
    formdata.append('institute_account_number', this.InstForm.get('institute_account_number')?.value)
    formdata.append('account_ifsc_number', this.InstForm.get('account_ifsc_number')?.value)
    formdata.append('account_holder_name', this.InstForm.get('account_holder_name')?.value)
    formdata.append('institute_photo', this.InstForm.get('institute_photo')?.value)
    formdata.append('institute_document', this.InstForm.get('institute_document')?.value)
    formdata.append('document_number', this.InstForm.get('document_number')?.value)
    formdata.append('document_photo', this.InstForm.get('document_photo')?.value)
    formdata.append('admin_id_fk', this.InstForm.get('admin_id_fk')?.value)
    if (!this.editstd) {
      if (this.InstForm.valid) {
        console.log(this.InstForm.value)
        // this.manageservice.Instpost(formdata).subscribe(
        //   (result: any) => {
        //     console.log(result)
        //     alert("data  insert")
        //   },
        //   (error: any) => {
        //     alert("Data not inster")
        //   }
        // )
      }
    }
  }

  OnInstUpload(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.InstForm.get('institute_photo')?.setValue(file)
    }
  }
  OnDoctUpload(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.InstForm.get('document_photo')?.setValue(file)
    }
  }
}
