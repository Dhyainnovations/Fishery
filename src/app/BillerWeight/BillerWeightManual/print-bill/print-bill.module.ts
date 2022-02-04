import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrintBillPageRoutingModule } from './print-bill-routing.module';

import { PrintBillPage } from './print-bill.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrintBillPageRoutingModule
  ],
  declarations: [PrintBillPage]
})
export class PrintBillPageModule {}
