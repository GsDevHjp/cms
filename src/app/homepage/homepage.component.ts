import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from '../manage.service';
import { DemopageComponent } from './demopage/demopage.component';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  rohit: boolean = false;
  innerWidth: any;
  contactForm !: FormGroup;
  admin = 1;

  constructor(
    private dailog: MatDialog,
    private fb: FormBuilder,
    private service: ManageService,
    private popup: NgToastService,
  ) {

  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 720) {
      this.rohit = true
    }

    this.contactForm = this.fb.group({
      enq_id: [''],
      enq_name: ['', Validators.required],
      enq_email: ['', Validators.required],
      enq_phone: ['', Validators.required],
      enq_msg: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })
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
    console.log(this.contactForm.value)
    if (this.contactForm.valid) {
      this.service.post_admin_enquiry(this.contactForm.value).subscribe(
        (res: any) => {
          console.log(res)
          this.contactForm.reset()
          this.popup.success({ detail: 'Success', summary: 'Enquiry Saved', })

        },
        (error) => {
          console.log(error)
          this.popup.error({ detail: 'Unsuccess', summary: 'Enquiry Not Saved', })
        }
      )
    }
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