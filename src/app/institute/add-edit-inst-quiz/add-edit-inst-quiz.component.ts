import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
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
    private router:Router,
    private matref: MatDialogRef<AddEditInstQuizComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_quiz: any
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
    console.log(this.edit_quiz)
    this.quiz_form = this.fb.group({
      quiz_id: ['',],
      quiz_no: ['1'],
      quiz_question: ['', Validators.required],
      quiz_option_a: ['', Validators.required],
      quiz_option_b: ['', Validators.required],
      quiz_option_c: ['', Validators.required],
      quiz_option_d: ['', Validators.required],
      quiz_answer: ['', Validators.required],
      quiz_description: [''],
      course_id_fk: ['', Validators.required],
      institute_id_fk: [''],
      admin_id_fk: ['', Validators.required]
    })

    this.quiz_form.controls['institute_id_fk'].setValue(this.inst_id_for_inst_login);

    if (this.edit_quiz.quiz_id) {
      this.actionBtn = "Update";
      this.quiz_form.controls['quiz_id'].setValue(this.edit_quiz.quiz_id);
      this.quiz_form.controls['quiz_no'].setValue(this.edit_quiz.quiz_no);
      this.quiz_form.controls['quiz_question'].setValue(this.edit_quiz.quiz_question);
      this.quiz_form.controls['quiz_option_a'].setValue(this.edit_quiz.quiz_option_a);
      this.quiz_form.controls['quiz_option_b'].setValue(this.edit_quiz.quiz_option_b);
      this.quiz_form.controls['quiz_option_c'].setValue(this.edit_quiz.quiz_option_c);
      this.quiz_form.controls['quiz_option_d'].setValue(this.edit_quiz.quiz_option_d);
      this.quiz_form.controls['quiz_answer'].setValue(this.edit_quiz.quiz_answer);
      this.quiz_form.controls['quiz_description'].setValue(this.edit_quiz.quiz_description);
      this.quiz_form.controls['course_id_fk'].setValue(this.edit_quiz.course_id);
      this.quiz_form.controls['institute_id_fk'].setValue(this.edit_quiz.inst_id);
      this.quiz_form.controls['admin_id_fk'].setValue(this.edit_quiz.admin_id_fk);
    }
    else{
      this.quiz_form.controls['course_id_fk'].setValue(this.edit_quiz);
      const fromdata  = new FormData()
      fromdata.append('course_id', this.edit_quiz)
      fromdata.append('inst_id', this.inst_id)
      this.service.get_quiz_no_inst_course(fromdata).subscribe(
        (res:any)=>{
          // console.log(res.data.length + 1) 
          this.quiz_form.controls['quiz_no'].setValue(res.data.length + 1);
        }
      )
    }
  }

  quiz_btn() {
    console.log(this.quiz_form.value)
    if (!this.edit_quiz.quiz_id) {
      if (this.quiz_form.valid)
        this.service.post_quiz(this.quiz_form.value).subscribe(
          (res: any) => {
            console.log(res)
            this.matref.close();
            console.log(this.quiz_form.value)
            this.popup.success({ detail: 'Success', summary: 'Quiz Saved', })
            this.router.navigate(['/institutehome/instquiz'],this.edit_quiz)
          },
          (error: any) => {
            console.log(error)
            this.popup.error({ detail: 'Unsuccess', summary: 'Quiz Not Saved', })
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
        this.popup.success({ detail: 'Success', summary: 'Quiz Updated' })
        this.router.navigate(['/institutehome/instquiz'],this.quiz_form.get('course_id_fk')?.value)
      },
      error: (error: any) => {
        console.log(error)
        this.popup.error({ detail: 'Unsuccess', summary: 'Quiz Not Updated'})
      }

    }
    )
  }
  quiz_data_reset(){
    this.quiz_form.controls['quiz_question'].reset()
    this.quiz_form.controls['quiz_option_a'].reset()
    this.quiz_form.controls['quiz_option_b'].reset()
    this.quiz_form.controls['quiz_option_c'].reset()
    this.quiz_form.controls['quiz_option_d'].reset()
    this.quiz_form.controls['quiz_answer'].reset()
    this.quiz_form.controls['quiz_description'].reset()
  }

  // onCourse(event:any){
  //   console.log(this.inst_id)
  //   console.log(event)
  //   const fromdata  = new FormData()
  //   fromdata.append('course_id', event)
  //   fromdata.append('inst_id', this.inst_id)
  //   this.service.get_quiz_no_inst_course(fromdata).subscribe(
  //     (res:any)=>{
  //       // console.log(res.data.length + 1) 
  //       this.quiz_form.controls['quiz_no'].setValue(res.data.length + 1);

  //     }
  //   )
  // }
}