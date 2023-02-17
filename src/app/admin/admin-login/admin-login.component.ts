import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  hide = true;
  loginForm !: FormGroup
  constructor(
    private service: ManageService,
    private Router: Router,
    private FromBuilder: FormBuilder,
  ) { 

    localStorage.removeItem
    localStorage.clear()
   }

  ngOnInit(): void {
    this.loginForm = this.FromBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }


  admin_login() {
    console.log(this.loginForm)
    if (this.loginForm.valid) {
      this.service.admin_login(this.loginForm.value).subscribe(
        (res: any) => {
          console.log(res)
          if (res.success) {
            localStorage.setItem('Token', JSON.stringify(res.uid[0]));
            this.Router.navigate(['/adminhome']);
            this.popup.success({ detail: 'Success', summary: 'Login Successfull...', })
          }
        },
        (error: any) => {
          console.log(error)
          this.popup.error({ detail: 'Failed', summary: 'Username and Password Not Match...' })
        }

      )
    }
    else {
      this.popup.error({ detail: 'Failed', summary: 'Account Not Found...', })
    }
  }
}

