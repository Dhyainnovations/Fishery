import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';;

@Component({
  selector: 'app-print-bill',
  templateUrl: './print-bill.page.html',
  styleUrls: ['./print-bill.page.scss'],
})
export class PrintBillPage implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, route: ActivatedRoute) { }

  ngOnInit() {
    this.GetBillDataFromLocalStorage();
  }
  currentDate = new Date();

  backToPrivious() {
    this.router.navigate(['/BillerManualdashboard'])
  }

  printbill() {
    window.print();
  }
totalprice:any="";
  price: any = [];
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

      this.price.push(SendData.totalcost);
      var sum = this.price.reduce((a, b) => {
        return a + b;
      });
      console.log(sum);
      this.totalprice=sum;

      this.GetBillDataFromLocalStorageData.push(SendData);
      console.log(this.GetBillDataFromLocalStorageData);
    }
  }
}
