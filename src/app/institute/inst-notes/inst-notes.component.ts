import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AddEditInstNotesComponent } from '../add-edit-inst-notes/add-edit-inst-notes.component';
export interface Userdata {
  book_id: number;
  course_id: string;
  book_title: string;
  book_image: string;
  book_description: string;
}

const Userdata: Userdata[] = [
  { book_id: 1, course_id: 'BCA', book_title: 'HTML', book_image: '00:08 PM', book_description: 'Green Soft',},
  { book_id: 1, course_id: 'BCA', book_title: 'HTML', book_image: '00:08 PM', book_description: 'Green Soft',},
  { book_id: 1, course_id: 'BCA', book_title: 'HTML', book_image: '00:08 PM', book_description: 'Green Soft',},
  { book_id: 1, course_id: 'BCA', book_title: 'HTML', book_image: '00:08 PM', book_description: 'Green Soft',},
  { book_id: 1, course_id: 'BCA', book_title: 'HTML', book_image: '00:08 PM', book_description: 'Green Soft',},
  { book_id: 1, course_id: 'BCA', book_title: 'HTML', book_image: '00:08 PM', book_description: 'Green Soft',},
];

@Component({
  selector: 'app-inst-notes',
  templateUrl: './inst-notes.component.html',
  styleUrls: ['./inst-notes.component.css']
})
export class InstNotesComponent implements OnInit {
  displayedColumns: string[] = ['book_id', 'course_id', 'book_title', 'book_image', 'book_description', 'action'];
  dataSource = new MatTableDataSource(Userdata);
  count_batch:number=0;
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

  ngOnInit(): void {
  }

  add_batch(): any {
    this.dailog.open(AddEditInstNotesComponent, {
      disableClose: true
    });
  }

  batch_edit(row: any) {
    this.dailog.open(AddEditInstNotesComponent, {
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

