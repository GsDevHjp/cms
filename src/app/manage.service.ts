import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManageService {

  constructor(
    private http: HttpClient
  ) { }
  // baseUrl: string ='https://greensoft.net.in/gscms/api/';
  baseUrl: string = 'http://localhost/cmsapi/';

  get_course() {
    return this.http.get<[]>(this.baseUrl + 'course_view.php');
  }
  institute_view() {
    return this.http.get<[]>(this.baseUrl + 'institute_view.php');
  }
  instpost(data: any) {
    return this.http.post<any>(this.baseUrl + 'inst_insert.php', data);
  }
  delete_inst(data:any) {
    return this.http.post<any>(this.baseUrl + 'inst_delete.php', data);
  }
  putinst(data: any) {
    return this.http.post<any>(this.baseUrl + 'inst_update.php', data);
  }
}
