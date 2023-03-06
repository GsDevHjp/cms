import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { AdminChangePasswordComponent } from '../admin-change-password/admin-change-password.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  name: any;
  opened:boolean= true
  @ViewChild(MatSidenav)
  sidenav!:MatSidenav;
  url: string = 'https://greensoft.net.in/gscms/assets/';
  img_url: string = '';
  login_deatils: any
  login: any
  constructor(
    private observe:BreakpointObserver,
    private dailog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.observe.observe(['(max-width:768px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      }
      else {
        this.sidenav.mode = 'side';
        this.sidenav.close();
      }
    })

    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.name = this.login.admin_name
    if(!this.login.admin_img){
      this.img_url = "profile.png"
    }
    else{
      this.img_url = this.login.admin_img
    }
  }
  changepassword() {
    this.dailog.open(AdminChangePasswordComponent, {
      disableClose: true
    });
  }

}
