import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../weighter/./../../../shared/http.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';
import { Network } from '@awesome-cordova-plugins/network/ngx';

@Component({
  selector: 'app-weighter',
  templateUrl: './weighter.page.html',
  styleUrls: ['./weighter.page.scss'],
})
export class WeighterPage implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpService, route: ActivatedRoute, private network: Network,) {
    route.params.subscribe(val => {

      this.getCategoryList()
      this.getTypeList()
      this.getLocationList()
      this.records();
      window.addEventListener('offline', () => {
        this.checkoffline = true;
        this.offlineAlart = true
        this.onlineAlart = false;
      });
      window.addEventListener('online', () => {
        this.onlineAlart = true;
        this.offlineAlart = false
        this.checkonline = true;
        this.offlineApiCall();

      });
    });

  }

  ngOnInit() {


  }

  currentDate = new Date();

  checkoffline: any;
  checkonline: any;
  setpushdata: any = [];
  category: any;
  type: any;
  place: any;
  weight: any;

  categorylist: any = []
  locationlist: any = []
  typelist: any = []

  tableRecodrs: any = []
  buttonDisabled: boolean;
  onlineAlart: any = true;
  offlineAlart: any = false


  offlineApiCall() {
    if (this.checkonline = true) {

      var Getdata = localStorage.getItem("added-items");
      var Decodedata = (JSON.parse((Getdata)));
      for (var i = 0; i < Decodedata.length; i++) {

        var localtype = Decodedata[i].type;
        var localcategory = Decodedata[i].category;
        var localplace = Decodedata[i].place;
        var localquantity = Decodedata[i].quantity;
        var localisDeleted = "0";
        var localboxname = "box"


        const data = {
          type: localtype,
          category: localcategory,
          place: localplace,
          quantity: localquantity,
          isDeleted: localisDeleted,
          boxname: localboxname
        }
        this.http.post('/manual_weight', data).subscribe((response: any) => {

          console.log(response);

          if (response.success == "true") {

          }

        }, (error: any) => {
          console.log(error);

        }
        );
      }
    }

  }


  onlineApiCal() {
    console.log(this.category, this.place, this.type);
    const data = {
      type: this.type,
      category: this.category,
      place: this.place,
      quantity: this.weight,
      isDeleted: "0",
      boxname: "box"
    }

    //----------If Offline----------//
    if (this.checkoffline = true) {
      this.setpushdata.push(data);
      console.log(this.setpushdata);
      var setdata = (JSON.stringify(this.setpushdata));
      localStorage.setItem('added-items', setdata);
    }


    this.http.post('/manual_weight', data).subscribe((response: any) => {
      console.log(response);
      if (response.success == "true") {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Submited successfully.'
        })

        this.category = null;
        this.type = null;
        this.place = null;
        this.weight = '';
        this.records()
      }

    }, (error: any) => {
      console.log(error);
    }
    );


  }


  delete(id) {
    console.log(id);

    const data = {
      boxid: id,
      isDeleted: "1"
    }

    this.http.post('/delete_manual_weight', data).subscribe((response: any) => {
      this.tableRecodrs = response.records;
      console.log(response);
      if (response.success == "true") {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Deleted successfully.'
        })

        this.records()

      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'error',
          title: 'Something went Wrong.'
        })
      }

    }, (error: any) => {
      console.log(error);
    }
    );
  }

  records() {
    this.http.get('/list_manual_weight',).subscribe((response: any) => {
      this.tableRecodrs = response.records;
      console.log(response);

    }, (error: any) => {
      console.log(error);
    }
    );
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

  getLocationList() {
    var GetLocation = localStorage.getItem('SetLocation');
    this.locationlist = (JSON.parse((GetLocation)));
  }

  dosomething(event) {
    setTimeout(() => {
      event.target.complete();
    }, 1500);
  }

  value:any;

  NavigateTo() {
    console.log(this.value);
    if(this.value == "settings"){
      this.router.navigate(['/settings'])
    }else{
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
