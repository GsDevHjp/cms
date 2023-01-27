import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManageService {

  constructor(
    private http: HttpClient
  ) { }
  
  baseUrl: string ='https://greensoft.net.in/gscms/api/';
  // baseUrl: string ='http://localhost/cmsapi/';

  get_course() {
    return this.http.get<[]>(this.baseUrl + 'course_view.php');
  }
  post_course(data: any) {
    return this.http.post<any>(this.baseUrl + 'course_insert.php', data);
  }
  put_course(data: any) {
    return this.http.put<any>(this.baseUrl + 'course_update.php', data);
  }
  course_delete(data: any) {
    return this.http.post<any>(this.baseUrl + 'course_delete.php', data);
  }
  get_batch() {
    return this.http.get<[]>(this.baseUrl + 'batch_view.php');
  }
  get_student() {
    return this.http.get<[]>(this.baseUrl + 'std_view.php');
  }
}
