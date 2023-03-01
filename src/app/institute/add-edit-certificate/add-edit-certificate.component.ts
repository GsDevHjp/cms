import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-edit-certificate',
  templateUrl: './add-edit-certificate.component.html',
  styleUrls: ['./add-edit-certificate.component.css']
})
export class AddEditCertificateComponent implements OnInit {
  active = 1;
  notification_form!: FormGroup;
  admin = 1;
  actionBtn: string = 'Add'

  constructor(
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.notification_form = this.fb.group({
      admin_id_fk: ['', Validators.required]
    }
    )
  }
}
