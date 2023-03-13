import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { AddEditDistrictComponent } from '../add-edit-district/add-edit-district.component';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  displayedColumns: string[] = ['district_id', 'country', 'state','district', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  district_count = 0
  constructor(
    private dailog: MatDialog,
    private route: Router,
    private manageservice: ManageService,
    private ConfirmServices:NgConfirmService,
    private popup: NgToastService,
  ) { }

  ngOnInit(): void {
    this.manageservice.get_district().subscribe(
      (districtdata: any) => {
        console.log(districtdata)
        this.dataSource = new MatTableDataSource(districtdata.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.district_count = districtdata.data.lenght
      }
    )
  }
  add_district() {
    this.dailog.open(AddEditDistrictComponent, {
      disableClose: true
    });
  }
  edit_district(row: any) {
    this.dailog.open(AddEditDistrictComponent, {
      data: row
    });
  }
  delete_district(row:any){
    this.ConfirmServices.showConfirm('Are You Sure To Delete',  
  () =>{
    const deletedata = new FormData();
    deletedata.append('district_id',row. district_id);
    this.manageservice.delete_district(deletedata).subscribe(
      (res:any) =>{
        this.popup.success({detail:'Success',summary:' District  Delete',})
        this.route.navigate(['/institutehome/district']);

      }
    )  
  },
  ( )=>{
    this.popup.error({ detail: 'Unsuccess', summary: 'State Not Deleted', })
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
