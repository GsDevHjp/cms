import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  setting: any
  action_icon1: boolean = false
  action_icon2: boolean = true
  constructor(
    private dailog: MatDialog,

  ) { }

  ngOnInit(): void {
  }
  address_dropdown() {
    this.setting = document.getElementById("dropdown_address")
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
}
