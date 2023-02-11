import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { InstituteUpdateProfileComponent } from '../institute-update-profile/institute-update-profile.component';
@Component({
  selector: 'app-institute-home',
  templateUrl: './institute-home.component.html',
  styleUrls: ['./institute-home.component.css']
})
export class InstituteHomeComponent implements OnInit {
  name: any;
  opened: boolean = true
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  url :string = 'https://greensoft.net.in/gscms/assets/';
  img_url:string=''
  login_deatils: any
  login: any
  constructor(
    private observe: BreakpointObserver,
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
    this.name = this.login.inst_name
    if(!this.login.inst_logo){
      this.img_url = "profile.png"
    }
    else{
      this.img_url = this.login.inst_logo

    }
  }
  
  profile_update(){
    this.dailog.open(InstituteUpdateProfileComponent, {
      disableClose: true
    });
  }

}