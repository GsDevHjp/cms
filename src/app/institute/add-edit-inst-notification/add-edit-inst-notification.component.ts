import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
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
  login_deatils: any;
  login: any;
  inst_id: any;
  inst_id_for_inst_login: any;

  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private service: ManageService,
    private router: Router,
    private matref: MatDialogRef<AddEditInstNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_notification: any
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id = this.login.inst_id
    this.inst_id_for_inst_login = this.login.inst_id
  }
  ngOnInit(): void {
    this.notification_form = this.fb.group({
      notification_id: ['',],
      notification: ['', Validators.required],
      description: [''],
      institute_id_fk: [''],
      admin_id_fk: ['', Validators.required]
    })

    if (this.edit_notification) {
      this.actionBtn = "Update";
      this.notification_form.controls['notification_id'].setValue(this.edit_notification.notification_id);
      this.notification_form.controls['notification'].setValue(this.edit_notification.notification);
      this.notification_form.controls['description'].setValue(this.edit_notification.description);
      this.notification_form.controls['admin_id_fk'].setValue(this.edit_notification.admin_id_fk);
    }
    this.notification_form.controls['institute_id_fk'].setValue(this.login.inst_id);
  }
  notification_btn() {
    console.log(this.notification_form.value)
    if (!this.edit_notification) {
      if (this.notification_form.valid) {
        this.service.post_notification(this.notification_form.value).subscribe(
          (result: any) => {
            console.log(result)
            this.matref.close();
            this.notification_form.reset();
            this.popup.success({ detail: 'Success', summary: 'Notification Saved', })
            this.router.navigate(['/institutehome/instnotification'])

          },
          (error: any) => {
            console.log(error)
            this.popup.error({ detail: 'Unsuccess', summary: 'Notification Not Saved', })
          }
        )
      }
    }
    else {
      this.updateNotification()
    }
  }

  updateNotification() {
    this.service.put_notification(this.notification_form.value).subscribe({
      next: (res) => {
        console.log(res)
        this.matref.close();
        this.popup.success({ detail: 'Success', summary: 'Notification Updated', sticky: true, position: 'tr' })
        this.router.navigate(['/institutehome/instnotification'])

      },
      error: () => {
        this.popup.error({ detail: 'Unsuccess', summary: 'Notification Not Updated', sticky: true, position: 'tr' })
      }
    })
  }
  notification_data_reset(){
    this.notification_form.reset()
  }
}