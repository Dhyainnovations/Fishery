import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  constructor(private router: Router) {
    var LocaluserName = (localStorage.getItem("Fishery-username"));
    var Locallogintype = (localStorage.getItem("logintype"));
    var Localpermission = (localStorage.getItem("permission"));




    setTimeout(() => {
      console.log(Locallogintype);
      console.log(Localpermission);

      if(Locallogintype){
         //----------- Login type checking --------------//

      if (Locallogintype == "ROLE_WSHO") {

        //---------- Auto or Manual Checking -----------//

        if (Localpermission == "MANUAL") {
          this.router.navigate(['/centerweight-manual-weighter'])
        }

        if (Localpermission == "AUTO") {
          this.router.navigate(['/centerweight-auto-dashboard'])
        }

      }

      if (Locallogintype == "ROLE_LOCALSALE") {

        //---------- Auto or Manual Checking -----------//

        if (Localpermission == "MANUAL") {
          this.router.navigate(['/BillerManualdashboard'])
        }

        // if (this.userdetails.permission == "AUTO") {
        //   this.router.navigate(['/centerweight-auto-dashboard'])
        // }
      }
      }else{
        this.router.navigate(['/loginpage'])
      }


     
    }, 2200)
  };



  ngOnInit() {

  }



}
