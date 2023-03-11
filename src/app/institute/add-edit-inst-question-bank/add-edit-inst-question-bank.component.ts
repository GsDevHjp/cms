import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, RouterLinkWithHref } from '@angular/router';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-add-edit-inst-question-bank',
  templateUrl: './add-edit-inst-question-bank.component.html',
  styleUrls: ['./add-edit-inst-question-bank.component.css']
})
export class AddEditInstQuestionBankComponent implements OnInit {
  disableSelect = new FormControl(false);
  inst_question_bank_form!: FormGroup;
  admin = 1;
  upload: any;
  actionBtn: string = 'Add'
  course_data: any
  inst_id: any
  login_deatils: any
  login: any
  institute_id: any

  constructor(
    private popup:NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private service: ManageService,
    private matref: MatDialogRef<AddEditInstQuestionBankComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_inst_question_bank: any
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.institute_id = this.login.inst_id
  }
  ngOnInit(): void {
    const formdata = new FormData()
    formdata.append("inst_id", this.institute_id)
    this.service.get_course_by_inst_id(formdata).subscribe(
      (std_res: any) => {
        this.course_data = std_res.data
      }
    )
    this.inst_question_bank_form = this.fb.group({
      inst_question_bank_id: ['',],
      inst_question_bank_title: ['', Validators.required],
      inst_question_bank_img: ['', Validators.required],
      inst_question_bank_description: [''],
      course_id_fk: ['', Validators.required],
      institute_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })

    if (this.edit_inst_question_bank) {
      this.actionBtn = "Update";
      this.inst_question_bank_form.controls['inst_question_bank_id'].setValue(this.edit_inst_question_bank.inst_question_bank_id);
      this.inst_question_bank_form.controls['inst_question_bank_title'].setValue(this.edit_inst_question_bank.inst_question_bank_title);
      this.inst_question_bank_form.controls['inst_question_bank_img'].setValue(this.edit_inst_question_bank.inst_question_bank_img);
      this.inst_question_bank_form.controls['inst_question_bank_description'].setValue(this.edit_inst_question_bank.inst_question_bank_description);
      this.inst_question_bank_form.controls['course_id_fk'].setValue(this.edit_inst_question_bank.course_id);
      this.inst_question_bank_form.controls['institute_id_fk'].setValue(this.edit_inst_question_bank.institute_id_fk);
      this.inst_question_bank_form.controls['admin_id_fk'].setValue(this.edit_inst_question_bank.admin_id_fk);
    }
  }
  inst_question_bank_btn() {
    console.log(this.inst_question_bank_form.value)
    const formdata = new FormData();
    formdata.append('inst_question_bank_id', this.inst_question_bank_form.get('inst_question_bank_id')?.value);
    formdata.append('inst_question_bank_title', this.inst_question_bank_form.get('inst_question_bank_title')?.value);
    formdata.append('inst_question_bank_img', this.inst_question_bank_form.get('inst_question_bank_img')?.value);
    formdata.append('inst_question_bank_description', this.inst_question_bank_form.get('inst_question_bank_description')?.value);
    formdata.append('course_id_fk', this.inst_question_bank_form.get('course_id_fk')?.value);
    formdata.append('institute_id_fk', this.inst_question_bank_form.get('institute_id_fk')?.value);
    formdata.append('admin_id_fk', this.inst_question_bank_form.get('admin_id_fk')?.value);
    if (!this.edit_inst_question_bank) {
      if (this.inst_question_bank_form.valid) {
        this.service.post_inst_question_bank(formdata).subscribe(
          (result: any) => {
            console.log(result)
            this.matref.close();
            this.inst_question_bank_form.reset();
            this.popup.success({ detail: 'Success', summary: 'Question Saved', })
            this.router.navigate(['/institutehome/instquestionbank'])
          },
          (error: any) => {
            console.log(error)
            this.popup.error({ detail: 'Unsuccess', summary: 'Question Not Saved',})
          }
        )
      }
    }
    else {
      this.updateInstQuestionBank()
    }
  }
  updateInstQuestionBank() {
    console.log(this.inst_question_bank_form.value)
    const updatedata = new FormData();
    updatedata.append('inst_question_bank_id', this.inst_question_bank_form.get('inst_question_bank_id')?.value);
    updatedata.append('inst_question_bank_title', this.inst_question_bank_form.get('inst_question_bank_title')?.value);
    updatedata.append('inst_question_bank_img', this.inst_question_bank_form.get('inst_question_bank_img')?.value);
    updatedata.append('inst_question_bank_description', this.inst_question_bank_form.get('inst_question_bank_description')?.value);
    updatedata.append('course_id_fk', this.inst_question_bank_form.get('course_id_fk')?.value);
    updatedata.append('institute_id_fk', this.inst_question_bank_form.get('institute_id_fk')?.value);
    updatedata.append('admin_id_fk', this.inst_question_bank_form.get('admin_id_fk')?.value);
    this.service.put_inst_question_bank(updatedata).subscribe({
      next: (res: any) => {
        console.log(res)
        this.matref.close();
        this.popup.success({ detail: 'Success', summary: 'Question Updated',})
        this.router.navigate(['/institutehome/instquestionbank'])

      },
      error: (error: any) => {
        console.log(error)
        this.popup.error({ detail: 'Unsuccess', summary: 'Question Not Updated',})
      }
    })
  }

  OnUpload(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.inst_question_bank_form.get('inst_question_bank_img')?.setValue(file)
    }
  }
  inst_question_bank_reset(){
    this.inst_question_bank_form.reset()
  }
}