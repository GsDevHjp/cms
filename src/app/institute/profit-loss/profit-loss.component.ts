import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ManageService } from 'src/app/manage.service';
@Component({
  selector: 'app-profit-loss',
  templateUrl: './profit-loss.component.html',
  styleUrls: ['./profit-loss.component.css']
})
export class ProfitLossComponent implements OnInit {
  displayedColumns: string[] = ['enq_id', 'std_name', 'std_whatsapp_no', 'course_id_fk', 'std_gender', 'std_address', 'std_regist_date', 'action'];
  dataSource = new MatTableDataSource();
  count_enquiry: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;
  login_deatils: any;
  login: any
  inst_id: any
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
    this.inst_id = this.login.inst_id
    console.log("inst" + this.login.inst_id)
  }

  ngOnInit(): void {
    // const fromdata = new FormData()
    // fromdata.append('inst_id', this.login.inst_id)
    // this.service.get_enquiry_by_inst_id(fromdata).subscribe(
    //   (res: any) => {
    //     console.log(res)
    //     this.dataSource.data = res.data
    //     this.dataSource.sort = this.sort;
    //     this.dataSource.paginator = this.paginator;
    //     this.count_enquiry = res.data.length
    //   }
    // )
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}