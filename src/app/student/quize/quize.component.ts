import { Component, OnInit } from '@angular/core';
import { ManageService } from 'src/app/manage.service';
@Component({
  selector: 'app-quize',
  templateUrl: './quize.component.html',
  styleUrls: ['./quize.component.css']
})
export class QuizeComponent implements OnInit {
  count_admission: number = 0;
  quizQuestion: any
  quiz_option_a: any
  quiz_option_b: any
  quiz_option_c: any
  quiz_option_d: any
  quiz_description: any
  ques_no: number = 1
  constructor(
    private service: ManageService
  ) { }
  ngOnInit(): void {
    this.service.get_quiz().subscribe(
      (res: any) => {
        console.log(res)
        this.quizQuestion = res.data[0].quiz_question
        this.quiz_option_a = res.data[0].quiz_option_a
        this.quiz_option_b = res.data[0].quiz_option_b
        this.quiz_option_c = res.data[0].quiz_option_c
        this.quiz_option_d = res.data[0].quiz_option_d
        this.quiz_description = res.data[0].quiz_description
        this.count_admission = res.data.length
        this.ques_no = res.data[0].quiz_id

      }
    )
  }
  previewsQues() {
    alert("Previews")
  }

  nextQues() {
    alert("Next")
  }

}




