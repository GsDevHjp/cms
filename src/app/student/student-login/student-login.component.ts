import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StdRegComponent } from '../std-reg/std-reg.component';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {
hide=true
  constructor(
    private dailog:MatDialog
  ) { }

  ngOnInit(): void {
  }


  new_account(): any {
    this.dailog.open(StdRegComponent, {
      disableClose: true
    })
  }
}