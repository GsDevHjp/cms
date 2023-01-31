import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';

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
    private service:ManageService,
    private matref: MatDialogRef<AddEditInstNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_notification: any
  ) { }
  ngOnInit(): void {
    this.notification_form = this.fb.group({
      notification_id: ['',],
      notification: ['', Validators.required],
      description: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })

    if (this.edit_notification) {
      this.actionBtn = "Update";
      this.notification_form.controls['notification_id'].setValue(this.edit_notification.notification_id);
      this.notification_form.controls['notification'].setValue(this.edit_notification.notification);
      this.notification_form.controls['description'].setValue(this.edit_notification.description);
      this.notification_form.controls['admin_id_fk'].setValue(this.edit_notification.admin_id_fk);
    }
  }
  notification_btn(){
    console.log(this.notification_form.value)
    if (!this.edit_notification) {
      if (this.notification_form.valid) {
        this.service.post_notification(this.notification_form.value).subscribe(
          (result: any) => {
            console.log(result)
            this.matref.close();
            this.notification_form.reset();
           alert('form successfully...')

          },
          (error: any) => {
            console.log(error)
            alert('data not insert')
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
       alert('data update successfully')

      },
      error: () => {
        alert('data not update')
      }

    })
  }
}