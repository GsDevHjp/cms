import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddEditEnquiryComponent } from '../add-edit-enquiry/add-edit-enquiry.component';
import { AddEditTakeAddmissionComponent } from 'src/app/student/add-edit-take-addmission/add-edit-take-addmission.component';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {
  displayedColumns: string[] = ['enq_id', 'enq_name', 'enq_father_name', 'enq_mobile', 'course_id_fk', 'enq_gender', 'enq_address', 'enq_date', 'action'];
  dataSource = new MatTableDataSource();
  count_enquiry: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;

  constructor(
    private dailog: MatDialog,
    private router: Router,
    private service:ManageService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    this.service.get_enquiry().subscribe(
      (res: any) => {
        console.log(res)
        this.dataSource.data = res.data
        this.dataSource.sort = this.sort;
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

  admission_form(data:any){
   this.dailog.open(AddEditTakeAddmissionComponent,{
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
