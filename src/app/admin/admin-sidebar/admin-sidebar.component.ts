import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  setting: any
  action_icon3: boolean = false
  action_icon4: boolean = true
  constructor() { }

  ngOnInit(): void {
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
