import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddEditEmployeeComponent } from '../add-edit-employee/add-edit-employee.component';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { ManageService } from 'src/app/manage.service';
import { NgConfirmService } from 'ng-confirm-box';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  url: string = 'assets/'
  displayedColumns: string[] = ['slno', 'emp_name', 'emp_whatsapp', 'emp_aadhar_no', 'emp_photo', 'emp_address', 'Action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  login_deatils:any
  login:any
  count_emp: Number = 0
  constructor(
    private addemp: MatDialog,
    private popup: NgToastService,
    private router: Router,
    private services: ManageService,
    private confirmServices: NgConfirmService

    

  ) {
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
   }

  ngOnInit(): void {
    const formdata = new FormData()
    formdata.append('inst_id',this.login.inst_id)
    this.services.get_emp_by_inst_id(formdata).subscribe(
      (itemresult: any) => {
        console.log(itemresult)
        this.count_emp = itemresult.data.length
        this.dataSource = new MatTableDataSource(itemresult.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      }
    )
  }
  add_Employee(): any {
    this.addemp.open(AddEditEmployeeComponent, {
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.ngOnInit();
      }
    })
  }
  editEmp(row: any) {
    this.addemp.open(AddEditEmployeeComponent, {
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.ngOnInit();
      }
    })
  }  
  del_emp(row: any){
  this.confirmServices.showConfirm('Are You Sure To Delete',
      () => {
        const deldata = new FormData();
        deldata.append('emp_id', row.emp_id);
        this.services.delete_employee(deldata).subscribe(
          (res: any) => {
            console.log(res)
            this.popup.success({ detail: 'Success', summary: 'Employee Deleted', })
            this.router.navigate(['/institutehome/employee']);
          }
        )
      },
      () => {
        this.popup.error({ detail: 'Unsuccess', summary: 'Employee Not Deleted', })
      })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  PrintThisPage() {
    AddEditEmployeeComponent
  }
}






