import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-add-edit-expence',
  templateUrl: './add-edit-expence.component.html',
  styleUrls: ['./add-edit-expence.component.css']
})
export class AddEditExpenceComponent implements OnInit {
  emp_data: any
  expenseForm !: FormGroup;
  actionBtn = 'Add'
  admin_id = 1
  expense_emp_id: any
  expence_type: any
  login_deatils: any;
  login: any;
  inst_id: any;
  inst_id_for_inst_login: any;
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private manageService: ManageService,
    private matref: MatDialogRef<AddEditExpenceComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_expense: any,

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
    const formdata = new FormData()
    formdata.append('inst_id',this.login.inst_id)
    this.manageService.get_emp_by_inst_id(formdata).subscribe(
      (emp_res: any) => {
    this.emp_data = emp_res.data


      }
    )
      this.expenseForm = this.fb.group({
        expense_id: [''],
        expense_type: ['', Validators.required],
        expense_amount: ['', Validators.required],
        expense_pay_to: ['', Validators.required],
        expense_mobile: ['', Validators.required],
        expense_date: ['', Validators.required],
        employee_id_fk: ['', Validators.required],
        expense_desc: [''],
        institute_id_fk: ['', Validators.required],
        admin_id_fk: ['', Validators.required],
      })

    /////////////////////////////////////////////// For The Edit Expense Data ///////////////////////////////////////////////
    if (this.edit_expense) {
      this.actionBtn = "Update";
      this.expenseForm.controls['expense_id'].setValue(this.edit_expense.expense_id);
      this.expenseForm.controls['expense_type'].setValue(this.edit_expense.expense_type);
      this.expenseForm.controls['expense_amount'].setValue(this.edit_expense.expense_amount);
      this.expenseForm.controls['expense_pay_to'].setValue(this.edit_expense.expense_pay_to);
      this.expenseForm.controls['expense_mobile'].setValue(this.edit_expense.expense_mobile);
      this.expenseForm.controls['employee_id_fk'].setValue(this.edit_expense.employee_id_fk);
      this.expenseForm.controls['expense_desc'].setValue(this.edit_expense.expense_desc);
      this.expenseForm.controls['admin_id_fk'].setValue(this.edit_expense.admin_id_fk);
    }
    this.expenseForm.controls['institute_id_fk'].setValue(this.login.inst_id);
    this.expenseForm.controls['expense_date'].setValue(new Date().toISOString().slice(0, 10));
  }

  /////////////////////////////////////////////// For The Post Expense Data ///////////////////////////////////////////////

  onSubmit() {
    if (!this.edit_expense) {
      this.manageService.post_expense(this.expenseForm.value).subscribe(
        (result: any) => {
          this.matref.close();
          this.popup.success({ detail: 'Success', summary: 'Expense Saved', })
          this.router.navigate(['/institutehome/expence'])
        },
        (error: any) => {
          console.log(error)
          this.popup.error({ detail: 'Error', summary: 'Expense Not Saved', })
        }
      )
    }

    /////////////////////////////////////////////// For The Update Expense Data ///////////////////////////////////////////////

    else {
      this.updateExpense()
    }
  }

  updateExpense() {
    console.log(this.expenseForm.value)
    this.manageService.put_expense(this.expenseForm.value).subscribe({
      next: (result: any) => {
        console.log(result)
        this.matref.close();
        this.popup.success({ detail: 'Success', summary: 'Expense Updated', })
        this.router.navigate(['/institutehome/expence'])
      },
      error: (error: any) => {
        console.log(error)
        this.popup.error({ detail: 'Error', summary: 'Expense Not Updated', })
      }
    })
  }
  expence_data_reset() {
  }
}