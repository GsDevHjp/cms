import { Component, OnInit } from '@angular/core';
import { InstChangePasswordComponent } from '../inst-change-password/inst-change-password.component';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-institute-sidebar',
  templateUrl: './institute-sidebar.component.html',
  styleUrls: ['./institute-sidebar.component.css']
})
export class InstituteSidebarComponent implements OnInit {

  setting: any
  action_icon1: boolean = false
  action_icon2: boolean = true
  action_icon3: boolean = false
  action_icon4: boolean = true
  inst_id: any
  login_deatils: any
  login: any
  inst_name: any
  constructor(
    private dailog: MatDialog,
    private service: ManageService
  ) { }

  ngOnInit(): void {

    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.inst_id

    const fromdata = new FormData()
    fromdata.append('inst_id', this.inst_id)
    this.service.get_inst_by_inst_id(fromdata).subscribe(
      (result: any) => {
        this.inst_name = result.data.inst_name
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  //////////////////////////////////////////////////////////////////////// Report Dropdown /////////////////////////////////////////////////////
  report_dropdown() {
    this.setting = document.getElementById("dropdown_report")
    if (this.setting.style.display != "block") {
      this.setting.style.display = "block";
      this.action_icon1 = true
      this.action_icon2 = false

    } else {
      this.setting.style.display = "none";
      this.action_icon1 = false
      this.action_icon2 = true
    }
  }

  setting_dropdown() {
    this.setting = document.getElementById("dropdown_setting")
    if (this.setting.style.display != "block") {
      this.setting.style.display = "block";
      this.action_icon3 = true
      this.action_icon4 = false

    } else {
      this.setting.style.display = "none";
      this.action_icon3 = false
      this.action_icon4 = true
    }
  }
  changepassword() {
    this.dailog.open(InstChangePasswordComponent, {
      disableClose: true
    });
  }

}

