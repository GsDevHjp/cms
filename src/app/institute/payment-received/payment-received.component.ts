import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AddEditPaymentRecivedComponent } from '../add-edit-payment-recived/add-edit-payment-recived.component';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-payment-received',
  templateUrl: './payment-received.component.html',
  styleUrls: ['./payment-received.component.css']
})
export class PaymentReceivedComponent implements OnInit {

  displayedColumns: string[] = ['payment_id', 'std_father_name', 'std_whatsapp_no', 'course_id_fk', 'batch_id_fk', 'fee_amount', 'fee_description', 'std_img', 'fee_date', 'action'];
  dataSource = new MatTableDataSource();
  count_payment: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;
  imgUrl :string = 'https://greensoft.net.in/gscms/assets/';
  action_btn: boolean = false
  login_deatils: any
  login: any
  inst_id: any
  std_id: any;
  constructor(
    private dailog: MatDialog,
    private router: Router,
    private service: ManageService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.std_id = this.login.std_id
    console.log("std"+ this.std_id)
    console.log("instsd"+ this.login.inst_id)
  }

  ngOnInit(): void {
    if (this.login.inst_id > 0) {
      this.action_btn = false
      const fromdata = new FormData()
      fromdata.append("inst_id",this.login.inst_id)
      this.service.get_fee_by_inst_id(fromdata).subscribe(
        (res: any) => {
         
          console.log(res)
          this.dataSource.data = res.data
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.count_payment = res.data.length
        }
      )
    }
    else {
      const fromdata = new FormData()
      fromdata.append("std_id",this.login.std_id)
      this.service.get_fee_by_std_id(fromdata).subscribe(
        (res: any) => {
          console.log(res)
          this.dataSource.data = res.data
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.count_payment = res.data.length
        }
      )
    }
   
  }
  add_payment() {
    this.dailog.open(AddEditPaymentRecivedComponent, {
      disableClose: true,
      panelClass: 'formdilog'
    });
  }

  edit_enquiry(row: any) {
    this.dailog.open(AddEditPaymentRecivedComponent, {
      data: row,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
