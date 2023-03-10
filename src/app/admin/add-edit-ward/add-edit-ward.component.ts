import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
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
  login_deatils: any;
  login: any;
  inst_id: any;
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private service: ManageService,
    private router: Router,
    private matref: MatDialogRef<AddEditWardComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_ward: any
  ) { }


  ngOnInit(): void {
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.inst_id
    console.log("inst"+this.inst_id)

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
      (res: any) => {
        this.country_data = res.data
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
            if(this.inst_id){
              this.router.navigate(['/institutehome/ward'])
            }
            else{
              this.router.navigate(['/adminhome/ward'])
            }

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
        if(this.inst_id){
          this.router.navigate(['/institutehome/ward'])
        }
        else{
          this.router.navigate(['/adminhome/ward'])
        }
      },
      error: () => {
        this.popup.error({ detail: 'Unsuccess', summary: 'Ward Not Update..', })
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
  get_district(event: any) {
    console.log(event)
    const districtfromdata = new FormData();
    districtfromdata.append('state_id', event)
    this.service.get_district_by_state(districtfromdata).subscribe(
      (district_res: any) => {
        this.district_data = district_res.data
      }
    )
  }
  get_block(event: any) {
    console.log(event)
    const blockfromdata = new FormData();
    blockfromdata.append('district_id', event)
    this.service.get_block_by_district(blockfromdata).subscribe(
      (block_res: any) => {
        this.block_data = block_res.data
      }
    )
  }
  get_panchyat(event: any) {
    console.log(event)
    const panchayatfromdata = new FormData();
    panchayatfromdata.append('block_id', event)
    this.service.get_panchayat_by_block(panchayatfromdata).subscribe(
      (panchayat_res: any) => {
        this.panchayat_data = panchayat_res.data
      }
    )
  }
}
