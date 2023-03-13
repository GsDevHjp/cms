import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { AddEditWardComponent } from '../add-edit-ward/add-edit-ward.component';
import { NgConfirmService } from 'ng-confirm-box';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-ward',
  templateUrl: './ward.component.html',
  styleUrls: ['./ward.component.css']
})
export class WardComponent implements OnInit {
  displayedColumns: string[] = ['ward_id', 'country', 'state','district','block','panchayat','ward', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ward_count = 0
  constructor(
    private dailog: MatDialog,
    private manageservice: ManageService,
    private route:Router,
    private ConfirmServices:NgConfirmService,
    private popup:NgToastService
  ) { }

  ngOnInit(): void {
    this.manageservice.get_ward().subscribe(
      (blockdata: any) => {
        console.log(blockdata)
        this.dataSource = new MatTableDataSource(blockdata.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.ward_count = blockdata.data.lenght
      }
    )
  }
  add_ward() {
    this.dailog.open(AddEditWardComponent, {
      disableClose: true
    });
  }
  edit_ward(row: any) {
    this.dailog.open(AddEditWardComponent, {
      data: row
    });
  }

  delete_ward(row:any){
    this.ConfirmServices.showConfirm('Are You Sure To Delete',  
  () =>{
    const deletedata = new FormData();
    deletedata.append('ward_id',row.ward_id);
    this.manageservice.delete_state(deletedata).subscribe(
      (res:any) =>{
        this.popup.success({detail:'Success',summary:'Ward  Delete',})
        this.route.navigate(['/institutehome/ward']);

      }
    )  
  },
  ( )=>{
    this.popup.error({ detail: 'Unsuccess', summary: 'Ward Not Deleted', })
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
