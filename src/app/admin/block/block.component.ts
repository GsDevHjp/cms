import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { AddEditBlockComponent } from '../add-edit-block/add-edit-block.component';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  displayedColumns: string[] = ['block_id', 'country', 'state','district','block', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  block_count = 0
  constructor(
    private dailog: MatDialog,
    private manageservice: ManageService,
    private ConfirmServices:NgConfirmService,
    private popup: NgToastService,
    private route:Router
  ) { }

  ngOnInit(): void {
    this.manageservice.get_block().subscribe(
      (blockdata: any) => {
        console.log(blockdata)
        this.dataSource = new MatTableDataSource(blockdata.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.block_count = blockdata.data.lenght
      }
    )
  }
  add_block() {
    this.dailog.open(AddEditBlockComponent, {
      disableClose: true
    });
  }
  edit_block(row: any) {
    this.dailog.open(AddEditBlockComponent, {
      data: row
    });
  }

  delete_block(row:any){
    this.ConfirmServices.showConfirm('Are You Sure To Delete',  
  () =>{
    const deletedata = new FormData();
    deletedata.append('block_id',row.block_id);
    this.manageservice.delete_block(deletedata).subscribe(
      (res:any) =>{
        this.popup.success({detail:'Success',summary:' Block  Delete',})
        this.route.navigate(['/institutehome/block']);

      }
    )  
  },
  ( )=>{
    this.popup.error({ detail: 'Unsuccess', summary: 'Block Not Deleted', })
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
