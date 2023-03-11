import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, RouterLinkWithHref } from '@angular/router';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-edit-inst-notes',
  templateUrl: './add-edit-inst-notes.component.html',
  styleUrls: ['./add-edit-inst-notes.component.css'] 
})
export class AddEditInstNotesComponent implements OnInit {

  disableSelect = new FormControl(false);
  inst_notes_form!: FormGroup;
  admin = 1;
  upload: any;
  actionBtn: string = 'Add'
  course_data: any
  inst_id: any
  login_deatils: any
  login: any
  inst_id_for_inst_login: any;

  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private service: ManageService,
    private matref: MatDialogRef<AddEditInstNotesComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_inst_notes: any
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id_for_inst_login = this.login.inst_id
  }
  ngOnInit(): void {
    const formdata = new FormData()
    formdata.append("inst_id", this.inst_id_for_inst_login)
    this.service.get_course_by_inst_id(formdata).subscribe(
      (std_res: any) => {
        this.course_data = std_res.data
      }
    )
    this.inst_notes_form = this.fb.group({
      inst_notes_id: ['',],
      inst_notes_title: ['', Validators.required],
      inst_notes_img: ['', Validators.required],
      inst_notes_description: [''],
      course_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })

    if (this.edit_inst_notes) {
      this.actionBtn = "Update";
      this.inst_notes_form.controls['inst_notes_id'].setValue(this.edit_inst_notes.inst_notes_id);
      this.inst_notes_form.controls['inst_notes_title'].setValue(this.edit_inst_notes.inst_notes_title);
      this.inst_notes_form.controls['inst_notes_img'].setValue(this.edit_inst_notes.inst_notes_img);
      this.inst_notes_form.controls['inst_notes_description'].setValue(this.edit_inst_notes.inst_notes_description);
      this.inst_notes_form.controls['course_id_fk'].setValue(this.edit_inst_notes.course_id);
      this.inst_notes_form.controls['admin_id_fk'].setValue(this.edit_inst_notes.admin_id_fk);
    }
  }
  inst_notes_btn() {
    console.log(this.inst_notes_form.value)
    const formdata = new FormData();
    formdata.append('inst_notes_id', this.inst_notes_form.get('inst_notes_id')?.value);
    formdata.append('inst_notes_title', this.inst_notes_form.get('inst_notes_title')?.value);
    formdata.append('inst_notes_img', this.inst_notes_form.get('inst_notes_img')?.value);
    formdata.append('inst_notes_description', this.inst_notes_form.get('inst_notes_description')?.value);
    formdata.append('course_id_fk', this.inst_notes_form.get('course_id_fk')?.value);
    formdata.append('institute_id_fk', this.inst_id_for_inst_login);
    formdata.append('admin_id_fk', this.inst_notes_form.get('admin_id_fk')?.value);
    if (!this.edit_inst_notes) {
      if (this.inst_notes_form.valid) {
        this.service.post_inst_notes(formdata).subscribe(
          (result: any) => {
            console.log(result)
            this.matref.close();
            this.inst_notes_form.reset();
            this.popup.success({ detail: 'Success', summary: 'Book Saved',})
            this.router.navigate(['/institutehome/instnotes'])
          },
          (error: any) => {
            console.log(error)
            this.popup.error({ detail: 'Unsuccess', summary: 'Notes Not Saved',})
          }
        )
      }
    }
    else {
      this.updateInstNotes()
    }
  }
  updateInstNotes() {
    const updatedata = new FormData();
    updatedata.append('inst_notes_id', this.inst_notes_form.get('inst_notes_id')?.value);
    updatedata.append('inst_notes_title', this.inst_notes_form.get('inst_notes_title')?.value);
    updatedata.append('inst_notes_img', this.inst_notes_form.get('inst_notes_img')?.value);
    updatedata.append('inst_notes_description', this.inst_notes_form.get('inst_notes_description')?.value);
    updatedata.append('course_id_fk', this.inst_notes_form.get('course_id_fk')?.value);
    updatedata.append('institute_id_fk', this.inst_id_for_inst_login);
    updatedata.append('admin_id_fk', this.inst_notes_form.get('admin_id_fk')?.value);
    this.service.put_inst_notes(updatedata).subscribe({
      next: (res: any) => {
        console.log(res)
        this.matref.close();
        this.popup.success({ detail: 'Success', summary: 'Notes Updated', sticky: true, position: 'tr' })
        this.router.navigate(['/institutehome/instnotes'])

      },
      error: (error: any) => {
        console.log(error)
        this.popup.error({ detail: 'Unsuccess', summary: 'Notes Not Update..', sticky: true, position: 'tr' })
      }
    })
  }

  OnUpload(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.inst_notes_form.get('inst_notes_img')?.setValue(file)
    }
  }
  inst_notes_reset(){
    this.inst_notes_form.reset()
  }
}