import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../weighter/./../../../shared/http.service';
import { Router } from '@angular/router'
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { AlertController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-weighter',
  templateUrl: './weighter.page.html',
  styleUrls: ['./weighter.page.scss'],
})
export class WeighterPage implements OnInit {

  constructor(public datepipe: DatePipe, private router: Router, private activatedRoute: ActivatedRoute, private http: HttpService, route: ActivatedRoute, private network: Network, private bluetoothSerial: BluetoothSerial, private alertController: AlertController, private cdr: ChangeDetectorRef,) {
    route.params.subscribe(val => {

      this.currentDateTime = this.datepipe.transform((new Date), 'yyyy-MM-dd hh:mm:ss');
      this.getCategoryList()
      this.getLocationList();
      this.records()
      window.addEventListener('offline', () => {
        this.checkoffline = true;
        this.offlineAlart = true
        this.onlineAlart = false;
      });
      window.addEventListener('online', () => {
        this.refresh()
        this.onlineAlart = true;
        this.offlineAlart = false
        this.checkonline = true;
      });
    });
    this.deviceConnected();
  }


  dateTime(){
    this.currentDateTime = this.datepipe.transform((new Date), 'yyyy-MM-dd hh:mm:ss');
  }

  ngOnInit() {

    this.currentDateTime = this.datepipe.transform((new Date), 'yyyy-MM-dd hh:mm:ss');

    const start = Date.now();
    console.log(start);

    this.user = localStorage.getItem("Fishery-username",)
    console.log(this.user);


  }

  user: any;
  dropdownVisible: any = false;
  currentDate = new Date();

  categorylist: any = []
  locationlist: any = []
  typelist: any = []

  recivedWeightValue: any = " ";

  category: any;
  currentDateTime: any;
  checkoffline: any;
  checkonline: any;
  setpushdata: any = [];
  type: any;
  place: any;
  weight: any;
  mdy: any;
  

  tableRecodrs: any = []
  buttonDisabled: boolean;
  onlineAlart: any = true;
  offlineAlart: any = false;



  records() {
    this.http.get('/list_manual_weight',).subscribe((response: any) => {
      this.tableRecodrs = response.records;
      console.log(response);

    }, (error: any) => {
      console.log(error);
    }
    );
  }


  backToPrivios() {
    this.router.navigate(['/center-weight-auto-record'])
  }
  
  onlineApiCal() {
    console.log(this.category, this.place, this.type);
    //console.log(formattedDate);
    const data = {
      quality: this.type,
      type: "center",
      category: this.category,
      place: this.place,
      quantity: this.recivedWeightValue,
      isDeleted: "0",
      boxname: "box",
      updatedAt: this.currentDateTime
    }

    console.log(data);
    
    this.http.post('/manual_weight', data).subscribe((response: any) => {
      console.log(response);
      this.dateTime()
      if (response.success == "true") {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
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

        this.weight = "";
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

  getCategoryList() {
    this.http.get('/list_category',).subscribe((response: any) => {
      this.categorylist = response.records;
      console.log(response);

    }, (error: any) => {
      console.log(error);
    }
    );

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

  getLocationList() {
    this.http.get('/list_location',).subscribe((response: any) => {
      this.locationlist = response.records;
      console.log(response);

    }, (error: any) => {
      console.log(error);
    }
    );

  }



  deviceConnected() {
    this.bluetoothSerial.subscribeRawData().subscribe((dt) => {
      this.bluetoothSerial.read().then((dd) => {
        this.onDataReceive(dd);
        this.cdr.detectChanges(); // either here
      });
    });
  }
  
  onDataReceive(val) {
    var data = JSON.stringify(val)
    this.recivedWeightValue = val;
    var data1 = data.replace('\\r\\n', '')
    this.cdr.detectChanges(); // or here
  }


  refresh() {
    //----------- Category Local Storage --------------//
    this.http.get('/list_category',).subscribe((response: any) => {
      var SetCategory = (JSON.stringify(response.records));
      localStorage.setItem('SetCategory', SetCategory);
    }, (error: any) => {
      console.log(error);
    }
    );

    //----------- Type Local Storage --------------//
    this.http.get('/list_type',).subscribe((response: any) => {
      var SetType = (JSON.stringify(response.records));
      localStorage.setItem('SetType', SetType);
    }, (error: any) => {
      console.log(error);
    }
    );

    //----------- Location Local Storage --------------//
    this.http.get('/list_location',).subscribe((response: any) => {
      var SetLocation = (JSON.stringify(response.records));
      localStorage.setItem('SetLocation', SetLocation);
    }, (error: any) => {
      console.log(error);
    });


    //----------- Set Type Based On Category Local Storage --------------//

    // this.http.get('/list_type_manual').subscribe((response: any) => {
    //   var SetTypeBasedOnCategory = (JSON.stringify(response.records));
    //   localStorage.setItem('SetTypeBasedOnCategory', SetTypeBasedOnCategory);

    // }, (error: any) => {
    //   console.log(error);
    // }
    // );
  }

  dosomething(event) {
    setTimeout(() => {
      event.target.complete();

      this.refresh()

    }, 1500);
  }


  logout() {
    this.dropdownVisible = false
    localStorage.removeItem("orgid",)
    localStorage.removeItem("Fishery-username",)
    localStorage.removeItem("logintype",)
    localStorage.removeItem("permission",)
    this.router.navigate(['/loginpage'])
  }
 
  

}
