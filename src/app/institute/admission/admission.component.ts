import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import { ManageService } from 'src/app/manage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})

export class AdmissionComponent implements OnInit {
  displayedColumns: string[] = ['admission_id', 'regist_no', 'std_name', 'roll_no', 'std_whatsapp_no', 'course_id_fk', 'batch_name', 'admission_date', 'admission_status', 'action'];
  dataSource = new MatTableDataSource();
  count_admission: number = 0;
  color: ThemePalette = 'primary'
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;
  paginatorRef: any;
  login_deatils: any
  login: any
  inst_id: any
  inst_id_for_inst_login: any
  constructor(
    private dailog: MatDialog,
    private service: ManageService,
    private router: Router
  ) {
    const institute_data = this.router.getCurrentNavigation();
    this.inst_id = institute_data?.extras
    console.log("hdcgsh" + this.inst_id)

    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    // this.inst_id = this.login.institute_id_fk
    this.inst_id_for_inst_login = this.login.inst_id
    // console.log(this.inst_id_for_inst_login)
  }

  ngOnInit(): void {
    if (this.inst_id > 0) {
      const fromdata = new FormData()
      fromdata.append("inst_id", this.inst_id)
      this.service.get_admission_by_inst_id(fromdata).subscribe(
        (res: any) => {
          console.log(res)
          this.dataSource.data = res.data
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.count_admission = res.data.length
          return
        }
      )
    }
    else {
      const fromdata = new FormData()
      fromdata.append("inst_id", this.inst_id_for_inst_login)
      this.service.get_admission_by_inst_id(fromdata).subscribe(
        (res: any) => {
          // console.log(res)
          this.dataSource.data = res.data
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.count_admission = res.data.length
        }
      )
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


