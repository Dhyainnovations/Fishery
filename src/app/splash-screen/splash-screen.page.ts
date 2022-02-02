import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  constructor(private router: Router) {
    this.Locallogintype = localStorage.getItem("logintype",)
    this.Localpermission = localStorage.getItem("permission",)
    setTimeout(() => {
      if(this.Locallogintype){
        this.checkToNavigate()
      }
      else if(this.Locallogintype == null){
        this.router.navigate(['/loginpage'])
      }
      
    }, 2500)
  
  }
   
  ngOnInit() {
    
  }

  Locallogintype: any
  Localpermission: any



  checkToNavigate(){
       //-------center login check----------//

       if (this.Locallogintype == "ROLE_WSHO") {

        //---------- Auto or Manual Checking -----------//

        if (this.Localpermission == "MANUAL") {
          this.router.navigate(['/center-weight-manual-record'])
        }

        if (this.Localpermission == "AUTO") {
          this.router.navigate(['/centerweight-auto-dashboard'])
        }

      }



       //-------biller login check----------//

      if (this.Locallogintype == "ROLE_LOCALSALE") {

        //---------- Auto or Manual Checking -----------//

        if (this.Localpermission == "MANUAL") {
          this.router.navigate(['/biller-weight-manual-record'])
        }

        // if (this.userdetails.permission == "AUTO") {
        //   this.router.navigate(['/centerweight-auto-dashboard'])
        // }
      }

      //-------admin login check----------//

      if (this.Locallogintype == "ROLE_ADMIN") {
        this.router.navigate(['/admin-dashboard'])
      }






    }
  }





