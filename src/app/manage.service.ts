import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ManageService {

  constructor(
    private http: HttpClient
  ) { }
  baseUrl: string = 'https://greensoft.net.in/gscms/api/';

  //for admin
  admin_login(data:any){
    return this.http.post<[]>(this.baseUrl + 'this.admin_login.php', data)
  }
  // for course module 
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
  get_course_by_inst_id(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_course_by_inst_id.php', data);
  }

  // for batch module 
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
    return this.http.post<any>(this.baseUrl + 'batch_update.php', data);
  }
  get_batch_by_inst_id(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_batch_by_inst_id.php', data);
  }
  get_batch_by_course_id(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_batch_by_course_id.php', data);
  }

  // for student module 
  get_student() {
    return this.http.get<[]>(this.baseUrl + 'std_view.php');
  }
  post_student(data: any) {
    return this.http.post<any>(this.baseUrl + 'std_insert.php', data);
  }
  put_student(data: any) {
    return this.http.post<any>(this.baseUrl + 'std_update.php', data);
  }
  std_self_reg(data: any) {
    return this.http.post<any>(this.baseUrl + 'std_self_reg.php', data);
  }
  get_student_by_inst_id(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_student_by_inst_id.php', data);
  }
  std_login(data: any) {
    return this.http.post<any>(this.baseUrl + 'student_login.php', data);
  }
  std_admission(data: any) {
    return this.http.post<any>(this.baseUrl + 'student_admission_insert.php', data);
  }
  get_inst_by_inst_id(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_inst_by_inst_id.php', data);
  }
  get_admission_id_by_std_id(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_inst_by_inst_id.php', data);
  }

  // for fee module component payment recive
  get_fee() {
    return this.http.get<[]>(this.baseUrl + 'fee_view.php')
  }
  get_student_by_std_id(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_student_by_std_id.php', data);
  }
  post_fee(data: any) {
    return this.http.post<any>(this.baseUrl + 'fee_insert.php', data);
  }
  put_fee(data: any) {
    return this.http.post<any>(this.baseUrl + 'fee_update.php', data);
  }
  get_course_by_course_id(data:any){
    return this.http.post<any>(this.baseUrl + 'get_course_by_course_id.php', data);
  }

  // for enquiry module 
  get_enquiry() {
    return this.http.get<[]>(this.baseUrl + 'enquiry_view.php')
  }
  post_enquiry(data: any) {
    return this.http.post<any>(this.baseUrl + 'enquiry_insert.php', data)
  }
  put_enquiry(data: any) {
    return this.http.put<any>(this.baseUrl + 'enquiry_update.php', data)
  }
  // for quiz module 

  get_quiz() {
    return this.http.get<[]>(this.baseUrl + 'quiz_view.php');
  }
  post_quiz(data: any) {
    return this.http.post<any>(this.baseUrl + 'quiz_insert.php', data)
  }
  put_quiz(data: any) {
    return this.http.put<any>(this.baseUrl + 'quiz_update.php', data)
  }
  quiz_delete(data: any) {
    return this.http.post<any>(this.baseUrl + 'quiz_delete.php', data);
  }

  // for notification module
  post_notification(data: any) {
    return this.http.post<any>(this.baseUrl + 'notification_insert.php', data);
  }
  put_notification(data: any) {
    return this.http.put<any>(this.baseUrl + 'notification_update.php', data)
  }

  get_notification_by_inst_id(){
    return this.http.get<[]>(this.baseUrl + 'get_notification_by_inst_id.php',);
  }
  get_notification() {
    return this.http.get<[]>(this.baseUrl + 'notification_view.php',);
  }
  notification_delete(data: any) {
    return this.http.post<any>(this.baseUrl + 'notification_delete.php', data);
  }

  // for inst book module
  post_inst_book(data: any) {
    return this.http.post<any>(this.baseUrl + 'inst_book_insert.php', data);
  }
  put_inst_book(data: any) {
    return this.http.post<any>(this.baseUrl + 'inst_book_update.php', data)
  }
  get_inst_book_view() {
    return this.http.get<[]>(this.baseUrl + 'inst_book_view.php')
  }
  inst_book_delete(data: any) {
    return this.http.post<any>(this.baseUrl + 'inst_book_delete.php', data);
  }
  get_book_by_inst_id(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_book_by_inst_id.php', data);
  }
  // for inst notes module
  get_inst_notes() {
    return this.http.get<[]>(this.baseUrl + 'inst_notes_view.php');
  }
  post_inst_notes(data: any) {
    return this.http.post<any>(this.baseUrl + 'inst_notes_insert.php', data);
  }
  put_inst_notes(data: any) {
    return this.http.post<any>(this.baseUrl + 'inst_notes_update.php', data);
  }
  inst_notes_delete(data: any) {
    return this.http.post<any>(this.baseUrl + 'inst_notes_delete.php', data);
  }
  get_notes_by_inst_id(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_notes_by_inst_id.php', data);
  }
 
  // for inst syllabus module
  get_syllabus_by_inst_id() {
    return this.http.get<[]>(this.baseUrl + 'get_syllabus_by_inst_id.php');
  } 
  post_inst_syllabus(data: any) {
    return this.http.post<any>(this.baseUrl + 'inst_syllabus_insert.php', data);
  }
  put_inst_syllabus(data: any) {
    return this.http.post<any>(this.baseUrl + 'inst_syllabus_update.php', data);
  }
  inst_syllabus_delete(data: any) {
    return this.http.post<any>(this.baseUrl + 'inst_syllabus_delete.php', data);
  }

  // for inst question bank module
  get_question_bank_by_inst_id(data:any) {
    return this.http.post<any>(this.baseUrl + 'get_question_bank_by_inst_id.php', data);
  }
  post_inst_question_bank(data: any) {
    return this.http.post<any>(this.baseUrl + 'inst_question_bank_insert.php', data);
  }
  put_inst_question_bank(data: any) {
    return this.http.post<any>(this.baseUrl + 'inst_question_bank_update.php', data);
  }
  inst_question_bank_delete(data: any) {
    return this.http.post<any>(this.baseUrl + 'inst_question_bank_delete.php', data);
  }

  // for institute module 
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
  inst_login(data: any) {
    return this.http.post<any>(this.baseUrl + 'institute_login.php', data);
  }

  // for query module 

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

  // for admission 
  get_admission() {
    return this.http.get<[]>(this.baseUrl + 'admission_view.php')
  }
  get_admission_by_inst_id(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_admission_by_inst_id.php', data);
  }

}
