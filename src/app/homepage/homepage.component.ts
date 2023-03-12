import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DemopageComponent } from './demopage/demopage.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  rohit: boolean = false;
  innerWidth: any;
  contactForm !: FormGroup;


  constructor(
    private dailog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 720) {
      this.rohit = true
    }
  }

  oncheckcon() {

    if (this.innerWidth < 720) {
      if (this.rohit == false) {
        this.rohit = true
      }
    }

  }
  onMenu() {
    if (this.rohit == false) {
      this.rohit = true
    }
    else {
      this.rohit = false
    }
  }

  sendmsg() {
    alert('Success')
  }

  reset() {
    this.contactForm.reset()
  }

  demo_func() {
    this.dailog.open(DemopageComponent, {
      disableClose: true
    });
  }
}