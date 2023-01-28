import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ManageService {
  constructor(private http: HttpClient) {}
  // baseUrl: string ='https://greensoft.net.in/gscms/api/';
  baseUrl: string = 'http://localhost/cmsapi/';

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
  post_batch(data: any) {
    return this.http.post<any>(this.baseUrl + 'batch_insert.php', data);
  }
  put_batch(data: any) {
    return this.http.put<any>(this.baseUrl + 'batch_update.php', data);
  }
  batch_delete(data: any){
    return this.http.post<any>(this.baseUrl + 'batch_delete.php', data);
  }
  post_student(data: any){
    return this.http.post<any>(this.baseUrl + 'std_insert.php', data);
  }
  put_student(data: any) {
    return this.http.post<any>(this.baseUrl + 'std_update.php', data);
  }
  get_student() {
    return this.http.get<[]>(this.baseUrl + 'std_view.php');
  }
}
