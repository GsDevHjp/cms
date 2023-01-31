import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';

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


  constructor(
    private fb: FormBuilder,
    private service:ManageService,
    private matref: MatDialogRef<AddEditInstQuizComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_quiz: any
  ) { }
  ngOnInit(): void {
    this.quiz_form = this.fb.group({
      quiz_id: ['',],
      quiz_question: ['', Validators.required],
      quiz_option_a: ['', Validators.required],
      quiz_option_b: ['', Validators.required],
      quiz_option_c: ['', Validators.required],
      quiz_option_d: ['', Validators.required],
      quiz_answer: ['', Validators.required],
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
      this.quiz_form.controls['admin_id_fk'].setValue(this.edit_quiz.admin_id_fk);
    }
  }
  quiz_btn() {
    if(!this.edit_quiz){
      if(this.quiz_form.valid)
    this.service.post_quiz(this.quiz_form.value).subscribe(
      (res:any)=>{
        console.log(res)
        this.matref.close();
        alert('form successfully...')
      },
      (error:any)=>{
        console.log(error)
        alert('data not insert')
      }
    )
  }
  else{
    this.quizUpdate()
  }
}
quizUpdate(){
  console.log(this.quiz_form.value)
  this.service.put_quiz(this.quiz_form.value).subscribe({
    next:(res:any)=>{
      console.log(res)
      this.matref.close();
      alert('update successfully..')
    },
    error:(error:any)=>{
      console.log(error)
      alert('data not update')
    }
  })
}
}