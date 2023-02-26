import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddEditInstituteComponent } from '../add-edit-institute/add-edit-institute.component';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';
import { Router } from '@angular/router';

@Component({
  selector: 'app-institute',
  templateUrl: './institute.component.html',
  styleUrls: ['./institute.component.css']
})

export class InstituteComponent implements OnInit {
  imageUrl: string = 'https://greensoft.net.in/gscms/assets/'
  displayedColumns: string[] = ['inst_id', 'institute_name', 'institute_owner', 'institute_whatsapp', 'institute_email', 'institute_password', 'institute_address', 'institute_identity', 'document_no', 'institute_logo', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  inst_count: any;

  constructor(
    private dailog: MatDialog,
    private manageservice: ManageService,
    private popup: NgToastService,
    private confirmServices: NgConfirmService,
    private router: Router,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    this.manageservice.institute_view().subscribe(
      (instdata: any) => {
        console.log(instdata)
        this.dataSource = new MatTableDataSource(instdata.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.inst_count = instdata.data.length
      }
    )
  }

  add_Institute() {
    this.dailog.open(AddEditInstituteComponent, {
      disableClose: true
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit_inst(row: any) {
    this.dailog.open(AddEditInstituteComponent, {
      data: row
    });
  }

  deleteinst(row: any) {
    this.confirmServices.showConfirm('Are you sure to delate',
      () => {
        const deletedata = new FormData();
        deletedata.append('inst_id', row.inst_id);
        this.manageservice.delete_inst(deletedata).subscribe(
          (res: any) => {
            console.log(res)
            this.popup.success({ detail: 'Success', summary: 'Institute Deleted', })
            this.router.navigate(['/adminhome/institute']);
          }
          )
      },
      () => {
        this.popup.error({ detail: 'Unsuccess', summary: 'Institute Not Deleted', })
      })
  }



}
