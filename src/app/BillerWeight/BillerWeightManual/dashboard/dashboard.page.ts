

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../weighter/./../../../shared/http.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';
import { Network } from '@awesome-cordova-plugins/network/ngx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpService, route: ActivatedRoute, private network: Network,) {
    route.params.subscribe(val => {

      this.getCategoryList()
      this.getTypeList()
      window.addEventListener('offline', () => {
        this.checkoffline = true;
        this.offlineAlart = true
        this.onlineAlart = false;
      });
      window.addEventListener('online', () => {
        this.onlineAlart = true;
        this.offlineAlart = false
        this.checkonline = true;


      });
    });

  }

  ngOnInit() {

    this.http.get('/list_type_manual').subscribe((response: any) => {
      console.log(response);
      if (response.success == "true") {
      }
    }, (error: any) => {
      console.log(error);
    }
    );

  }

  currentDate = new Date();

  checkoffline: any;
  checkonline: any;
  setpushdata: any = [];
  category: any;
  type: any;
  price: any;
  weight: any;

  categorylist: any = []

  typelist: any = []

  tableRecodrs: any = []
  buttonDisabled: boolean;
  onlineAlart: any = true;
  offlineAlart: any = false


  SelectType(data) {
    const formdata = new FormData();
    formdata.append("type", data.type);
    this.price = data.type;
  }


  SelectPrice(data) {
    const formdata = new FormData();
    formdata.append("price", data.price);
    this.type = data.price;
  }


  StoreTypeBasedOnCategory = [];
  StoreTypeData = [];

  
  SelectCategory(data) {
    this.StoreTypeData = [];
    const formdata = new FormData();
    formdata.append("category", data.category);
    console.log(data.category);
    this.category = data.category;

    var GetTypeBasedOnCategory = localStorage.getItem('SetTypeBasedOnCategory');
    this.StoreTypeBasedOnCategory = (JSON.parse((GetTypeBasedOnCategory)));
    for (var i = 0; i <= this.StoreTypeBasedOnCategory.length; i++) {
      const listTypeBasedOnCategory = {
        Categorypush: this.StoreTypeBasedOnCategory[i].category,
        Typepush: this.StoreTypeBasedOnCategory[i].type
      }
      //console.log(listTypeBasedOnCategory);
      if (this.category == listTypeBasedOnCategory.Categorypush) {

        this.StoreTypeData.push(listTypeBasedOnCategory.Typepush);
        console.log(this.StoreTypeData);

      }

    }
    console.log(this.StoreTypeData);


  }





  getCategoryList() {
    var GetCategory = localStorage.getItem('SetCategory');
    this.categorylist = (JSON.parse((GetCategory)));
    //console.log(DisplayCategory);
  }

  getTypeList() {
    var GetType = localStorage.getItem('SetType');
    this.typelist = (JSON.parse((GetType)));

  }



  dosomething(event) {
    setTimeout(() => {
      event.target.complete();
    }, 1500);
  }

  value: any;

  NavigateTo() {
    console.log(this.value);
    if (this.value == "settings") {
      this.router.navigate(['/settings'])
    } else {
      this.logout()
    }


  }




  logout() {
    localStorage.removeItem("orgid",)
    localStorage.removeItem("Fishery-username",)
    localStorage.removeItem("logintype",)
    localStorage.removeItem("permission",)
    this.router.navigate(['/'])
  }

}
