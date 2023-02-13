import { Component, OnInit } from '@angular/core';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-quiz-dashboard',
  templateUrl: './quiz-dashboard.component.html',
  styleUrls: ['./quiz-dashboard.component.css']
})
export class QuizDashboardComponent implements OnInit {
  course_count:number=0
  course_name:any
  constructor(
    private service: ManageService
  ) { }

  ngOnInit(): void {
    this.service.get_dashboad().subscribe(
      (res: any) => {
        console.log(res)
        this.course_count=res.data.course_tbl
    
      }
    )
    this.service.get_quiz().subscribe(
      (res: any) => {
        console.log(res)
        this.course_name = res.data[0].course_id_fk
      }
    )
  }
}
