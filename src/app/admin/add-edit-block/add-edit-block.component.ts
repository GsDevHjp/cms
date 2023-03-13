import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-edit-block',
  templateUrl: './add-edit-block.component.html',
  styleUrls: ['./add-edit-block.component.css']
})
export class AddEditBlockComponent implements OnInit {
  address_from!: FormGroup;
  admin = 1;
  block: string = 'Add Block'
  actionBtn: string = 'Add'
  state_data: any;
  country_data: any;
  district_data: any;
  login_deatils: any;
  login: any;
  inst_id: any;
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private service: ManageService,
    private router:Router,
    private matref: MatDialogRef<AddEditBlockComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_block: any
  ) { }

 
  ngOnInit(): void {
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.inst_id
    console.log("inst"+this.inst_id)

    this.address_from = this.fb.group({
      block_id: [''],
      block_name: ['', Validators.required],
      country_id_fk: ['', Validators.required],
      state_id_fk: ['', Validators.required],
      district_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    })

    this.service.get_country().subscribe(
      (res:any)=>{
        this.country_data = res.data
      }
    )
   
    if (this.edit_block) {
      this.actionBtn = "Update";
      this.block = "Update Block"
      this.address_from.controls['block_id'].setValue(this.edit_block.block_id);
      this.address_from.controls['block_name'].setValue(this.edit_block.block_name);
      this.address_from.controls['country_id_fk'].setValue(this.edit_block.country_id_fk);
      this.address_from.controls['state_id_fk'].setValue(this.edit_block.state_id_fk);
      this.address_from.controls['district_id_fk'].setValue(this.edit_block.district_id_fk);
      this.address_from.controls['admin_id_fk'].setValue(this.edit_block.admin_id_fk);
    }
  }

  onAdd() {
    console.log(this.address_from.value)
    if (!this.edit_block) {
      if (this.address_from.valid) {
        this.service.post_block(this.address_from.value).subscribe(
          (result: any) => {
            console.log(result)
            this.address_from.reset();
            this.matref.close();
            this.popup.success({ detail: 'Success', summary: 'Block Insert Successfully...', })
            if(this.inst_id){
              this.router.navigate(['/institutehome/block'])
            }
            else{
              this.router.navigate(['/adminhome/block'])
            }
          },
          (error: any) => {
            console.log(error)
            this.popup.error({ detail: 'Unsuccess', summary: 'Block Not Insert..', })
          }
        )
      }
    }
    else {
      this.updateBlock()
    }
  }

  updateBlock() {
    this.service.put_block(this.address_from.value).subscribe({
      next: (res) => {
        console.log(res)
        this.matref.close();
        this.popup.success({ detail: 'Success', summary: 'Block Update Successfully...', })
        if(this.inst_id){
          this.router.navigate(['/institutehome/block'])
        }
        else{
          this.router.navigate(['/adminhome/block'])
        }      },
      error: () => {
        this.popup.error({ detail: 'Unsuccess', summary: 'Block Not Update..', })
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

}
