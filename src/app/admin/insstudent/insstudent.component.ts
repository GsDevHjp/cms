import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-insstudent',
  templateUrl: './insstudent.component.html',
  styleUrls: ['./insstudent.component.css']
})
export class InsstudentComponent implements OnInit {

  displayedColumns: string[] = ['institute_id', 'institute_name', 'institute_owner', 'institute_whatsapp', 'institute_email', 'institute_address', 'total_student',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  std_count: any
  constructor(
    private dailog: MatDialog,
    private manageservice: ManageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.manageservice.institute_view().subscribe(
      (instdata: any) => {
        console.log(instdata)
        this.dataSource = new MatTableDataSource(instdata.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.std_count = instdata.data.length
      }
    )
  }

  get_student(row: any) {
    this.router.navigate(['/adminhome/insstudent/student'],row.inst_id)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

