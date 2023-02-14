import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-quiz-dashboard',
  templateUrl: './quiz-dashboard.component.html',
  styleUrls: ['./quiz-dashboard.component.css']
})
export class QuizDashboardComponent implements OnInit {
  course_count: any;
  course_name: any;
  login_deatils:any
  login:any
  inst_id:any
  course_quiz:any
  course_data:any
  constructor(
    private router:Router,
    private service: ManageService
  ) { 
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.institute_id_fk
  }


  ngOnInit(): void {
    const formdata =  new FormData()
   formdata.append("inst_id",this.inst_id)
    this.service.get_quiz_course(formdata).subscribe(
      (res: any) => {
        console.log(res.data)
        this.course_quiz  =  res.data
      
      }
    )
  }

  onQuiz(event:any){
    this.router.navigate(['/studenthome/quiz'] ,event )
  }
}
