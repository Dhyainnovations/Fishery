import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  constructor(private router: Router) { 
    var userdetails = (localStorage.getItem("Fishery-username"));
      
      
      setTimeout(()=>{
        if(userdetails){
          // this.router.navigate(['/centerweight-auto-dashboard'])
        }else{
          // this.router.navigate(['/'])
        }
        this.router.navigate(['/loginpage'])
      },2200)
    };
  
  

  ngOnInit() {
    
  }

}
