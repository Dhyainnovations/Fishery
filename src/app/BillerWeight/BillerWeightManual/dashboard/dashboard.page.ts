
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
      this.dropdownVisible = false

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

      this.generateId()
    });

  }

  ngOnInit() {

    this.userId = localStorage.getItem("orgid",)
    this.user = localStorage.getItem("Fishery-username",)
    this.http.get('/list_type_manual').subscribe((response: any) => {
      console.log(response);
      if (response.success == "true") {
      }
    }, (error: any) => {
      console.log(error);
    }
    );
    this.getList();
    this.getCategoryList();
    this.getQualityList();
  }



  user: any;
  isDisabled: boolean = true;
  currentDate = new Date();
  userId: any;
  checkoffline: any;
  checkonline: any;
  setpushdata: any = [];
  category: any;
  quality: any;
  price: any;
  weight: any;
  counter: any;
  ID: any;
  counterNo: any
  type: any;


  typelist: any = []

  tableRecodrs: any = []
  buttonDisabled: boolean;
  onlineAlart: any = true;
  offlineAlart: any = false
  dropdownVisible: any = false

  backToPrivios() {
    this.router.navigate(['/biller-weight-manual-record'])
  }

  generateId() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    this.ID = '_' + Math.random().toString(36).substr(2, 25);
    console.log(this.ID);
  };

  SelectType(data) {
    const formdata = new FormData();
    formdata.append("type", data.type);
    this.price = data.type;
  }


  SelectPrice(data) {
    const formdata = new FormData();
    formdata.append("price", data.price);
    this.counterNo = data.price;

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


  checkboxsts: any = false

  dropdownOpen() {
    this.checkboxsts = true
    console.log(this.checkboxsts);

  }




  listQualityCategory = [];
  getList() {
    this.http.get('/list_price').subscribe((response: any) => {
      console.log(response);
      this.listQualityCategory = response.records;
    }, (error: any) => {
      console.log(error);
    }
    );
  }

  categorylist = [];
  getCategoryList() {
    this.http.get('/list_category',).subscribe((response: any) => {
      this.categorylist = response.records;
      console.log(this.categorylist);

    }, (error: any) => {
      console.log(error);
    }
    );
  }



  qualityList = [];
  getQualityList() {
    this.http.get('/list_type',).subscribe((response: any) => {
      this.qualityList = response.records;
      console.log(this.qualityList);

    }, (error: any) => {
      console.log(error);
    }
    );
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

  SetBillerAddItem = [];


  cost = [];
  addItem() {
    var localcategory = this.category;
    var localquality = this.type;
    const getPrice = {
      category: localcategory,
      quality: localquality,
    }
    console.log(getPrice);
    this.http.post('/price', getPrice).subscribe((response: any) => {
      console.log(response);
      for (var i = 0; i < response.records.length; i++) {
        this.cost.push(response.records[i].price);
        console.log(this.cost);
        var LocalPrice = (JSON.stringify(this.cost));
        localStorage.setItem('LocalPrice', LocalPrice);
      }

    }, (error: any) => {
      console.log(error);
    }
    );


    const data = {
      category: this.category,
      id: this.ID,
      quality: this.type,
      weight: this.weight,
      counter: this.counter,
      userid: this.userId,
      isDeleted: "0",
      purchaseddate: this.currentDate
    }

    console.log(data);

    //   this.http.post('/manual_bill', data).subscribe((response: any) => {
    //     console.log(response);
    //     if (response.success == "true") {
    //       this.weight = ''
    //     }
    //   }, (error: any) => {
    //     console.log(error);
    //   }
    //   );
    this.SetBillerAddItem.push(data);
    console.log(this.SetBillerAddItem);
    var SetBillerAddItem = (JSON.stringify(this.SetBillerAddItem));
    localStorage.setItem('SetBillerAddItem', SetBillerAddItem);


    //toast
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Item Added Successfully'
    })
  }

  generateBill() {
    this.router.navigate(['/BillerManualbill'])
  }


  logout() {
    localStorage.removeItem("orgid",)
    localStorage.removeItem("Fishery-username",)
    localStorage.removeItem("logintype",)
    localStorage.removeItem("permission",)
    this.router.navigate(['/loginpage'])
  }

}
