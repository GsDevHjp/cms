import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-std-query',
  templateUrl: './std-query.component.html',
  styleUrls: ['./std-query.component.css']
})
export class StdQueryComponent implements OnInit {
  admin = 1
  std_id = 1
  Std_Query_Form !: FormGroup
  actionBtn: string = "Submit"
  instupdate: string = "Query"
  constructor(
    @Inject(MAT_DIALOG_DATA) public editquery: any,
    private FormBuilder: FormBuilder,
    private matref: MatDialogRef<StdQueryComponent>,
    private manageservice: ManageService
  ) { }

  ngOnInit(): void {
    this.Std_Query_Form = this.FormBuilder.group({
      query_id: [''],
      std_query: ['', Validators.required],
      std_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
      std_query_date: [new Date().toISOString().slice(0, 10)],
    })

    if (this.editquery) {
      console.log(this.editquery.query_id)
      this.actionBtn = "Update";
      this.instupdate = "Update Ragistration";
      this.Std_Query_Form.controls['query_id'].setValue(Number(this.editquery.query_id));
      this.Std_Query_Form.controls['std_query'].setValue(this.editquery.std_query);
      this.Std_Query_Form.controls['std_id_fk'].setValue(this.editquery.std_id_fk);
      this.Std_Query_Form.controls['admin_id_fk'].setValue(this.editquery.admin_id_fk);
      this.Std_Query_Form.controls['std_query_date'].setValue(this.editquery.std_query_date);
    }

  }
  addquery() {
    // console.log(this.Std_Query_Form.value)
    if (!this.editquery) {
      this.manageservice.std_query(this.Std_Query_Form.value).subscribe(
        (result: any) => {
          console.log(result)
          alert("Message Send Successfully")
        },
        (error: any) => {
          console.log(error)
          alert("Message Not Send")
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
        alert('Query Update Successfully')
      },
      error: (error: any) => {
        console.log(error)
        alert('Query Not Update..')
      }

    })
  }


}
