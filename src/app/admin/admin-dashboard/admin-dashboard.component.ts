import { Component, OnInit } from '@angular/core';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  institute_count:number=0
  course_count:number=0
  batch_count:number=0
  student_count:number=0
  admission_count:number=0
  dues_count:number=0
  received_count:number=0
  setting_count:number=0
  constructor(
    private services:ManageService
  ) { }

  ngOnInit(): void {
    this.services.get_dashboad().subscribe(
      (res: any) => {
        console.log(res)
        this.institute_count=res.data.institute_tbl
        this.course_count=res.data.course_tbl
        this.batch_count=res.data.batch_tbl
        this.student_count=res.data.student_tbl
        this.admission_count=res.data.admission_tbl
        this.dues_count=res.data.dues_tbl
        this.received_count=res.data.fee_tbl
      })
  }

}
