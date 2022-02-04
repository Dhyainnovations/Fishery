import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../weighter/./../../../shared/http.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-biller-weight-manual-record',
  templateUrl: './biller-weight-manual-record.page.html',
  styleUrls: ['./biller-weight-manual-record.page.scss'],
})
export class BillerWeightManualRecordPage implements OnInit {

  constructor(public navCtrl: NavController, private router: Router, private activatedRoute: ActivatedRoute, private http: HttpService, route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.totalWeight()
      this.records();
      this.list_manual_bill();
    });
  }

  ngOnInit() {

  }

  totalweight: any = '';
  tableRecodrs: any = []
  cardRecords: any = []

  isVisible: any = false


  totalWeight() {
    this.http.get('/list_total_bill_weight',).subscribe((response: any) => {
      this.totalweight = response.records.total_weight;
      console.log(response);


    }, (error: any) => {
      console.log(error);
    }
    );
  }



  
  displaydeatilsTable = [];
  list_manual_bill() {
    this.http.get('/list_manual_bill',).subscribe((response: any) => {
      console.log(response);
      for (var i = 0; i < response.records.length; i++) {
        this.displaydeatilsTable.push(response.records[i])
      }

      console.log(this.displaydeatilsTable);
    }, (error: any) => {
      console.log(error);
    }
    );
  }





  records() {
    this.http.get('/list_manual_weight',).subscribe((response: any) => {
      this.cardRecords = response.records;
      console.log(response);

    }, (error: any) => {
      console.log(error);
    }
    );
  }


  navigateToNextPage() {
    this.router.navigate(['/BillerManualdashboard'])
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

}

