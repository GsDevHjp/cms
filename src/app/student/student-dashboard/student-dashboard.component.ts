import { Component, OnInit } from '@angular/core';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  course_count:number=0
  batch_count:number=0
  admission_count:number=0
  fee_count:number=0
  dues_count:number=0
  query_count:number=0
  online_test_count:number=0
  result_count:number=0
  quiz_count:number=0
  setting_count:number=0
  login_deatils:any
  login:any
  inst_id:any
  constructor(
    private services:ManageService
  ) { }

  ngOnInit(): void {
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.institute_id_fk
    const formdata =  new FormData()
    formdata.append("inst_id", this.inst_id)
    this.services.get_dashboad(formdata).subscribe(
      (res: any) => {
        console.log(res)
        this.course_count=res.data.course_tbl
        this.batch_count=res.data.batch_tbl
        this.admission_count=res.data.admission_tbl
        this.fee_count=res.data.fee_tbl
        this.dues_count=res.data.dues_tbl
        this.query_count=res.data.query_tbl
        this.quiz_count=res.data.quiz_tbl
      })
  }

}