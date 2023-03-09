import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-add-edit-panchayat',
  templateUrl: './add-edit-panchayat.component.html',
  styleUrls: ['./add-edit-panchayat.component.css']
})
export class AddEditPanchayatComponent implements OnInit {
  address_from!: FormGroup;
  admin = 1;
  panchayat: string = 'Add Panchayat'
  actionBtn: string = 'Add'
  state_data: any;
  country_data: any;
  district_data: any;
  block_data: any;
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private service: ManageService,
    private matref: MatDialogRef<AddEditPanchayatComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_panchayat: any
  ) { }

 
  ngOnInit(): void {
    this.address_from = this.fb.group({
      panchayat_id: [''],
      panchayat_name: ['', Validators.required],
      country_id_fk: ['', Validators.required],
      state_id_fk: ['', Validators.required],
      district_id_fk: ['', Validators.required],
      block_id_fk: ['', Validators.required],
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

    if (this.edit_panchayat) {
      this.actionBtn = "Update";
      this.panchayat = "Update Block"
      this.address_from.controls['panchayat_id'].setValue(this.edit_panchayat.panchayat_id);
      this.address_from.controls['panchayat_name'].setValue(this.edit_panchayat.panchayat_name);
      this.address_from.controls['country_id_fk'].setValue(this.edit_panchayat.country_id_fk);
      this.address_from.controls['state_id_fk'].setValue(this.edit_panchayat.state_id_fk);
      this.address_from.controls['district_id_fk'].setValue(this.edit_panchayat.district_id_fk);
      this.address_from.controls['block_id_fk'].setValue(this.edit_panchayat.block_id_fk);
      this.address_from.controls['admin_id_fk'].setValue(this.edit_panchayat.admin_id_fk);
    }
  }

  onAdd() {
    console.log(this.address_from.value)
    if (!this.edit_panchayat) {
      if (this.address_from.valid) {
        this.service.post_panchayat(this.address_from.value).subscribe(
          (result: any) => {
            console.log(result)
            this.address_from.reset();
            this.matref.close();
            this.popup.success({ detail: 'Success', summary: 'panchayat Insert Successfully...', })
          },
          (error: any) => {
            console.log(error)
            this.popup.error({ detail: 'Unsuccess', summary: 'panchayat Not Insert..', })
          }
        )
      }
    }
    else {
      this.updatePanchayat()
    }
  }

  updatePanchayat() {
    this.service.put_panchayat(this.address_from.value).subscribe({
      next: (res) => {
        console.log(res)
        this.matref.close();
        this.popup.success({ detail: 'Success', summary: 'panchayat Update Successfully...', })
      },
      error: () => {
        this.popup.error({ detail: 'Unsuccess', summary: 'panchayat Not Update..', })
      }
    })
  }

}
