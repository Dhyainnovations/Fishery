import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../weighter/./../../../shared/http.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-center-weight-manual-record',
  templateUrl: './center-weight-manual-record.page.html',
  styleUrls: ['./center-weight-manual-record.page.scss'],
})
export class CenterWeightManualRecordPage implements OnInit {

  constructor(public navCtrl: NavController ,private router: Router, private activatedRoute: ActivatedRoute, private http: HttpService, route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.totalWeight()
      this.locationBasedWeightRecords()
      this.records()
    });
  }

  ngOnInit() {

  }

  totalweight:any = '' ;
  tableRecodrs:any = []
  cardRecords:any = []


  totalWeight() {
    this.http.get('/list_total_weight',).subscribe((response: any) => {
      this.totalweight = response.records.total_weight;
      console.log(this.totalweight);

    }, (error: any) => {
      console.log(error);
    }
    );
  }


  locationBasedWeightRecords() {
    this.http.get('/location_weight',).subscribe((response: any) => {
      this.tableRecodrs = response.records;
      console.log(response);

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
    this.router.navigate(['/centerweight-manual-weighter'])
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
