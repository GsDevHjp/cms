import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-add-edit-country',
  templateUrl: './add-edit-country.component.html',
  styleUrls: ['./add-edit-country.component.css']
})
export class AddEditCountryComponent implements OnInit {
  address_from!: FormGroup;
  admin = 1;
  country: string = 'Add Country'
  actionBtn: string = 'Add'
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private service: ManageService,
    private matref: MatDialogRef<AddEditCountryComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_country: any
  ) {
   
  }

  ngOnInit(): void {
    this.address_from = this.fb.group({
      country_id: [''],
      country_name: ['', Validators.required],
      description: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    })

    if (this.edit_country) {
      this.actionBtn = "Update";
      this.country = "Update Country"
      this.address_from.controls['country_id'].setValue(this.edit_country.country_id);
      this.address_from.controls['country_name'].setValue(this.edit_country.country_name);
      this.address_from.controls['description'].setValue(this.edit_country.description);
      this.address_from.controls['admin_id_fk'].setValue(this.edit_country.admin_id_fk);
    }
  }

  onAdd() {
    console.log(this.address_from.value)
    if (!this.edit_country) {
      if (this.address_from.valid) {
        this.service.post_country(this.address_from.value).subscribe(
          (result: any) => {
            console.log(result)
            this.address_from.reset();
            this.matref.close();
            this.popup.success({ detail: 'Success', summary: 'Country Insert Successfully...',})
          },
          (error: any) => {
            console.log(error)
            this.popup.error({ detail: 'Unsuccess', summary: 'Country Not Insert..',})
          }
        )
      }
    }
    else {
      this.updateCourse()
    }
  }

  updateCourse() {
    this.service.put_country(this.address_from.value).subscribe({
      next: (res) => {
        console.log(res)
        this.matref.close();
        this.popup.success({ detail: 'Success', summary: 'Country Update Successfully...',})
      },
      error: () => {
        this.popup.error({ detail: 'Unsuccess', summary: 'Country Not Update..',})
      }
    })
  }

}