import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../weighter/./../../../shared/http.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-bill',
  templateUrl: './bill.page.html',
  styleUrls: ['./bill.page.scss'],
})
export class BillPage implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpService, route: ActivatedRoute,) {
    route.params.subscribe(val => {
      this.GetBillDataFromLocalStorage();

    });

  }

  ngOnInit() {
    this.name = localStorage.getItem("Fishery-username",)
    this.location = localStorage.getItem("orgid",)
  }
  currentDate = new Date();

  name: any;
  location: any;
  price: any = [];
  totalsum: any = "";
  backToPrivious() {
    this.router.navigate(['/BillerManualdashboard'])
  }


  // SelectPriceBasedOnQualityAndCategory() {
  //   console.log(this.GetBillDataFromLocalStorageData);
  //   for (var i = 0; i <= this.GetBillDataFromLocalStorageData.length; i++) {

  //     var localcategory = this.GetBillDataFromLocalStorageData[i].quality;
  //     var localquality = this.GetBillDataFromLocalStorageData[i].category;
  //     const data = {
  //       quality: localcategory,
  //       category: localquality,
  //     }


  //     console.log(data);

  //     this.http.post('/price', data).subscribe((response: any) => {
  //       console.log(response);
  //       for (var i = 0; i <= response.records.length; i++) {
  //         console.log(response.records[i].price);
  //         this.price.push(response.records[i].price);
  //       }



  //     }, (error: any) => {
  //       console.log(error);
  //     }
  //     );

  //   }


  // }
  purchaseddate: any;
  counter: any;
  userid: any;
  passBillItems: any = []
  printBill() {
    const data = {
      billitems: this.passBillItems,
      totalamount: this.totalsum,
      counter: this.counter,
      userid: this.userid,
      isDeleted: "0",
      purchaseddate: this.purchaseddate,
    }
    this.http.post('/manual_bill', data).subscribe((response: any) => {
      console.log(response);

    }, (error: any) => {
      console.log(error);
    }
    );
    this.router.navigate(['/billerweight-manual-print-bill'])
  }


  GetBillDataFromLocalStorageData: any = [];

  GetBillDataFromLocalStorage() {
    var GetBillerAddItem = localStorage.getItem("SetBillerAddItem");
    console.log(GetBillerAddItem);
    var DecodeBillerData = (JSON.parse((GetBillerAddItem)));
    console.log(DecodeBillerData);
    for (var i = 0; i < DecodeBillerData.length; i++) {
      var localcategory = DecodeBillerData[i].category
      var localcounter = DecodeBillerData[i].counter
      var localid = DecodeBillerData[i].id;
      var localisDeleted = DecodeBillerData[i].isDeleted;
      var localprice = DecodeBillerData[i].cost;
      var localpurchaseddate = DecodeBillerData[i].purchaseddate;
      var localquality = DecodeBillerData[i].quality;
      var localuserid = DecodeBillerData[i].userid;
      var localweight = DecodeBillerData[i].weight;
      const SendData = {
        category: localcategory,
        counter: localcounter,
        id: localid,
        isDeleted: localisDeleted,
        purchaseddate: localpurchaseddate,
        price: localprice,
        quality: localquality,
        userid: localuserid,
        weight: localweight,
        totalcost: localprice * localweight,
      }
      const SendPushData = {
        id: localid,
        price: localprice,
        quality: localquality,
        weight: localweight,
      }
      this.price.push(SendData.totalcost);
      var sum = this.price.reduce((a, b) => {
        return a + b;
      });
      console.log(sum);
      this.totalsum = sum;
      this.userid = SendData.id;
      this.purchaseddate = SendData.purchaseddate;
      this.counter = SendData.counter;
      this.passBillItems.push(SendPushData);
      this.GetBillDataFromLocalStorageData.push(SendData);
      console.log(this.GetBillDataFromLocalStorageData);
    }
  }
}
