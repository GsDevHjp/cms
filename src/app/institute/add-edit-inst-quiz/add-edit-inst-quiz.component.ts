import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-add-edit-inst-quiz',
  templateUrl: './add-edit-inst-quiz.component.html',
  styleUrls: ['./add-edit-inst-quiz.component.css']
})
export class AddEditInstQuizComponent implements OnInit {
  disableSelect = new FormControl(false);
  quiz_form!: FormGroup;
  admin = 1;
  upload: any;
  actionBtn: string = 'Add'
  course_data: any
  institute_id = 1;
  login_deatils: any;
  inst_id: any;
  login: any;
  inst_id_for_inst_login: any;

  constructor(
    private popup:NgToastService,
    private fb: FormBuilder,
    private service: ManageService,
    private matref: MatDialogRef<AddEditInstQuizComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_quiz: any
  ) {
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.inst_id
    this.inst_id_for_inst_login = this.login.inst_id
  }

  ngOnInit(): void {
    const formdata = new FormData()
    formdata.append("inst_id", this.inst_id_for_inst_login)
    this.service.get_course_by_inst_id(formdata).subscribe(
      (std_res: any) => {
        this.course_data = std_res.data
      }
    )


    this.quiz_form = this.fb.group({
      quiz_id: ['',],
      quiz_no: ['1'],
      quiz_question: ['', Validators.required],
      quiz_option_a: ['', Validators.required],
      quiz_option_b: ['', Validators.required],
      quiz_option_c: ['', Validators.required],
      quiz_option_d: ['', Validators.required],
      quiz_answer: ['', Validators.required],
      quiz_description: ['', Validators.required],
      course_id_fk: ['', Validators.required],
      institute_id_fk: [''],
      admin_id_fk: ['', Validators.required]
    })

    if (this.edit_quiz) {
      this.actionBtn = "Update";
      this.quiz_form.controls['quiz_id'].setValue(this.edit_quiz.quiz_id);
      this.quiz_form.controls['quiz_question'].setValue(this.edit_quiz.quiz_question);
      this.quiz_form.controls['quiz_option_a'].setValue(this.edit_quiz.quiz_option_a);
      this.quiz_form.controls['quiz_option_b'].setValue(this.edit_quiz.quiz_option_b);
      this.quiz_form.controls['quiz_option_c'].setValue(this.edit_quiz.quiz_option_c);
      this.quiz_form.controls['quiz_option_d'].setValue(this.edit_quiz.quiz_option_d);
      this.quiz_form.controls['quiz_answer'].setValue(this.edit_quiz.quiz_answer);
      this.quiz_form.controls['quiz_description'].setValue(this.edit_quiz.quiz_description);
      this.quiz_form.controls['course_id_fk'].setValue(this.edit_quiz.course_id_fk);
      this.quiz_form.controls['institute_id_fk'].setValue(this.edit_quiz.institute_id_fk);
      this.quiz_form.controls['admin_id_fk'].setValue(this.edit_quiz.admin_id_fk);
    }
  }
  quiz_btn() {
    if (!this.edit_quiz) {
      if (this.quiz_form.valid)
        this.service.post_quiz(this.quiz_form.value).subscribe(
          (res: any) => {
            console.log(res)
            this.matref.close();
            console.log(this.quiz_form.value)
            this.popup.success({ detail: 'Success', summary: 'Quiz Added Successfully..', sticky: true, position: 'tr' })
          },
          (error: any) => {
            console.log(error)
            this.popup.error({ detail: 'Unsuccess', summary: 'Quiz Not Added..', sticky: true, position: 'tr' })
          }
        )
    }
    else {
      this.quizUpdate()
    }
  }
  quizUpdate() {
    console.log(this.quiz_form.value)
    this.service.put_quiz(this.quiz_form.value).subscribe({
      next: (res: any) => {
        console.log(res)
        this.matref.close();
        this.popup.success({ detail: 'Success', summary: 'Quiz Update Successfully..', sticky: true, position: 'tr' })
      },
      error: (error: any) => {
        console.log(error)
        this.popup.error({ detail: 'Unsuccess', summary: 'Quiz Not Update..', sticky: true, position: 'tr' })
      }

    }
    )
  }

  onCourse(event:any){
    console.log(this.inst_id)
    console.log(event)
    const fromdata  = new FormData()
    fromdata.append('course_id', event)
    fromdata.append('inst_id', this.inst_id)
    this.service.get_quiz_no_inst_course(fromdata).subscribe(
      (res:any)=>{
        // console.log(res.data.length + 1) 
        this.quiz_form.controls['quiz_no'].setValue(res.data.length + 1);

      }
    )
  }
}