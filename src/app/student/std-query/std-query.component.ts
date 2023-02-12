import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-std-query',
  templateUrl: './std-query.component.html',
  styleUrls: ['./std-query.component.css']
})
export class StdQueryComponent implements OnInit {
  admin = 1
  Std_Query_Form !: FormGroup
  actionBtn: string = "Submit"
  instupdate: string = "Query"
  login_deatils: any;
  login: any;
  std_id: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public editquery: any,
    private FormBuilder: FormBuilder,
    private matref: MatDialogRef<StdQueryComponent>,
    private manageservice: ManageService,
    private popup:NgToastService
  ) {
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    console.log(this.login.std_name)
    this.std_id = this.login.std_id
    console.log("vhdfjdv" + this.login.std_id)
  }

  ngOnInit(): void {
    this.Std_Query_Form = this.FormBuilder.group({
      query_id: [''],
      std_query: ['', Validators.required],
      std_query_ans: [''],
      std_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
      std_query_date: [new Date().toISOString().slice(0, 10)],
    })

    this.Std_Query_Form.controls['std_id_fk'].setValue(this.login.std_id);

    if (this.editquery) {
      console.log(this.editquery.query_id)
      this.actionBtn = "Update";
      this.instupdate = "Update Ragistration";
      this.Std_Query_Form.controls['query_id'].setValue(Number(this.editquery.query_id));
      this.Std_Query_Form.controls['std_query'].setValue(this.editquery.std_query);
      this.Std_Query_Form.controls['std_query_ans'].setValue(this.editquery.std_query_ans);
      this.Std_Query_Form.controls['std_id_fk'].setValue(this.editquery.std_id_fk);
      this.Std_Query_Form.controls['std_query_date'].setValue(this.editquery.std_query_date);
      this.Std_Query_Form.controls['admin_id_fk'].setValue(this.editquery.admin_id_fk);
    }

  }
  addquery() {
    // console.log(this.Std_Query_Form.value)
    if (!this.editquery) {
      this.manageservice.std_query(this.Std_Query_Form.value).subscribe(
        (result: any) => {
          console.log(result)
          this.matref.close()
          this.popup.success({ detail: 'Success', summary: 'Message Send Successfully..', sticky: true, position: 'tr' })
        },
        (error: any) => {
          console.log(error)
          this.popup.error({ detail: 'Unsuccess', summary: 'Message Not Send..', sticky: true, position: 'tr' })
        }

      )
    }
    else {
      this.updateQuery()
    }

  }

  updateQuery() {
    console.log(this.Std_Query_Form.value)
    this.manageservice.put_inst(this.Std_Query_Form.value).subscribe({
      next: (res) => {
        console.log(res)
        this.popup.success({ detail: 'Success', summary: 'Message Update Successfully..', sticky: true, position: 'tr' })
      },
      error: (error: any) => {
        console.log(error)
        this.popup.error({ detail: 'Unsuccess', summary: 'Message Not Update..', sticky: true, position: 'tr' })
      }

    })
  }

  reset(){
    this.Std_Query_Form.reset()
  }

}
