import { Component, OnInit } from '@angular/core';
import { newtoken } from '../index/index.component';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})

export class ResultComponent implements OnInit {

  public new = newtoken;
  public status: number;
  public resultantPlanet: string;
  public time: number;

  constructor() {
  }

  reload() {
    localStorage.removeItem('token');
    location.reload();
  }
  ngOnInit() {
    this.status = this.new.status;
    this.resultantPlanet = this.new.planet;
    this.time = this.new.time;
  }

}
