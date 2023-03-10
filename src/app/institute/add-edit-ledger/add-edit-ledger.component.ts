import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ManageService } from 'src/app/manage.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-ledger',
  templateUrl: './add-edit-ledger.component.html',
  styleUrls: ['./add-edit-ledger.component.css']
})
export class AddEditLedgerComponent implements OnInit {
  hide = true;
  FromBuilder: any;
  Ledger_Form: any;
  actionBtn: string = 'Add'
  admin = 1;
  login_deatils: any
  login: any
  inst_id: any
  inst_id_for_inst_login: any

  constructor(
    private fb: FormBuilder,
    private services: ManageService,
    private router: Router,
    private popup: NgToastService,
    private matref: MatDialogRef<AddEditLedgerComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_ledger: any

  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.inst_id
    this.inst_id_for_inst_login = this.login.inst_id
  }
  ngOnInit(): void {
    this.Ledger_Form = this.fb.group({
      ledger_id: [''],
      ledger_cash_in_hand: ['', Validators.required],
      ledger_deposit_bank: ['', Validators.required],
      ledger_closing_amount: ['', Validators.required],
      ledger_description: [''],
      ledger_expence: ['',],
      ledger_today_Recived: ['',],
      ledger_date: ['',],
      institute_id_fk: ['',],
      admin_id_fk: ['',]
    })
    if (this.edit_ledger) {
      this.actionBtn = "Update";
      this.Ledger_Form.controls['ledger_id'].setValue(this.edit_ledger.ledger_id);
      this.Ledger_Form.controls['ledger_cash_in_hand'].setValue(this.edit_ledger.ledger_cash_in_hand);
      this.Ledger_Form.controls['ledger_deposit_bank'].setValue(this.edit_ledger.ledger_deposit_bank);
      this.Ledger_Form.controls['ledger_closing_amount'].setValue(this.edit_ledger.ledger_closing_amount);
      this.Ledger_Form.controls['ledger_description'].setValue(this.edit_ledger.ledger_description);
      this.Ledger_Form.controls['ledger_expence'].setValue(this.edit_ledger.ledger_expence);
      this.Ledger_Form.controls['ledger_today_Recived'].setValue(this.edit_ledger.ledger_today_Recived);
      this.Ledger_Form.controls['institute_id_fk'].setValue(this.edit_ledger.institute_id_fk);
      this.Ledger_Form.controls['admin_id_fk'].setValue(this.edit_ledger.admin_id_fk);
    }
    this.Ledger_Form.controls['ledger_date'].setValue(new Date().toISOString().slice(0, 10));
    this.Ledger_Form.controls['institute_id_fk'].setValue(this.login.inst_id);
  }
  addBtn() {
    if (!this.edit_ledger) {
      this.services.post_ledger(this.Ledger_Form.value).subscribe(
        (res: any) => {
          console.log(res)
          this.matref.close()
          this.popup.success({ detail: 'Success', summary: 'Ledger Saved', })
          this.router.navigate(['/institutehome/ledger'])

        },
        (error: any) => {
          console.log(error)
          this.popup.error({ detail: 'Fail', summary: 'Ledger Not Saved', })
        }
      )
    }
    else{
      this.EditLedger()
    }
  }
  EditLedger(){
    this.services.put_ledger(this.Ledger_Form.value).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.matref.close()
        this.popup.success({ detail: 'Success', summary: 'Ledger Updated', })
        this.router.navigate(['/institutehome/ledger'])

      },
      error:(error:any)=>{
        console.log(error)
        this.popup.error({ detail: 'Fail', summary: 'Ledger Not Updated', })
      }
    })
  }
  ledger_form_reset() {
    this.Ledger_Form.reset()
  }
}
