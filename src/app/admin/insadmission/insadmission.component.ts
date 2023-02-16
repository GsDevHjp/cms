import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insadmission',
  templateUrl: './insadmission.component.html',
  styleUrls: ['./insadmission.component.css']
})
export class InsadmissionComponent implements OnInit {

  displayedColumns: string[] = ['institute_id', 'institute_name', 'institute_owner', 'institute_whatsapp', 'institute_email', 'institute_state', 'institute_district', 'total_admission'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  admission_count: any
  constructor(
    private dailog: MatDialog,
    private manageservice: ManageService,
    private route: Router
  ) {
  }

  ngOnInit(): void {
    this.manageservice.institute_view().subscribe(
      (instdata: any) => {
        console.log(instdata)
        this.dataSource = new MatTableDataSource(instdata.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.admission_count = instdata.data.length
      }
    )
  }

  get_admission(row: any) {
    // console.log(row.inst_id)
    this.route.navigate(['/adminhome/insadmission/admission'], row.inst_id)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

