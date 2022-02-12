import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../weighter/./../../../shared/http.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';
import { NavController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Network } from '@awesome-cordova-plugins/network/ngx';
@Component({
  selector: 'app-cwm-date-based-record',
  templateUrl: './cwm-date-based-record.page.html',
  styleUrls: ['./cwm-date-based-record.page.scss'],
})
export class CWMDateBasedRecordPage implements OnInit {

  constructor(private network: Network, public datepipe: DatePipe, public navCtrl: NavController, private http: HttpService, private router: Router, private route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.records()
      this.LoadReadData();
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

  LoadReadData() {
    this.route.queryParams.subscribe(params => {
     
      this.fromdate = params.fromdate;
      this.todate = params.todate;

      console.log(this.fromdate , this.todate);
    }
    );
  }


  ngOnInit() {
    this.LoadReadData()
    this.tableRecodrs = []

    this.locFromDate = localStorage.getItem("fromDate",)
    this.locToDate = localStorage.getItem("toDate",)

    console.log(this.locFromDate, this.locToDate);
    
  }

  fromdate;
  todate;
  locFromDate;
  locToDate;
  disableSts: any = false;
  checkoffline: any;
  checkonline: any;
  buttonDisabled: boolean;
  onlineAlart: any = true;
  offlineAlart: any = false

  tableRecodrs:any = []
  totalQuantity;


  backToPrivios() {
    this.router.navigate(['/center-weight-manual-record'])
  }

  records() {
    const data = {
      from_date:this.fromdate,
      to_date:this.todate
    }

    console.log(data);
    
    this.http.post('/list_date_manual_weight', data).subscribe((response: any) => {
      console.log(response);
      this.totalQuantity = response.total_quantity
      this.tableRecodrs = response.records;
      console.log(response);

    }, (error: any) => {
      console.log(error);
    }
    );
  }


}
