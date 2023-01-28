import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { AddEditStudentComponent } from '../add-edit-student/add-edit-student.component';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  displayedColumns: string[] = ['std_id', 'std_name','institute_id_fk', 'std_mobile', 'std_aadhar', 'std_email', 'std_date', 'std_photo', 'action'];
  dataSource = new MatTableDataSource();
  count_student:number=0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;
  imgUrl:string = 'http://localhost/cms/src/assets/';
  
  constructor(
    private dailog: MatDialog,
    private service:ManageService,
  ) { }

  ngOnInit(): void {
    this.service.get_student().subscribe(
      (res: any) => {
        console.log(res)
        this.dataSource.data = res.data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.count_student = res.data.length
      }
    )
  }

  add_student(): any {
    this.dailog.open(AddEditStudentComponent, {
      disableClose: true
    });
  }

  edit_student(row: any) {
    this.dailog.open(AddEditStudentComponent, {
      data: row,
    });
  }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

