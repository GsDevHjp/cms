import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-add-edit-district',
  templateUrl: './add-edit-district.component.html',
  styleUrls: ['./add-edit-district.component.css']
})
export class AddEditDistrictComponent implements OnInit {
  address_from!: FormGroup;
  admin = 1;
  district: string = 'Add District'
  actionBtn: string = 'Add'
  state_data: any;
  country_data: any;
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private service: ManageService,
    private matref: MatDialogRef<AddEditDistrictComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_district: any
  ) { }

  ngOnInit(): void {
    this.address_from = this.fb.group({
      district_id: [''],
      district_name: ['', Validators.required],
      country_id_fk: ['', Validators.required],
      state_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    })

    this.service.get_country().subscribe(
      (res:any)=>{
        this.country_data = res.data
      }
    )

    if (this.edit_district) {
      this.actionBtn = "Update";
      this.district = "Update District"
      this.address_from.controls['district_id'].setValue(this.edit_district.district_id);
      this.address_from.controls['district_name'].setValue(this.edit_district.district_name);
      this.address_from.controls['country_id_fk'].setValue(this.edit_district.country_id_fk);
      this.address_from.controls['state_id_fk'].setValue(this.edit_district.state_id_fk);
      this.address_from.controls['admin_id_fk'].setValue(this.edit_district.admin_id_fk);
    }
  }

  onAdd() {
    console.log(this.address_from.value)
    if (!this.edit_district) {
      if (this.address_from.valid) {
        this.service.post_district(this.address_from.value).subscribe(
          (result: any) => {
            console.log(result)
            this.address_from.reset();
            this.matref.close();
            this.popup.success({ detail: 'Success', summary: 'District Insert Successfully...', })
          },
          (error: any) => {
            console.log(error)
            this.popup.error({ detail: 'Unsuccess', summary: 'District Not Insert..', })
          }
        )
      }
    }
    else {
      this.updateCourse()
    }
  }

  updateCourse() {
    this.service.put_district(this.address_from.value).subscribe({
      next: (res) => {
        console.log(res)
        this.matref.close();
        this.popup.success({ detail: 'Success', summary: 'District Update Successfully...', })
      },
      error: () => {
        this.popup.error({ detail: 'Unsuccess', summary: 'District Not Update..', })
      }
    })
  }

}
