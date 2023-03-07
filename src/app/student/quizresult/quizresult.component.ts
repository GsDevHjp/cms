import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quizresult',
  templateUrl: './quizresult.component.html',
  styleUrls: ['./quizresult.component.css']
})
export class QuizresultComponent implements OnInit {
  url: string = 'https://greensoft.net.in/gscms/assets/';
  img_url: string = '';
  login_deatils: any
  login: any
  score: number = 0
  result: number = 0
  grade: number = 0
  constructor() { }

  ngOnInit(): void {
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)

    if (!this.login.std_img) {
      this.img_url = "profile.png"
    }
    else {
      this.img_url = this.login.std_img
    }
  }

}
