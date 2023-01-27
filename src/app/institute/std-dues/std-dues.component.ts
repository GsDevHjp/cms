import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
export interface Userdata {
  enq_id: number;
  std_name: string;
  course: string;
  mobile: number;
  batch: string;
  current_dues: string;
  date: string;
}

const Userdata: Userdata[] = [
  { enq_id: 1, std_name: 'Ayush', course: 'MCA', mobile: 9856232154, batch: 'HTML', current_dues: '20', date: '20-02-2023'},
  { enq_id: 1, std_name: 'Munna', course: 'BCA', mobile: 9856232154, batch: 'CSS', current_dues: '90', date: '24-01-2023'},
  { enq_id: 1, std_name: 'Sahil', course: 'BCA', mobile: 9856232154, batch: 'HTML', current_dues: '28', date: '20-02-2023'},
];

@Component({
  selector: 'app-std-dues',
  templateUrl: './std-dues.component.html',
  styleUrls: ['./std-dues.component.css']
})
export class StdDuesComponent implements OnInit {
  displayedColumns: string[] = ['enq_id', 'image', 'std_name', 'mobile', 'course', 'batch', 'current_dues', 'action'];
  dataSource = new MatTableDataSource(Userdata);
  count_dues: number=0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;
  imgUrl:string = 'http://localhost/cms/src/assets/';

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