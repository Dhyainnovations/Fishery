import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  bluetoothconnected:any=false;
  bluetoothnotconnected:any=true;

  ChangeBluetoothConnection(){
    this.bluetoothconnected =! this.bluetoothconnected ;
    this.bluetoothnotconnected =! this.bluetoothnotconnected;
    this.router.navigate(['/centerweight-auto-weighter'])
  } 
}
