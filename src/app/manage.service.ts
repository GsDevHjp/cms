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

  get_course() {
    return this.http.get<[]>(this.baseUrl + 'course_view.php');
  }
}
