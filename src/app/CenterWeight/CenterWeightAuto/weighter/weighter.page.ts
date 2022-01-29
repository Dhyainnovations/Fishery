import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../weighter/./../../../shared/http.service';
import { Router } from '@angular/router'
import { Network } from '@awesome-cordova-plugins/network/ngx';

@Component({
  selector: 'app-weighter',
  templateUrl: './weighter.page.html',
  styleUrls: ['./weighter.page.scss'],
})
export class WeighterPage implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpService, route: ActivatedRoute,private network: Network,) {
    route.params.subscribe(val => {
      this.getCategoryList()
      this.getTypeList()
      this.getLocationList();
      window.addEventListener('offline', ()=>{
        alert("Offline")
      });
      window.addEventListener('online', ()=>{
        alert("Online")
      });
    });

   }

  ngOnInit() {
  }
  currentDate = new Date();

  categorylist:any = []
  locationlist:any = []
  typelist:any = []

  getCategoryList(){
    this.http.get('/list_category', ).subscribe((response: any) => {
      this.categorylist = response.records;
      console.log(response);

    }, (error: any) => {
      console.log(error);
    }
    );

  }
  
  getTypeList(){
    this.http.get('/list_type', ).subscribe((response: any) => {
      this.typelist = response.records;
      console.log(response);

    }, (error: any) => {
      console.log(error);
    }
    );

  }

  getLocationList(){
    this.http.get('/list_location', ).subscribe((response: any) => {
      this.locationlist = response.records;
      console.log(response);

    }, (error: any) => {
      console.log(error);
    }
    );

  }


}
