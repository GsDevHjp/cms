import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
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
  batch_delete(data: any) {
    return this.http.post<any>(this.baseUrl + 'batch_delete.php', data);
  }
  get_student() {
    return this.http.get<[]>(this.baseUrl + 'std_view.php');
  }
  post_student(data: any) {
    return this.http.post<any>(this.baseUrl + 'std_insert.php', data);
  }
  put_student(data: any) {
    return this.http.post<any>(this.baseUrl + 'std_update.php', data);
  }

  get_enquiry() {
    return this.http.get<[]>(this.baseUrl + 'enquiry_view.php')
  }
  post_enquiry(data: any) {
    return this.http.post<any>(this.baseUrl + 'enquiry_insert.php', data)
  }
  put_enquiry(data: any) {
    return this.http.put<any>(this.baseUrl + 'enquiry_update.php', data)
  }
  institute_view() {
    return this.http.get<[]>(this.baseUrl + 'institute_view.php');
  }
  inst_post(data: any) {
    return this.http.post<any>(this.baseUrl + 'inst_insert.php', data);
  }
  delete_inst(data: any) {
    return this.http.post<any>(this.baseUrl + 'inst_delete.php', data);
  }
  put_inst(data: any) {
    return this.http.post<any>(this.baseUrl + 'inst_update.php', data);
  }
  inst_self_reg(data: any) {
    return this.http.post<any>(this.baseUrl + 'inst_self_reg.php', data);
  }
  std_self_reg(data: any) {
    return this.http.post<any>(this.baseUrl + 'std_self_reg.php', data);
  }
  std_query(data: any) {
    return this.http.post<any>(this.baseUrl + 'std_query.php', data);
  }
  query_view() {
    return this.http.get<[]>(this.baseUrl + "query_view.php")
  }
  std_query_update(data: any) {
    return this.http.put<any>(this.baseUrl + 'query_update.php', data);
  }
  delete_query(data: any) {
    return this.http.post<any>(this.baseUrl + 'query_delete.php', data);
  }
}
