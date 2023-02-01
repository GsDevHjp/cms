import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AddEditInstBookComponent } from '../add-edit-inst-book/add-edit-inst-book.component';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-inst-book',
  templateUrl: './inst-book.component.html',
  styleUrls: ['./inst-book.component.css']
})
export class InstBookComponent implements OnInit {
  displayedColumns: string[] = ['book_id', 'course_id_fk', 'inst_book_title', 'inst_book_description','institute_id_fk','inst_book_img', 'action'];
  dataSource = new MatTableDataSource();
  count_inst_book:number=0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  imgUrl :string = 'assets/';


  constructor(
    private dailog: MatDialog,
    private router: Router,
    private service:ManageService,
    
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    this.service.get_inst_book_view().subscribe(
      (res:any)=>{
        console.log(res)
        this.dataSource.data = res.data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.count_inst_book = res.data.length
      }
    )
  }

  add_batch(): any {
    this.dailog.open(AddEditInstBookComponent, {
      disableClose: true
    });
  }

  batch_edit(row: any) {
    this.dailog.open(AddEditInstBookComponent, {
      data: row,
    });
  }
  
  inst_book_delete(row:any){
    if (confirm("Are you sure to delate")) {
      const deldata = new FormData();
      deldata.append('inst_book_id', row.inst_book_id);
      this.service.inst_book_delete(deldata).subscribe(
        (res: any) => {
          console.log(res)
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

