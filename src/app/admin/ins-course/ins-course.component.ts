import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddEditInstituteComponent } from '../add-edit-institute/add-edit-institute.component';
import { ManageService } from 'src/app/manage.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-ins-course',
  templateUrl: './ins-course.component.html',
  styleUrls: ['./ins-course.component.css']
})
export class InsCourseComponent implements OnInit {
  displayedColumns: string[] = ['institute_id', 'institute_name', 'institute_owner', 'institute_whatsapp', 'institute_email', 'total_course',];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  course_count: any
  total_course_count: any;
  constructor(
    private dailog: MatDialog,
    private manageservice: ManageService,
    private route: Router
  ) {
  }

  ngOnInit(): void {
    this.manageservice.institute_view().subscribe(
      (instdata: any) => {
        console.log(instdata)
        this.dataSource = new MatTableDataSource(instdata.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.course_count = instdata.data.length
      }
    )

  }

  add_Institute() {
    this.dailog.open(AddEditInstituteComponent, {
      disableClose: true
    });
  }

  get_course(row: any) {
    console.log(row.inst_id)
    this.route.navigate(['/adminhome/inscourse/course'],row.inst_id)
  }




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

