import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
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
  login_deatils: any;
  login: any;
  inst_id: any;
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private service: ManageService,
    private router: Router,
    private matref: MatDialogRef<AddEditPanchayatComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_panchayat: any
  ) { }

 
  ngOnInit(): void {
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.inst_id
    console.log("inst"+this.inst_id)


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
            if(this.inst_id){
              this.router.navigate(['/institutehome/panchayat'])
            }
            else{
              this.router.navigate(['/adminhome/panchayat'])
            }
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
        if(this.inst_id){
          this.router.navigate(['/institutehome/panchayat'])
        }
        else{
          this.router.navigate(['/adminhome/panchayat'])
        }      },
      error: () => {
        this.popup.error({ detail: 'Unsuccess', summary: 'panchayat Not Update..', })
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
        console.log(block_res)
        this.block_data = block_res.data
      }
    )
  }
}
