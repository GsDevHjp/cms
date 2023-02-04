import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { StudentProfileComponent } from '../student-profile/student-profile.component';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {
  name: any;
  opened: boolean = true
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  url: string = 'assets/';
  img_url: string = '';
  login_deatils: any
  login: any
  constructor(
    private dailog: MatDialog,
    private observe: BreakpointObserver
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
    console.log(this.login.std_name)
    this.name = this.login.std_name
    this.img_url = this.login.std_img

  }


  show_profile() {
    this.dailog.open(StudentProfileComponent, {
      disableClose: true
    });
  }
}