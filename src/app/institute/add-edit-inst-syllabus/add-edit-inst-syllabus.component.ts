import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, RouterLinkWithHref } from '@angular/router';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-add-edit-inst-syllabus',
  templateUrl: './add-edit-inst-syllabus.component.html',
  styleUrls: ['./add-edit-inst-syllabus.component.css']
})
export class AddEditInstSyllabusComponent implements OnInit {
  disableSelect = new FormControl(false);
  inst_syllabus_form!: FormGroup;
  admin = 1;
  upload: any;
  actionBtn: string = 'Add'
  course_data:any
  inst_id: any
  login_deatils: any
  login: any
  institute_id:any

  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private service:ManageService,
    private matref: MatDialogRef<AddEditInstSyllabusComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_inst_syllabus: any
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.institute_id = this.login.inst_id
  }
  ngOnInit(): void {
    const formdata = new FormData()
    formdata.append("inst_id", this.institute_id)
    this.service.get_course_by_inst_id(formdata).subscribe(
      (std_res: any) => {
        this.course_data = std_res.data
      }
    )
    this.inst_syllabus_form = this.fb.group({
      inst_syllabus_id: ['',],
      inst_syllabus_title: ['', Validators.required],
      inst_syllabus_img: ['', Validators.required],
      inst_syllabus_description: ['', Validators.required],
      course_id_fk: ['', Validators.required],
      institute_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })

    if (this.edit_inst_syllabus) {
      this.actionBtn = "Update";
      this.inst_syllabus_form.controls['inst_syllabus_id'].setValue(this.edit_inst_syllabus.inst_syllabus_id);
      this.inst_syllabus_form.controls['inst_syllabus_title'].setValue(this.edit_inst_syllabus.inst_syllabus_title);
      this.inst_syllabus_form.controls['inst_syllabus_img'].setValue(this.edit_inst_syllabus.inst_syllabus_img);
      this.inst_syllabus_form.controls['inst_syllabus_description'].setValue(this.edit_inst_syllabus.inst_syllabus_description);
      this.inst_syllabus_form.controls['course_id_fk'].setValue(this.edit_inst_syllabus.course_id_fk);
      this.inst_syllabus_form.controls['institute_id_fk'].setValue(this.edit_inst_syllabus.institute_id_fk);
      this.inst_syllabus_form.controls['admin_id_fk'].setValue(this.edit_inst_syllabus.admin_id_fk);
    }
  }
  inst_syllabus_btn() {
    console.log(this.inst_syllabus_form.value)
    const formdata = new FormData();
    formdata.append('inst_syllabus_id', this.inst_syllabus_form.get('inst_syllabus_id')?.value);
    formdata.append('inst_syllabus_title', this.inst_syllabus_form.get('inst_syllabus_title')?.value);
    formdata.append('inst_syllabus_img', this.inst_syllabus_form.get('inst_syllabus_img')?.value);
    formdata.append('inst_syllabus_description', this.inst_syllabus_form.get('inst_syllabus_description')?.value);
    formdata.append('course_id_fk', this.inst_syllabus_form.get('course_id_fk')?.value);
    formdata.append('institute_id_fk', this.inst_syllabus_form.get('institute_id_fk')?.value);
    formdata.append('admin_id_fk', this.inst_syllabus_form.get('admin_id_fk')?.value);
    if (!this.edit_inst_syllabus) {
      if (this.inst_syllabus_form.valid) {
        this.service.post_inst_syllabus(formdata).subscribe(
          (result: any) => {
            console.log(result)
            this.matref.close();
            this.inst_syllabus_form.reset();
            this.popup.success({ detail: 'Success', summary: 'Syllabus Added Successfully..', sticky: true, position: 'tr' })
          },
          (error: any) => {
            console.log(error)
            this.popup.error({ detail: 'Unsuccess', summary: 'Syllabus Not Added..', sticky: true, position: 'tr' })
          }
        )
      }
    }
    else {
      this.updateInstSyllabus()
    }
  }
  updateInstSyllabus() {
      console.log(this.inst_syllabus_form.value)
      const updatedata = new FormData();
      updatedata.append('inst_syllabus_id', this.inst_syllabus_form.get('inst_syllabus_id')?.value);
      updatedata.append('inst_syllabus_title', this.inst_syllabus_form.get('inst_syllabus_title')?.value);
      updatedata.append('inst_syllabus_img', this.inst_syllabus_form.get('inst_syllabus_img')?.value);
      updatedata.append('inst_syllabus_description', this.inst_syllabus_form.get('inst_syllabus_description')?.value);
      updatedata.append('course_id_fk', this.inst_syllabus_form.get('course_id_fk')?.value);
      updatedata.append('institute_id_fk', this.inst_syllabus_form.get('institute_id_fk')?.value);
      updatedata.append('admin_id_fk', this.inst_syllabus_form.get('admin_id_fk')?.value);
     this.service.put_inst_syllabus(updatedata).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.matref.close();
        this.popup.success({ detail: 'Success', summary: 'Syllabus Update Successfully..', sticky: true, position: 'tr' })
      },
      error:(error:any)=>{
        console.log(error)
        this.popup.error({ detail: 'Unsuccess', summary: 'Syllabus Not Update..', sticky: true, position: 'tr' })
      }
     })
    }
 
  OnUpload(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.inst_syllabus_form.get('inst_syllabus_img')?.setValue(file)
    }
  }
}