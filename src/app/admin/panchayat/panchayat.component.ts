import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { AddEditPanchayatComponent } from '../add-edit-panchayat/add-edit-panchayat.component';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';
import { Router } from '@angular/router';
@Component({
  selector: 'app-panchayat',
  templateUrl: './panchayat.component.html',
  styleUrls: ['./panchayat.component.css']
})
export class PanchayatComponent implements OnInit {
  displayedColumns: string[] = ['panchayat_id', 'country', 'state','district','block','panchayat', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  panchayat_count = 0
  constructor(
    private dailog: MatDialog,
    private manageservice: ManageService,
    private popup:NgToastService,
    private route :Router,
    private ConfirmServices:NgConfirmService, 
    
  ) { }

  ngOnInit(): void {
    this.manageservice.get_panchayat().subscribe(
      (blockdata: any) => {
        console.log(blockdata)
        this.dataSource = new MatTableDataSource(blockdata.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.panchayat_count = blockdata.data.lenght
      }
    )
  }
  add_panchayat() {
    this.dailog.open(AddEditPanchayatComponent, {
      disableClose: true
    });
  }
  edit_panchayat(row: any) {
    this.dailog.open(AddEditPanchayatComponent, {
      data: row
    });
  }
  delete_panchayat(row:any){
    this.ConfirmServices.showConfirm('Are You Sure To Delete',  
  () =>{
    const deletedata = new FormData();
    deletedata.append(' panchayat_id',row. panchayat_id);
    this.manageservice.delete_panchayat(deletedata).subscribe(
      (res:any) =>{
        this.popup.success({detail:'Success',summary:'Panchayat  Delete',})
        this.route.navigate(['/institutehome/panchayat']);

      }
    )  
  },
  ( )=>{
    this.popup.error({ detail: 'Unsuccess', summary: 'Panchayat Not Deleted', })
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
