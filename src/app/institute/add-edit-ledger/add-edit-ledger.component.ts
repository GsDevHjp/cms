import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-add-edit-ledger',
  templateUrl: './add-edit-ledger.component.html',
  styleUrls: ['./add-edit-ledger.component.css']
})
export class AddEditLedgerComponent implements OnInit {
  hide = true;
  FromBuilder: any;
  Ledger_Form: any;
  actionBtn:string='Add'
  constructor(
    private fb:FormBuilder
  ){

  }
  ngOnInit(): void {
    this.Ledger_Form = this.fb.group({
      Cash_in_hand:['',Validators.required],
      Deposit_bank:['',Validators.required],
      Closing_amount:['', Validators.required],
      Description:['', Validators.required],
      Gst_No:['',],
      Expense:['',],
      Today_Recived:['',]
        
    })
   
  }
  product_form_rese(){
    this.Ledger_Form.reset()
  }
}
