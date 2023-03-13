import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { AddEditStateComponent } from '../add-edit-state/add-edit-state.component';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  displayedColumns: string[] = ['state_id', 'country', 'state', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  state_count = 0
  constructor(
    private dailog: MatDialog,
    private manageservice: ManageService,
    private route :Router,
    private ConfirmServices:NgConfirmService,   
    private popup: NgToastService,
  ) { }

  ngOnInit(): void {
    this.manageservice.get_state().subscribe(
      (instdata: any) => {
        console.log(instdata)
        this.dataSource = new MatTableDataSource(instdata.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.state_count = instdata.data.length
      }
    )
  }
  add_state() {
    this.dailog.open(AddEditStateComponent, {
      disableClose: true
    });
  }
  edit_state(row: any) {
    this.dailog.open(AddEditStateComponent, {
      data: row
    });
  }


  delete_state(row:any){
    this.ConfirmServices.showConfirm('Are You Sure To Delete',  
  () =>{
    const deletedata = new FormData();
    deletedata.append('state_id',row.state_id);
    this.manageservice.delete_state(deletedata).subscribe(
      (res:any) =>{
        this.popup.success({detail:'Success',summary:'State  Delete',})
        this.route.navigate(['/institutehome/state']);

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
