import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ManageService } from 'src/app/manage.service';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {

  displayedColumns: string[] = ['no', 'std_name','std_father_name','std_contact_no', 'std_village', 'std_rigistration_no', 'std_center_code','std_total_marks', 'course_id_fk', 'std_image', 'action'];
  dataSource = new MatTableDataSource();
  count_notification: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  cer_count: string = "0"
  imgUrl: string = 'assets/certificate/';
  inst_id :any
  login:any
  login_deatils:any
    constructor(
    private service:ManageService,
    private confirmServices:NgConfirmService,
    private popup:NgToastService,
    private router:Router,

  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };


    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.inst_id
  }

  ngOnInit(): void { 
   const fromdata  =  new FormData ()
   fromdata.append('inst_id',this.inst_id)
    this.service.get_certificate_by_inst_id(fromdata).subscribe(
      (result: any) => {
        console.log(result)
        this.dataSource.data = result.data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.cer_count = result.data.length
      }
    )
  }

  certificate_edit(row: any) {
      this.router.navigate(['/institutehome/add_edit_certificate'], row)
     
  }

  certificate_delete(row: any) {
    this.confirmServices.showConfirm('Are You Sure To Delete',
      () => {
        const deldata = new FormData();
        deldata.append('certificate_id', row.certificate_id);
        this.service.certificate_delete(deldata).subscribe(
          (res: any) => {
            console.log(res)
            this.popup.success({ detail: 'Success', summary: 'Certificate Deleted', })
            this.router.navigate(['/institutehome/certificate']);
          }
        )
      },
      () => {
        this.popup.error({ detail: 'Unsuccess', summary: 'Certificate Not Deleted', })
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




