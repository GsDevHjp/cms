import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AddEditPaymentRecivedComponent } from '../add-edit-payment-recived/add-edit-payment-recived.component';

export interface Userdata {
  payment_id: number;
  std_name: string;
  std_mobile: number;
  payment_course: string;
  payment_batch: string;
  payment_date: string;
  payment_received_amount:number;
  payment_description: string;
}

const Userdata: Userdata[] = [
 { payment_id: 0, std_mobile: 9865231245, std_name: 'Ayush', payment_course:'MCA', payment_batch: 'HTML', payment_date: '20-02-2023', payment_received_amount: 480, payment_description: 'hjp' },
 { payment_id: 0, std_mobile: 9865231245, std_name: 'Ayush', payment_course:'MCA', payment_batch: 'HTML', payment_date: '20-02-2023', payment_received_amount: 480, payment_description: 'hjp' },
 { payment_id: 0, std_mobile: 9865231245, std_name: 'Ayush', payment_course:'MCA', payment_batch: 'HTML', payment_date: '20-02-2023', payment_received_amount: 480, payment_description: 'hjp' },
];
@Component({
  selector: 'app-payment-received',
  templateUrl: './payment-received.component.html',
  styleUrls: ['./payment-received.component.css']
})
export class PaymentReceivedComponent implements OnInit {

  displayedColumns: string[] = ['payment_id', 'std_name', 'std_mobile', 'payment_course', 'payment_batch','payment_received_amount', 'payment_description','payment_image', 'payment_date', 'action'];
  dataSource = new MatTableDataSource(Userdata);
  count_payment: number =0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;
  imgUrl:string = 'http://localhost/cms/src/assets/';

  constructor(
    private dailog: MatDialog,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {}

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
