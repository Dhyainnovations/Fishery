import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrintBillPage } from './print-bill.page';

const routes: Routes = [
  {
    path: '',
    component: PrintBillPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintBillPageRoutingModule {}
