import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-add-edit-ward',
  templateUrl: './add-edit-ward.component.html',
  styleUrls: ['./add-edit-ward.component.css']
})
export class AddEditWardComponent implements OnInit {
  address_from!: FormGroup;
  admin = 1;
  ward: string = 'Add Ward'
  actionBtn: string = 'Add'
  state_data: any;
  country_data: any;
  district_data: any;
  block_data: any;
  panchayat_data: any;
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private service: ManageService,
    private matref: MatDialogRef<AddEditWardComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_ward: any
  ) { }

 
  ngOnInit(): void {
    this.address_from = this.fb.group({
      ward_id: [''],
      ward_name: ['', Validators.required],
      country_id_fk: ['', Validators.required],
      state_id_fk: ['', Validators.required],
      district_id_fk: ['', Validators.required],
      block_id_fk: ['', Validators.required],
      panchayat_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    })

    this.service.get_country().subscribe(
      (res:any)=>{
        this.country_data = res.data
      }
    )
    this.service.get_state().subscribe(
      (res:any)=>{
        this.state_data = res.data
      }
    )
    this.service.get_district().subscribe(
      (res:any)=>{
        this.district_data = res.data
      }
    )
    this.service.get_block().subscribe(
      (res:any)=>{
        this.block_data = res.data
      }
    )
    this.service.get_panchayat().subscribe(
      (res:any)=>{
        this.panchayat_data = res.data
      }
    )

    if (this.edit_ward) {
      this.actionBtn = "Update";
      this.ward = "Update Ward"
      this.address_from.controls['ward_id'].setValue(this.edit_ward.ward_id);
      this.address_from.controls['ward_name'].setValue(this.edit_ward.ward_name);
      this.address_from.controls['country_id_fk'].setValue(this.edit_ward.country_id_fk);
      this.address_from.controls['state_id_fk'].setValue(this.edit_ward.state_id_fk);
      this.address_from.controls['district_id_fk'].setValue(this.edit_ward.district_id_fk);
      this.address_from.controls['block_id_fk'].setValue(this.edit_ward.block_id_fk);
      this.address_from.controls['panchayat_id_fk'].setValue(this.edit_ward.panchayat_id_fk);
      this.address_from.controls['admin_id_fk'].setValue(this.edit_ward.admin_id_fk);
    }
  }

  onAdd() {
    console.log(this.address_from.value)
    if (!this.edit_ward) {
      if (this.address_from.valid) {
        this.service.post_ward(this.address_from.value).subscribe(
          (result: any) => {
            console.log(result)
            this.address_from.reset();
            this.matref.close();
            this.popup.success({ detail: 'Success', summary: 'Ward Insert Successfully...', })
          },
          (error: any) => {
            console.log(error)
            this.popup.error({ detail: 'Unsuccess', summary: 'Wrad Not Insert..', })
          }
        )
      }
    }
    else {
      this.updateWard()
    }
  }

  updateWard() {
    this.service.put_ward(this.address_from.value).subscribe({
      next: (res) => {
        console.log(res)
        this.matref.close();
        this.popup.success({ detail: 'Success', summary: 'Ward Update Successfully...', })
      },
      error: () => {
        this.popup.error({ detail: 'Unsuccess', summary: 'Ward Not Update..', })
      }
    })
  }

}
