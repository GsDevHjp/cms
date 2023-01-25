import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditInstituteComponent } from 'src/app/admin/add-edit-institute/add-edit-institute.component';

@Component({
  selector: 'app-institute-login',
  templateUrl: './institute-login.component.html',
  styleUrls: ['./institute-login.component.css']
})
export class InstituteLoginComponent implements OnInit {
  hide = true;

  constructor(
    private dailog: MatDialog,

  ) { }

  ngOnInit(): void {
  }

  new_account(): any {
    this.dailog.open(AddEditInstituteComponent, {
      disableClose: true
    })
  }
}
