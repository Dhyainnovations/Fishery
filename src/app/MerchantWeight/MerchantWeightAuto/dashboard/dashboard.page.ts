import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  bluetoothconnected:any=false;
  bluetoothnotconnected:any=true;

  ChangeBluetoothConnection(){
    this.bluetoothconnected =! this.bluetoothconnected ;
    this.bluetoothnotconnected =! this.bluetoothnotconnected;
   
  }
}
