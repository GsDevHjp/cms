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
  displayedColumns: string[] = ['book_id', 'course_id_fk', 'inst_book_title', 'inst_book_description','inst_book_img', 'action'];
  dataSource = new MatTableDataSource();
  count_inst_book:number=0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  imgUrl :string = 'https://greensoft.net.in/gscms/assets/';
  login_deatils: any
  login: any
  inst_id:any
  inst_id_for_inst_login: any
  constructor(
    private dailog: MatDialog,
    private router: Router,
    private service:ManageService,
    
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.institute_id_fk
    this.inst_id_for_inst_login = this.login.inst_id
  }

  ngOnInit(): void {
    const formdata = new FormData()
    formdata.append("inst_id",this.inst_id_for_inst_login)
    this.service.get_book_by_inst_id(formdata).subscribe(
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
          this.router.navigate(['/institutehome/instbook'])
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

