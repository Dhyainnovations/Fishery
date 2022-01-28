import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../weighter/./../../../shared/http.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-weighter',
  templateUrl: './weighter.page.html',
  styleUrls: ['./weighter.page.scss'],
})
export class WeighterPage implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpService, route: ActivatedRoute,) {
    route.params.subscribe(val => {
      this.getCategoryList()
      this.getTypeList()
      this.getLocationList()
      this.records()
    });

  }

  ngOnInit() {
  }
  currentDate = new Date();

  category: any;
  type: any;
  place: any;
  weight: any;

  categorylist: any = []
  locationlist: any = []
  typelist: any = []

  tableRecodrs: any = []

  submit() {
    console.log(this.category, this.place, this.type);
    const data = {
      type: this.type,
      category: this.category,
      place: this.place,
      quantity: this.weight,
      isDeleted: "0",
      boxname: "box"
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

        this.category = '';
        this.type= '';
        this.place= '';
        this.weight = '' ;
        this.records()
      }

    }, (error: any) => {
      console.log(error);
    }
    );


  }


  delete(id){
    console.log(id);
    
    const data = {
      boxid:id,
      isDeleted:"1"
    }
    this.http.post('/delete_manual_weight',data).subscribe((response: any) => {
      this.tableRecodrs = response.records;
      console.log(response);
      if(response.success == "true"){
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
          title: 'Deleted successfully.'
        })
      }else{
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
    this.http.get('/list_category',).subscribe((response: any) => {
      this.categorylist = response.records;
      console.log(response);

    }, (error: any) => {
      console.log(error);
    }
    );

  }

  getTypeList() {
    this.http.get('/list_type',).subscribe((response: any) => {
      this.typelist = response.records;
      console.log(response);

    }, (error: any) => {
      console.log(error);
    }
    );

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


}
