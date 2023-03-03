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
  quiz_option_a: string = "A"
  quiz_option_b: string = "B"
  quiz_option_c: string = "C"
  quiz_option_d: string = "D"
  quiz_description: any
  currentQuestion: number = 0
  hidden: boolean = true;
  course_data: any
  inst_id: any
  interval: any
  counter = 60
  backgroundColor1: string = ""
  backgroundColor2: string = ""
  backgroundColor3: string = ""
  backgroundColor4: string = ""
  questionlist: any = [];
  answer: any;
  correctanswer: Number = 0
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

  // option(event: any) {
  //   console.log(event)
  //   if (this.quiz_option_a == this.questionlist[this.currentQuestion]?.quiz_answer) {
  //     this.answer = "A"
  //   } else if (this.quiz_option_b == this.questionlist[this.currentQuestion]?.quiz_answer) {
  //     this.answer = "B"
  //   } else if (this.questionlist[this.currentQuestion]?.quiz_option_c == this.questionlist[this.currentQuestion]?.quiz_answer) {
  //     this.answer = "C"
  //   } else if (this.questionlist[this.currentQuestion]?.quiz_option_d == this.questionlist[this.currentQuestion]?.quiz_answer) {
  //     this.answer = "D"
  //   }
  //   else { }


  //   console.log("ans" + this.questionlist[this.currentQuestion]?.quiz_answer)
  //   if (this.answer == this.questionlist[this.currentQuestion]?.quiz_answer) {
  //     console.log("Answer is Correct")
  //   }
  //   else {
  //     console.log("Answer is Wrong")
  //   }

  // }


  option1(event: any) {
    console.log(event)
    if (this.quiz_option_a == this.questionlist[this.currentQuestion]?.quiz_answer) {
      console.log("Ans " + this.quiz_option_a)
      this.backgroundColor1 = "green"
      this.backgroundColor2 = "red"
      this.backgroundColor3 = "red"
      this.backgroundColor4 = "red"
    }
    else {
      this.backgroundColor1 = "red"
      if(this.quiz_option_a == this.questionlist[this.currentQuestion]?.quiz_answer){
        this.backgroundColor2="green"
      }
      else{
        this.backgroundColor2="red"
      }
      if(this.quiz_option_b == this.questionlist[this.currentQuestion]?.quiz_answer){
        this.backgroundColor3="green"
      }
      else{
        this.backgroundColor3="red"
      }
      if(this.quiz_option_c == this.questionlist[this.currentQuestion]?.quiz_answer){
        this.backgroundColor4="green"
      }
      else{
        this.backgroundColor4="red"
      }
    }
  }
  option2(event: any) {
    console.log(event)
    if (this.quiz_option_b == this.questionlist[this.currentQuestion]?.quiz_answer) {
      console.log("Ans " + this.quiz_option_b)
      this.backgroundColor2 = "green"
      this.backgroundColor1 = "red"
      this.backgroundColor3 = "red"
      this.backgroundColor4 = "red"
    }
    else {
      this.backgroundColor2 = "red"
      if(this.quiz_option_a == this.questionlist[this.currentQuestion]?.quiz_answer){
        this.backgroundColor1="green"
      }
      else{
        this.backgroundColor1="red"
      }
      if(this.quiz_option_b == this.questionlist[this.currentQuestion]?.quiz_answer){
        this.backgroundColor3="green"
      }
      else{
        this.backgroundColor3="red"
      }
      if(this.quiz_option_c == this.questionlist[this.currentQuestion]?.quiz_answer){
        this.backgroundColor4="green"
      }
      else{
        this.backgroundColor4="red"
      }
    }
  }
  option3(event: any) {
    console.log(event)
    if (this.quiz_option_c == this.questionlist[this.currentQuestion]?.quiz_answer) {
      console.log("Ans " + this.quiz_option_c)
      this.backgroundColor3 = "green"
      this.backgroundColor1 = "red"
      this.backgroundColor2 = "red"
      this.backgroundColor4 = "red"
    }
    else {
      this.backgroundColor3 = "red"
      if(this.quiz_option_a == this.questionlist[this.currentQuestion]?.quiz_answer){
        this.backgroundColor1="green"
      }
      else{
        this.backgroundColor1="red"
      }
      if(this.quiz_option_b == this.questionlist[this.currentQuestion]?.quiz_answer){
        this.backgroundColor2="green"
      }
      else{
        this.backgroundColor2="red"
      }
      if(this.quiz_option_d == this.questionlist[this.currentQuestion]?.quiz_answer){
        this.backgroundColor4="green"
      }
      else{
        this.backgroundColor4="red"
      }
    }
  }
  option4(event: any) {
    console.log(event)
    if (this.quiz_option_d == this.questionlist[this.currentQuestion]?.quiz_answer) {
      console.log("Ans " + this.quiz_option_d)
      this.backgroundColor4 = "green"
      this.backgroundColor1 = "red"
      this.backgroundColor2 = "red"
      this.backgroundColor3 = "red"
    }
    else {
      this.backgroundColor4 = "red"
      if(this.quiz_option_a == this.questionlist[this.currentQuestion]?.quiz_answer){
        this.backgroundColor1="green"
      }
      else{
        this.backgroundColor1="red"
      }
      if(this.quiz_option_b == this.questionlist[this.currentQuestion]?.quiz_answer){
        this.backgroundColor2="green"
      }
      else{
        this.backgroundColor2="red"
      }
      if(this.quiz_option_c == this.questionlist[this.currentQuestion]?.quiz_answer){
        this.backgroundColor3="green"
      }
      else{
        this.backgroundColor3="red"
      }
    }
  }




  nextQues() {
    console.log(this.quizfrom.value)
    this.currentQuestion + 1
    console.log(this.currentQuestion++)
    this.counter = 60
    this.backgroundColor1=""
    this.backgroundColor2=""
    this.backgroundColor3=""
    this.backgroundColor4=""
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




