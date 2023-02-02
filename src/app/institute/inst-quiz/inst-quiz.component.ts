import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddEditInstQuizComponent } from '../add-edit-inst-quiz/add-edit-inst-quiz.component';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-inst-quiz',
  templateUrl: './inst-quiz.component.html',
  styleUrls: ['./inst-quiz.component.css']
})

export class InstQuizComponent implements OnInit {

  displayedColumns: string[] = ['quiz_id','course_id_fk', 'quiz_question', 'quiz_option_a', 'quiz_option_b', 'quiz_option_c', 'quiz_option_d', 'quiz_answer','quiz_description', 'action'];
  dataSource = new MatTableDataSource();
  count_quiz: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;

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
    this.service.get_quiz().subscribe(
      (res: any) => {
        console.log(res)
        this.dataSource.data = res.data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.count_quiz = res.data.length
      }
    )
  }

  add_course() {
    this.dailog.open(AddEditInstQuizComponent, {
      disableClose: true
    });
  }

  course_edit(row: any) {
    this.dailog.open(AddEditInstQuizComponent, {
      data: row,
    });
  }
  course_delete(row:any){
    if (confirm("Are you sure to delate")) {
      const deldata = new FormData();
      deldata.append('quiz_id', row.quiz_id);
      this.service.quiz_delete(deldata).subscribe(
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

