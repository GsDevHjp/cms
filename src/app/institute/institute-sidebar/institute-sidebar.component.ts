import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

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

}

