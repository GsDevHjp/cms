import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddEditEnquiryComponent } from '../add-edit-enquiry/add-edit-enquiry.component';
import { AddEditTakeAddmissionComponent } from 'src/app/student/add-edit-take-addmission/add-edit-take-addmission.component';

export interface Userdata {
  enq_id: number;
  enq_mobile: number;
  enq_name: string;
  enq_father_name:string;
  half_fee: number;
  course_id: string;
  enq_date: string;
  gender:string;
  enq_address:string;
}

const Userdata: Userdata[] = [
  {enq_id: 1, enq_mobile: 9865231245, enq_name: 'Sohan Kumar', enq_father_name:'Mohan Singh', half_fee:750,course_id:'MCA',enq_date:'20-02-2023',gender:'Male',enq_address:'hjp'},
  {enq_id: 1, enq_mobile: 9865231245, enq_name: 'Sohan Kumar', enq_father_name:'Mohan Singh', half_fee:750,course_id:'MCA',enq_date:'20-02-2023',gender:'Male',enq_address:'hjp'},
  {enq_id: 1, enq_mobile: 9865231245, enq_name: 'Sohan Kumar', enq_father_name:'Mohan Singh', half_fee:750,course_id:'MCA',enq_date:'20-02-2023',gender:'Male',enq_address:'hjp'},
  {enq_id: 1, enq_mobile: 9865231245, enq_name: 'Sohan Kumar', enq_father_name:'Mohan Singh', half_fee:750,course_id:'MCA',enq_date:'20-02-2023',gender:'Male',enq_address:'hjp'},
  {enq_id: 1, enq_mobile: 9865231245, enq_name: 'Sohan Kumar', enq_father_name:'Mohan Singh', half_fee:750,course_id:'MCA',enq_date:'20-02-2023',gender:'Male',enq_address:'hjp'},
  
];
@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {
  displayedColumns: string[] = ['enq_id', 'enq_name', 'enq_father_name', 'enq_mobile', 'course_id', 'gender', 'enq_address', 'enq_date', 'action'];
  dataSource = new MatTableDataSource(Userdata);
  count_enquiry: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;

  constructor(
    private dailog: MatDialog,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
   
  }

  add_enquiry() {
    this.dailog.open(AddEditEnquiryComponent, {
      disableClose: true,
      panelClass: 'formdilog'
    });
  }

  edit_enquiry(row: any) {
    this.dailog.open(AddEditEnquiryComponent, {
      data: row,
    });
  }

  admission_form(data:any){
   this.dailog.open(AddEditTakeAddmissionComponent,{
    disableClose: true,
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
