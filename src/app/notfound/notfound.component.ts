import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  constructor() { }


  reload() {
    localStorage.removeItem('token');
    location.reload();
  }
  ngOnInit() {
  }

}
