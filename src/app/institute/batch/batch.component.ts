import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AddEditBatchComponent } from '../add-edit-batch/add-edit-batch.component';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {
  displayedColumns: string[] = ['batch_id', 'batch_name', 'course_id_fk', 'batch_date', 'batch_arrival', 'batch_departure','batch_total_std', 'batch_status','action'];
  dataSource = new MatTableDataSource();
  count_batch:number=0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;

  constructor(
    private dailog: MatDialog,
    private router: Router,
    private service:ManageService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    this.service.get_batch().subscribe(
      (res: any) => {
        console.log(res)
        this.dataSource.data = res.data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.count_batch = res.data.length
      }
    )
  }

  add_batch(): any {
    this.dailog.open(AddEditBatchComponent, {
      disableClose: true
    });
  }

  batch_edit(row: any) {
    this.dailog.open(AddEditBatchComponent, {
      data: row,
    });
  }
  batch_delete(row: any) {
    if (confirm("Are you sure to delate")) {
      const deldata = new FormData();
      deldata.append('batch_id', row.batch_id);
      this.service.batch_delete(deldata).subscribe(
        (res: any) => {
          alert('data delate sucessfully')
        }
      )
    }
    else {
      alert('cancle')
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

