import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import { ManageService } from 'src/app/manage.service';
import { Router } from '@angular/router';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { faAllergies } from '@fortawesome/free-solid-svg-icons';
import { AddEditTakeAddmissionComponent } from 'src/app/student/add-edit-take-addmission/add-edit-take-addmission.component';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})

export class AdmissionComponent implements OnInit {
  displayedColumns: string[] = ['admission_id', 'regist_no', 'std_name', 'roll_no', 'course_id_fk', 'batch_name', 'admission_date', 'std_whatsapp_no','std_photo', 'admission_status', 'action'];
  dataSource = new MatTableDataSource();
  imgUrl: string = 'assets/';

  count_admission: number = 0;
  color: ThemePalette = 'primary'
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tabledata: any;
  paginatorRef: any;
  login_deatils: any
  login: any
  inst_id: any
  inst_id_for_inst_login: any
  add_status:string = ""
  constructor(
    private dailog: MatDialog,
    private service: ManageService,
    private router: Router
  )
   {
    const institute_data = this.router.getCurrentNavigation();
    this.inst_id = institute_data?.extras
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    // this.inst_id = this.login.institute_id_fk
    this.inst_id_for_inst_login = this.login.inst_id
    // console.log(this.inst_id_for_inst_login)
  }

  ngOnInit(): void {
    if (this.inst_id > 0) {
      this.get_admission_data(this.inst_id)
    }
    else {
     this.get_admission_data(this.inst_id_for_inst_login)
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  toggle(event: MatSlideToggleChange, admission_id:any) {
    console.log(admission_id)
    if(event.checked == true){
      const editdata = new FormData()
      editdata.append('admissition_status' , '1')
      editdata.append('admission_id' , admission_id)
        this.service.admission_update(editdata).subscribe(
          (res:any)=>{
            this.get_admission_data(this.inst_id_for_inst_login)    
          }
        )
    }

    if(event.checked == false){
      const editdata = new FormData()
      editdata.append('admissition_status' , '0')
      editdata.append('admission_id' , admission_id)

        this.service.admission_update(editdata).subscribe(
          (res:any)=>{
            this.get_admission_data(this.inst_id_for_inst_login)          }
        )
    }
   
}


get_admission_data(inst_id:any){
  const fromdata = new FormData()
  fromdata.append("inst_id",inst_id)
  this.service.get_admission_by_inst_id(fromdata).subscribe(
    (res: any) => {
      console.log(res)
      this.dataSource.data = res.data
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.count_admission = res.data.length
    }
  )
}

add_addmission(){
  this.dailog.open(AddEditTakeAddmissionComponent)
}
}


