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
  }
  currentDate = new Date();

  backToPrivious(){
    this.router.navigate(['/BillerManualbill'])
  }

  printbill(){
    window.print();

  }
}
