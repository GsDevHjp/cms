import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
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
  login_deatils: any;
  login: any;
  inst_id: any;
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private service: ManageService,
    private router: Router,
    private matref: MatDialogRef<AddEditDistrictComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_district: any
  ) { }

  ngOnInit(): void {
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.inst_id
    console.log("inst" + this.inst_id)

    this.address_from = this.fb.group({
      district_id: [''],
      district_name: ['', Validators.required],
      country_id_fk: ['', Validators.required],
      state_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    })

    this.service.get_country().subscribe(
      (res: any) => {
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
            if (this.inst_id) {
              this.router.navigate(['/institutehome/district'])
            }
            else {
              this.router.navigate(['/adminhome/district'])
            }
          },
          (error: any) => {
            console.log(error)
            this.popup.error({ detail: 'Unsuccess', summary: 'District Not Insert..', })
          }
        )
      }
    }
    else {
      this.updateDistrict()
    }
  }

  updateDistrict() {
    this.service.put_district(this.address_from.value).subscribe({
      next: (res) => {
        console.log(res)
        this.matref.close();
        this.popup.success({ detail: 'Success', summary: 'District Update Successfully...', })
        if (this.inst_id) {
          this.router.navigate(['/institutehome/district'])
        }
        else {
          this.router.navigate(['/adminhome/district'])
        }
      },
      error: () => {
        this.popup.error({ detail: 'Unsuccess', summary: 'District Not Update..', })
      }
    })
  }

  get_state(event: any) {
    console.log(event)
    const stateformdata = new FormData();
    stateformdata.append('country_id', event)
    this.service.get_state_by_country(stateformdata).subscribe(
      (state_res: any) => {
        this.state_data = state_res.data
      }
    )
  }

}
