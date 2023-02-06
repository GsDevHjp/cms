import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AddEditInstNotesComponent } from '../add-edit-inst-notes/add-edit-inst-notes.component';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-inst-notes',
  templateUrl: './inst-notes.component.html',
  styleUrls: ['./inst-notes.component.css']
})
export class InstNotesComponent implements OnInit {
  displayedColumns: string[] = ['inst_notes_id', 'course_id_fk', 'inst_notes_title', 'inst_notes_description','institute_id_fk', 'inst_notes_img', 'action'];
  dataSource = new MatTableDataSource();
  count_inst_notes:number=0;
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
    this.service.get_notes_by_inst_id(formdata).subscribe(
      (res:any)=>{
        console.log(res)
        this.dataSource.data = res.data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.count_inst_notes = res.data.length
      }
    )
  }

  add_inst_notes(): any {
    this.dailog.open(AddEditInstNotesComponent, {
      disableClose: true
    });
  }

  batch_edit(row: any) {
    this.dailog.open(AddEditInstNotesComponent, {
      data: row,
    });
  }
  inst_notes_delete(row:any){
    if (confirm("Are you sure to delate")) {
      const deldata = new FormData();
      deldata.append('inst_notes_id', row.inst_notes_id);
      this.service.inst_notes_delete(deldata).subscribe(
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

