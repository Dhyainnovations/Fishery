import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weighter',
  templateUrl: './weighter.page.html',
  styleUrls: ['./weighter.page.scss'],
})
export class WeighterPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  currentDate = new Date();
}
