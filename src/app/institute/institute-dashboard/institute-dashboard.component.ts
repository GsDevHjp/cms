import { Component, OnInit } from '@angular/core';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-institute-dashboard',
  templateUrl: './institute-dashboard.component.html',
  styleUrls: ['./institute-dashboard.component.css']
})
export class InstituteDashboardComponent implements OnInit {
  course_count:number=0
  batch_count:number=0
  student_count:number=0
  admission_count:number=0
  enquiry_count:number=0
  fee_count:number=0
  dues_count:number=0
  quiz_count:number=0
  oes_count:number=0 
  elearning_count:number=0
  query_count:number=0
  notification_count:number=0
  book_count:number=0
  notes_count:number=0
  syllabus_count:number=0
  question_count:number=0
  login_deatils:any
  login:any
  inst_id:any
  constructor(
    private services: ManageService
  ) { }

  ngOnInit(): void {
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.inst_id
    const formdata =  new FormData()
    formdata.append("inst_id", this.inst_id)
    this.services.get_dashboad(formdata).subscribe(
      (res: any) => {
        console.log(res)
        this.course_count=res.data.course_tbl
        this.batch_count=res.data.batch_tbl
        this.student_count=res.data.student_tbl
        this.admission_count=res.data.admission_tbl
        this.enquiry_count=res.data.enquiry_tbl
        this.fee_count=res.data.fee_tbl
        this.dues_count=res.data.dues_tbl
        this.quiz_count=res.data.quiz_tbl
        this.query_count=res.data.query_tbl
        this.notification_count=res.data.notification_tbl
        this.book_count=res.data.inst_book_tbl
        this.notes_count=res.data.inst_notes_tbl
        this.syllabus_count=res.data.inst_syllabus_tbl
        this.question_count=res.data.inst_question_bank_tbl
      }
    )
  }

}
