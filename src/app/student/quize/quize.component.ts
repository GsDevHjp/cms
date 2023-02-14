import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  hidden: boolean = true;
  course_data:any
  inst_id:any
  constructor(
    private service: ManageService,
    private router:Router
  ) { 

    const navigation = this.router.getCurrentNavigation();
    this.course_data = navigation?.extras
  }
  ngOnInit(): void {
    const fromdata =  new FormData()
    fromdata.append("course_id",this.course_data.course_id)
    fromdata.append("inst_id", this.course_data.institute_id_fk)
    this.service.get_quiz_by_inst_id(fromdata).subscribe(
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




