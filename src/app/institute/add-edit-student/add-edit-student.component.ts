import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-add-edit-student',
  templateUrl: './add-edit-student.component.html',
  styleUrls: ['./add-edit-student.component.css']
})

export class AddEditStudentComponent implements OnInit {
  student_form!: FormGroup;
  upload: any;
  ActionBtn: string = 'Add'
  heading_act: string = 'Add Student'
  admin = 1;
  institute_id: string = '1'
  selectedImage: any = 'http://localhost/cms/src/assets/user.png';
  status: any = 1


  constructor(
    private fb: FormBuilder,
    private service: ManageService,
    private matref: MatDialogRef<AddEditStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_std: any,
  ) {

  }
  ngOnInit(): void {
    this.student_form = this.fb.group({
      std_id: [''],
      std_name: ['', Validators.required],
      std_father_name: [''],
      std_father_occupation: [''],
      std_whatsapp_no: ['', Validators.required],
      std_aadhar: [''],
      std_email: ['', Validators.required],
      std_dob: [''],
      std_gender: ['', Validators.required],
      std_state: [''],
      std_district: [''],
      std_regist_date: ['', Validators.required],
      std_img: [''],
      std_address: ['', Validators.required],
      std_password: ['', Validators.required],
      institute_id_fk: [''],
      admin_id_fk: ['', Validators.required]
    })

    this.student_form.controls['std_regist_date'].setValue(new Date().toISOString().slice(0, 10));
    if (this.edit_std) {
      this.ActionBtn = "Update";
      this.student_form.controls['std_id'].setValue(this.edit_std.std_id);
      this.student_form.controls['std_name'].setValue(this.edit_std.std_name);
      this.student_form.controls['std_father_name'].setValue(this.edit_std.std_father_name);
      this.student_form.controls['std_father_occupation'].setValue(this.edit_std.std_father_occupation);
      this.student_form.controls['std_whatsapp_no'].setValue(this.edit_std.std_whatsapp_no);
      this.student_form.controls['std_aadhar'].setValue(this.edit_std.std_aadhar);
      this.student_form.controls['std_email'].setValue(this.edit_std.std_email);
      this.student_form.controls['std_dob'].setValue(this.edit_std.std_dob);
      this.student_form.controls['std_gender'].setValue(this.edit_std.std_gender);
      this.student_form.controls['std_state'].setValue(this.edit_std.std_state);
      this.student_form.controls['std_district'].setValue(this.edit_std.std_district);
      this.student_form.controls['std_regist_date'].setValue(this.edit_std.std_regist_date);
      this.student_form.controls['std_img'].setValue(this.edit_std.std_img);
      this.selectedImage = 'assets/' + this.edit_std.std_img;
      this.student_form.controls['std_address'].setValue(this.edit_std.std_address);
      this.student_form.controls['std_password'].setValue(this.edit_std.std_password);
      this.student_form.controls['institute_id_fk'].setValue(this.edit_std.institute_id_fk);
      this.student_form.controls['std_password'].setValue(this.edit_std.std_password);
      this.student_form.controls['admin_id_fk'].setValue(this.edit_std.admin_id_fk);
    }
  }

  student_btn() {
    console.log(this.student_form.value)
    const formdata = new FormData();
    formdata.append('std_name', this.student_form.get('std_name')?.value)
    formdata.append('std_father_name', this.student_form.get('std_father_name')?.value)
    formdata.append('std_father_occupation', this.student_form.get('std_father_occupation')?.value)
    formdata.append('std_whatsapp_no', this.student_form.get('std_whatsapp_no')?.value)
    formdata.append('std_aadhar', this.student_form.get('std_aadhar')?.value)
    formdata.append('std_email', this.student_form.get('std_email')?.value)
    formdata.append('std_dob', this.student_form.get('std_dob')?.value)
    formdata.append('std_gender', this.student_form.get('std_gender')?.value)
    formdata.append('std_state', this.student_form.get('std_state')?.value)
    formdata.append('std_district', this.student_form.get('std_district')?.value)
    formdata.append('std_regist_date', this.student_form.get('std_regist_date')?.value)
    formdata.append('std_img', this.student_form.get('std_img')?.value)
    formdata.append('std_address', this.student_form.get('std_address')?.value)
    formdata.append('std_password', this.student_form.get('std_password')?.value)
    formdata.append('status', this.status)
    formdata.append('institute_id_fk', this.institute_id)
    formdata.append('admin_id_fk', this.student_form.get('admin_id_fk')?.value)
    if (!this.edit_std) {
      if (this.student_form.valid) {
        this.service.post_student(formdata).subscribe(
          (result: any) => {
            console.log(result)
            this.matref.close();
            this.student_form.reset();
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
      this.updateStudent()
    }
  } updateStudent() {
    console.log(this.student_form.value)
    const updatedata = new FormData();
    updatedata.append('std_id', this.student_form.get('std_id')?.value)
    updatedata.append('std_name', this.student_form.get('std_name')?.value)
    updatedata.append('std_father_name', this.student_form.get('std_father_name')?.value)
    updatedata.append('std_father_occupation', this.student_form.get('std_father_occupation')?.value)
    updatedata.append('std_whatsapp_no', this.student_form.get('std_whatsapp_no')?.value)
    updatedata.append('std_aadhar', this.student_form.get('std_aadhar')?.value)
    updatedata.append('std_email', this.student_form.get('std_email')?.value)
    updatedata.append('std_dob', this.student_form.get('std_dob')?.value)
    updatedata.append('std_gender', this.student_form.get('std_gender')?.value)
    updatedata.append('std_state', this.student_form.get('std_state')?.value)
    updatedata.append('std_district', this.student_form.get('std_district')?.value)
    updatedata.append('std_regist_date', this.student_form.get('std_regist_date')?.value)
    updatedata.append('std_img', this.student_form.get('std_img')?.value)
    updatedata.append('std_address', this.student_form.get('std_address')?.value)
    updatedata.append('std_password', this.student_form.get('std_password')?.value)
    updatedata.append('status', this.student_form.get('status')?.value)
    updatedata.append('institute_id_fk', this.student_form.get('institute_id_fk')?.value)
    updatedata.append('admin_id_fk', this.student_form.get('admin_id_fk')?.value)
    this.service.put_student(updatedata).subscribe(
      (result: any) => {
        console.log(result)
        this.matref.close();
        this.student_form.reset();
        alert('update successfully...')
      },
      (error: any) => {
        console.log(error)
        alert('data not update')
      }
    )
  }


  OnUpload(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.student_form.get('std_img')?.setValue(file)
    }
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.selectedImage = reader.result;

      };
    }
  }


}