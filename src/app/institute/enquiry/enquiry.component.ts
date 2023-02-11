import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddEditEnquiryComponent } from '../add-edit-enquiry/add-edit-enquiry.component';
import { ManageService } from 'src/app/manage.service';
import { AddEditStudentComponent } from '../add-edit-student/add-edit-student.component';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {
  displayedColumns: string[] = ['enq_id', 'std_name', 'std_father_name', 'std_whatsapp_no', 'course_id_fk', 'std_gender', 'std_address', 'std_regist_date', 'action'];
  dataSource = new MatTableDataSource();
  count_enquiry: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;

  constructor(
    private dailog: MatDialog,
    private router: Router,
    private service: ManageService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.inst_id
    console.log("inst" + this.login.inst_id)
  }

  ngOnInit(): void {
    this.service.get_enquiry().subscribe(
      (res: any) => {
        console.log(res)
        this.dataSource.data = res.data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.count_enquiry = res.data.length
      }
    )
  }

  add_enquiry() {
    this.dailog.open(AddEditEnquiryComponent, {
      disableClose: true,
      panelClass: 'formdilog'
    });
  }

  edit_enquiry(row: any) {
    this.dailog.open(AddEditEnquiryComponent, {
      data: row,
    });
  }

  admission_form(row: any) {
    this.dailog.open(AddEditStudentComponent, {
      data: row,
      disableClose: true,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
