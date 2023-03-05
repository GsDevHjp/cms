import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { formatDate } from '@angular/common';
import { AddEditPaymentRecivedComponent } from '../add-edit-payment-recived/add-edit-payment-recived.component';

@Component({
  selector: 'app-std-dues',
  templateUrl: './std-dues.component.html',
  styleUrls: ['./std-dues.component.css']
})
export class StdDuesComponent implements OnInit {
  displayedColumns: string[] = ['enq_id', 'std_name','std_reg','roll_no', 'mobile','course', 'batch', 'current_dues', 'date', 'image','action'];
  dataSource = new MatTableDataSource();
  count_dues: number = 0;
  imgUrl: string = 'https://greensoft.net.in/gscms/assets/'; 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;
  login_deatils:any
  login:any
  constructor(
    private dailog: MatDialog,
    private servies:ManageService
  ) {

    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
      console.log(this.login.inst_id)
   }

  ngOnInit(): void {
    const fromdata =  new  FormData()
    fromdata.append('inst_id',this.login.inst_id)
      this.servies.get_dues_by_inst_id(fromdata).subscribe(
        (res:any)=>{
          console.log(res.data)
          this.dataSource.data = res.data
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.count_dues = res.data.length
        }
      )
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onpaymet(row:any){
    this.dailog.open(AddEditPaymentRecivedComponent,{
      data: row,
     
    }
      
      )
  }
}