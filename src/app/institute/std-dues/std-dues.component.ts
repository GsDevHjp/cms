import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-std-dues',
  templateUrl: './std-dues.component.html',
  styleUrls: ['./std-dues.component.css']
})
export class StdDuesComponent implements OnInit {
  displayedColumns: string[] = ['enq_id', 'std_name', 'course', 'batch', 'current_dues', 'mobile', 'image', 'action'];
  dataSource = new MatTableDataSource();
  count_dues: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;
  imgUrl: string = 'http://localhost/cms/src/assets/';

  constructor(
    private dailog: MatDialog,
  ) { }

  ngOnInit(): void {

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}