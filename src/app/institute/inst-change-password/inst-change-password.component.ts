import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-inst-change-password',
  templateUrl: './inst-change-password.component.html',
  styleUrls: ['./inst-change-password.component.css']
})
export class InstChangePasswordComponent implements OnInit {
  disableSelect = new FormControl(false);
  batch_form!: FormGroup;
  admin = 1;
  upload: any;
  actionBtn: string = 'Add'


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private matref: MatDialogRef<InstChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_batch: any
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  ngOnInit(): void { }
}