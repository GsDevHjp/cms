import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { AddEditDistrictComponent } from '../add-edit-district/add-edit-district.component';
@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  displayedColumns: string[] = ['district_id', 'country', 'state','district', 'description', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  district_count = 0
  constructor(
    private dailog: MatDialog,
    private manageservice: ManageService,
  ) { }

  ngOnInit(): void {
    this.manageservice.get_state().subscribe(
      (instdata: any) => {
        console.log(instdata)
        this.dataSource = new MatTableDataSource(instdata.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.district_count = instdata.data.length
      }
    )
  }
  add_district() {
    this.dailog.open(AddEditDistrictComponent, {
      disableClose: true
    });
  }
  edit_state(row: any) {
    this.dailog.open(AddEditDistrictComponent, {
      data: row
    });
  }

  delete_state(row: any) {
    if (confirm("Are You Sure To Delete")) {
      const deletedata = new FormData();
      deletedata.append('state_id', row.state_id);
      this.manageservice.delete_state(deletedata).subscribe(
        (res: any) => {
          alert('data delete successfully')
        }
      )

    }
    else {
      alert('data not delete')
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
