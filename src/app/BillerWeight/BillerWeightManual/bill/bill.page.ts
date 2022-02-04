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
  totalsum:any="";
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



  printBill() {
    this.router.navigate(['/billerweight-manual-print-bill'])
  }


  GetBillDataFromLocalStorageData: any = [];
  GetBillDataFromLocalStorage() {

    var GetBillerAddItem = localStorage.getItem("SetBillerAddItem");
    var DecodeBillerData = (JSON.parse((GetBillerAddItem)));
    var LocalPrice = localStorage.getItem("LocalPrice");
    var DecodeLocalPrice = (JSON.parse((LocalPrice)));
    for (var i = 0; i < DecodeBillerData.length; i++) {
      var localcategory = DecodeBillerData[i].category
      var localcounter = DecodeBillerData[i].counter
      var localid = DecodeBillerData[i].id;
      var localisDeleted = DecodeBillerData[i].isDeleted;
      var localprice = DecodeLocalPrice[i];
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

      this.price.push(SendData.totalcost);
      var sum = this.price.reduce((a, b) => {
        return a + b;
      });

      console.log(sum);
      this.totalsum = sum;


      this.GetBillDataFromLocalStorageData.push(SendData);
      console.log(this.GetBillDataFromLocalStorageData);
    }
  }
}
