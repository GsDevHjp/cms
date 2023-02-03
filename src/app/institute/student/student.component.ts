import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { AddEditStudentComponent } from '../add-edit-student/add-edit-student.component';
import { AddEditPaymentRecivedComponent } from '../add-edit-payment-recived/add-edit-payment-recived.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  displayedColumns: string[] = ['std_id', 'institute_id_fk', 'std_name', 'std_whatsapp_no', 'std_aadhar', 'std_email', 'std_regist_date', 'std_photo', 'action'];
  dataSource = new MatTableDataSource();
  count_student: number = 0;
  inst_id: any
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  imgUrl: string = 'https://greensoft.net.in/gscms/assets/';

  constructor(
    private dailog: MatDialog,
    private service: ManageService,
    private router: Router
  ) {
    const institute_data = this.router.getCurrentNavigation();
    this.inst_id = institute_data?.extras
  }

  ngOnInit(): void {
    if (this.inst_id > 0) {
      const instformdata = new FormData()
      instformdata.append('inst_id', this.inst_id)
      this.service.get_student_by_inst_id(instformdata).subscribe(
        (result: any) => {
          console.log(result)
          this.dataSource.data = result.data
          this.dataSource.sort = this.sort;
          this.count_student = result.data.length
          return
        }
      )
    }
    else {
      this.service.get_student().subscribe(
        (res: any) => {
          console.log(res)
          this.dataSource.data = res.data
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.count_student = res.data.length
        }
      )
    }
  }

  add_student(): any {
    this.dailog.open(AddEditStudentComponent, {
      disableClose: true
    });
  }
  fee_pay(): any {
    this.dailog.open(AddEditPaymentRecivedComponent, {
      disableClose: true
    });
  }

  edit_student(row: any) {
    this.dailog.open(AddEditStudentComponent, {
      data: row,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

