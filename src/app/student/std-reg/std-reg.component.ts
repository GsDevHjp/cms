import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-std-reg',
  templateUrl: './std-reg.component.html',
  styleUrls: ['./std-reg.component.css']
})
export class StdRegComponent implements OnInit {
  hide = true;
  registration_form:any

  constructor() { }

  ngOnInit(): void {
  }

}
