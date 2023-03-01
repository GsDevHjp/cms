import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { ManageService } from 'src/app/manage.service';
@Component({
  selector: 'app-quize',
  templateUrl: './quize.component.html',
  styleUrls: ['./quize.component.css']
})

export class QuizeComponent implements OnInit {
  quizfrom !: FormGroup
  count_ques: number = 0;
  quizQuestion: any
  quiz_option_a: any
  quiz_option_b: any
  quiz_option_c: any
  quiz_option_d: any
  quiz_description: any
  currentQuestion: number = 0
  hidden: boolean = true;
  course_data: any
  inst_id: any
  interval: any
  counter = 60
  questionlist: any = [];

  constructor(
    private service: ManageService,
    private router: Router,
    private FromBuilder: FormBuilder,
  ) {

    const navigation = this.router.getCurrentNavigation();
    this.course_data = navigation?.extras
  }
  ngOnInit(): void {

    const fromdata = new FormData()
    fromdata.append("course_id", this.course_data.course_id)
    fromdata.append("inst_id", this.course_data.institute_id_fk)
    this.service.get_quiz_by_inst_id(fromdata).subscribe(
      (res: any) => {
        console.log(res)
        this.questionlist = res.data
        this.quiz_description = res.data[0].quiz_description
        this.count_ques = res.data.length
      }
    )

    this.quizfrom = this.FromBuilder.group({
      quiz_option_a: ['', Validators.required],
      quiz_option_b: ['', Validators.required],
      quiz_option_c: ['', Validators.required],
      quiz_option_d: ['', Validators.required],
    })

    this.startCounter()
  }

  option(event: any) {
    console.log(event)
  }

  nextQues() {
    console.log(this.quizfrom.value)
    this.currentQuestion + 1
    console.log(this.currentQuestion++)
    this.counter = 60
  }

  previewsQues() {
    this.currentQuestion - 1
    this.counter = 60
    console.log(this.currentQuestion--)
  }


  startCounter() {
    this.interval = interval(1000).subscribe(
      (val => {
        this.counter--;
        if (this.counter == 0) {
          if (this.counter == 0 && this.currentQuestion == this.count_ques) {
            this.router.navigate(['/studenthome/quizdashboard']);
          }
          else {

          }
          this.nextQues()
          this.counter = 60
        }
      })

    )
  }
}




