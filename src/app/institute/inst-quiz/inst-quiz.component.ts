import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddEditInstQuizComponent } from '../add-edit-inst-quiz/add-edit-inst-quiz.component';
export interface Userdata {
  quiz_question: string;
  quiz_option_a: string;
  quiz_option_b: string;
  quiz_option_c: string;
  quiz_option_d: string
  quiz_answer: string;
}

const Userdata: Userdata[] = [
 {quiz_question:'How Are You', quiz_option_a: 'Good', quiz_option_b:'Sad', quiz_option_c:'Happy', quiz_option_d: 'None Of These', quiz_answer: 'Good'},
 {quiz_question:'How Are You', quiz_option_a: 'Good', quiz_option_b:'Sad', quiz_option_c:'Happy', quiz_option_d: 'None Of These', quiz_answer: 'Good'},
 {quiz_question:'How Are You', quiz_option_a: 'Good', quiz_option_b:'Sad', quiz_option_c:'Happy', quiz_option_d: 'None Of These', quiz_answer: 'Good'},
 {quiz_question:'How Are You', quiz_option_a: 'Good', quiz_option_b:'Sad', quiz_option_c:'Happy', quiz_option_d: 'None Of These', quiz_answer: 'Good'},
];

@Component({
  selector: 'app-inst-quiz',
  templateUrl: './inst-quiz.component.html',
  styleUrls: ['./inst-quiz.component.css']
})

export class InstQuizComponent implements OnInit {

  displayedColumns: string[] = ['quiz_id', 'quiz_question', 'quiz_option_a', 'quiz_option_b', 'quiz_option_c', 'quiz_option_d', 'quiz_answer', 'action'];
  dataSource = new MatTableDataSource(Userdata);
  count_course: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;

  constructor(
    private dailog: MatDialog,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void { }

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

