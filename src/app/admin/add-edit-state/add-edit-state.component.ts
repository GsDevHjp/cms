import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-edit-state',
  templateUrl: './add-edit-state.component.html',
  styleUrls: ['./add-edit-state.component.css']
})
export class AddEditStateComponent implements OnInit {
  state_from!: FormGroup;
  admin = 1;
  state: string = 'Add State'
  actionBtn: string = 'Add'
  country_data: any;
  login_deatils: any;
  login: any;
  inst_id: any;
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private service: ManageService,
    private router: Router,
    private matref: MatDialogRef<AddEditStateComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_state: any
  ) { }

  ngOnInit(): void {
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.inst_id
    console.log("inst"+this.inst_id)

    this.service.get_country().subscribe(
      (res: any) => {
        this.country_data = res.data
      }
    )

    this.state_from = this.fb.group({
      state_id: [''],
      state_name: ['', Validators.required],
      country_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    })

    if (this.edit_state) {
      this.actionBtn = "Update";
      this.state = "Update State"
      this.state_from.controls['state_id'].setValue(this.edit_state.state_id);
      this.state_from.controls['state_name'].setValue(this.edit_state.state_name);
      this.state_from.controls['country_id_fk'].setValue(this.edit_state.country_id_fk);
      this.state_from.controls['admin_id_fk'].setValue(this.edit_state.admin_id_fk);
    }
  }
  onAdd() {
    console.log(this.state_from.value)
    if (!this.edit_state) {
      if (this.state_from.valid) {
        this.service.post_state(this.state_from.value).subscribe(
          (result: any) => {
            console.log(result)
            this.state_from.reset();
            this.matref.close();
            this.popup.success({ detail: 'Success', summary: 'State Insert Successfully...', })
            if(this.inst_id){
              this.router.navigate(['/institutehome/state'])
            }
            else{
              this.router.navigate(['/adminhome/state'])
            }

          },
          (error: any) => {
            console.log(error)
            this.popup.error({ detail: 'Unsuccess', summary: 'State Not Insert..', })
          }
        )
      }
    }
    else {
      this.updateState()
    }
  }

  updateState() {
    this.service.put_state(this.state_from.value).subscribe({
      next: (res) => {
        console.log(res)
        this.matref.close();
        this.popup.success({ detail: 'Success', summary: 'State Update Successfully...', })
        if(this.inst_id){
          this.router.navigate(['/institutehome/state'])
        }
        else{
          this.router.navigate(['/adminhome/state'])
        }
      },
      error: (error: any) => {
        console.log(error)
        this.popup.error({ detail: 'Unsuccess', summary: 'State Not Update..', })
      }
    })
  }

}