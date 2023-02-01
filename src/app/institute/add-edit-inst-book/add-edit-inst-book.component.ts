import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, RouterLinkWithHref } from '@angular/router';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-add-edit-inst-book',
  templateUrl: './add-edit-inst-book.component.html',
  styleUrls: ['./add-edit-inst-book.component.css']
})
export class AddEditInstBookComponent implements OnInit {

  disableSelect = new FormControl(false);
  inst_book_form!: FormGroup;
  admin = 1;
  institute_id = 1;
  upload: any;
  actionBtn: string = 'Add'
  course_data:any


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service:ManageService,
    private matref: MatDialogRef<AddEditInstBookComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_inst_book: any
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  ngOnInit(): void {
    this.service.get_course().subscribe(
      (std_res: any) => {
        this.course_data = std_res.data
      }
    )
    this.inst_book_form = this.fb.group({
      inst_book_id: ['',],
      inst_book_title: ['', Validators.required],
      inst_book_img: ['', Validators.required],
      inst_book_description: ['', Validators.required],
      course_id_fk: ['', Validators.required],
      institute_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })

    if (this.edit_inst_book) {
      this.actionBtn = "Update";
      this.inst_book_form.controls['inst_book_id'].setValue(this.edit_inst_book.inst_book_id);
      this.inst_book_form.controls['inst_book_title'].setValue(this.edit_inst_book.inst_book_title);
      this.inst_book_form.controls['inst_book_img'].setValue(this.edit_inst_book.inst_book_img);
      this.inst_book_form.controls['inst_book_description'].setValue(this.edit_inst_book.inst_book_description);
      this.inst_book_form.controls['course_id_fk'].setValue(this.edit_inst_book.course_id_fk);
      this.inst_book_form.controls['institute_id_fk'].setValue(this.edit_inst_book.institute_id_fk);
      this.inst_book_form.controls['admin_id_fk'].setValue(this.edit_inst_book.admin_id_fk);
    }
  }
  inst_book_btn() {
    console.log(this.inst_book_form.value)
    const formdata = new FormData();
    formdata.append('inst_book_id', this.inst_book_form.get('inst_book_id')?.value);
    formdata.append('inst_book_title', this.inst_book_form.get('inst_book_title')?.value);
    formdata.append('inst_book_img', this.inst_book_form.get('inst_book_img')?.value);
    formdata.append('inst_book_description', this.inst_book_form.get('inst_book_description')?.value);
    formdata.append('course_id_fk', this.inst_book_form.get('course_id_fk')?.value);
    formdata.append('institute_id_fk', this.inst_book_form.get('institute_id_fk')?.value);
    formdata.append('admin_id_fk', this.inst_book_form.get('admin_id_fk')?.value);
    if (!this.edit_inst_book) {
      if (this.inst_book_form.valid) {
        this.service.post_inst_book(formdata).subscribe(
          (result: any) => {
            console.log(result)
            this.matref.close();
            this.inst_book_form.reset();
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
      this.updateInstBook()
    }
  }
  updateInstBook() {
      console.log(this.inst_book_form.value)
      const updatedata = new FormData();
      updatedata.append('inst_book_id', this.inst_book_form.get('inst_book_id')?.value);
      updatedata.append('inst_book_title', this.inst_book_form.get('inst_book_title')?.value);
      updatedata.append('inst_book_img', this.inst_book_form.get('inst_book_img')?.value);
      updatedata.append('inst_book_description', this.inst_book_form.get('inst_book_description')?.value);
      updatedata.append('course_id_fk', this.inst_book_form.get('course_id_fk')?.value);
      updatedata.append('institute_id_fk', this.inst_book_form.get('institute_id_fk')?.value);
      updatedata.append('admin_id_fk', this.inst_book_form.get('admin_id_fk')?.value);
     this.service.put_inst_book(updatedata).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.matref.close();
        alert('update successfully..')
      },
      error:(error:any)=>{
        console.log(error)
        alert('data not update')
      }
     })
    }
 
  OnUpload(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.inst_book_form.get('inst_book_img')?.setValue(file)
    }
  }
}