import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ManageService } from 'src/app/manage.service';
import { StdRegComponent } from '../std-reg/std-reg.component';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {
  hide = true
  loginForm !: FormGroup
  constructor(
    private dailog: MatDialog,
    private FromBuilder: FormBuilder,
    private service: ManageService,
    private Router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.FromBuilder.group({
      username: ['', Validators.required],
      std_password: ['', Validators.required],
    })
  }

  new_account(): any {
    this.dailog.open(StdRegComponent, {
      disableClose: true
    })
    localStorage.removeItem
    localStorage.clear()
  }

  Std_login() {
    console.log(this.loginForm)
    if (this.loginForm.valid) {
      this.service.std_login(this.loginForm.value).subscribe(
        (res: any) => {
          console.log(res)
          if (res.success) {
            localStorage.setItem('Token', JSON.stringify(res.uid[0]));
            this.Router.navigate(['/studenthome']);
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