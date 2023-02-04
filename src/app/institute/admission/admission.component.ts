import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})

export class AdmissionComponent implements OnInit {
  displayedColumns: string[] = ['admission_id', 'regist_no', 'std_name','roll_no', 'std_mobile','course_id_fk','batch_id_fk','admission_date','admission_status', 'action'];
  dataSource = new MatTableDataSource();
  count_admission:number=0;
  color: ThemePalette='primary'
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;
  paginatorRef: any;

  constructor(
    private dailog: MatDialog,
    private service:ManageService,
  ) {  }

  ngOnInit(): void { 
    this.service.get_admission().subscribe(
      (res: any) => {
        console.log(res)
        this.dataSource.data = res.data
        this.dataSource.sort = this.sort;
        this.count_admission = res.data.length
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
}


