import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditRegistrationComponent } from '../add-edit-registration/add-edit-registration.component';
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
    this.dailog.open(AddEditRegistrationComponent, {
      disableClose: true
    })
  }
}
