import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-add-edit-inst-notification',
  templateUrl: './add-edit-inst-notification.component.html',
  styleUrls: ['./add-edit-inst-notification.component.css']
})
export class AddEditInstNotificationComponent implements OnInit {
  disableSelect = new FormControl(false);
  notification_form!: FormGroup;
  admin = 1;
  upload: any;
  actionBtn: string = 'Add'


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private matref: MatDialogRef<AddEditInstNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_notification: any
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  ngOnInit(): void {
    this.notification_form = this.fb.group({
      notification: ['', Validators.required],
      description: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })

    if (this.edit_notification) {
      this.actionBtn = "Update";
      this.notification_form.controls['notification'].setValue(this.edit_notification.notification);
      this.notification_form.controls['description'].setValue(this.edit_notification.description);
      this.notification_form.controls['admin_id_fk'].setValue(this.edit_notification.admin_id_fk);
    }
  }
  batch_btn() {

  }
}