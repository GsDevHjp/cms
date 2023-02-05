import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageService } from 'src/app/manage.service';
import { AddEditRegistrationComponent } from '../add-edit-registration/add-edit-registration.component';


@Component({
  selector: 'app-institute-login',
  templateUrl: './institute-login.component.html',
  styleUrls: ['./institute-login.component.css']
})
export class InstituteLoginComponent implements OnInit {
  hide = true;
  inst_login_form !: FormGroup
  constructor(
    private dailog: MatDialog,
    private FromBuilder: FormBuilder,
    private service: ManageService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.inst_login_form = this.FromBuilder.group({
      username: ['', Validators.required],
      inst_password: ['', Validators.required],
    })
  }


  new_account(): any {
    this.dailog.open(AddEditRegistrationComponent, {
      disableClose: true
    })
    localStorage.removeItem
    localStorage.clear()
  }

  inst_login() {
    console.log(this.inst_login_form)
    if (this.inst_login_form.valid) {
      this.service.inst_login(this.inst_login_form.value).subscribe(
        (res: any) => {
          console.log(res)
          if (res.success) {
            localStorage.setItem('Token', JSON.stringify(res.uid[0]));
            this.router.navigate(['/institutehome']);
          }
          else {
            alert("Username and Password Not Match..")
          }
        }
      )
    }
    else {
      alert("Account Not Found...")
    }
  }




}
