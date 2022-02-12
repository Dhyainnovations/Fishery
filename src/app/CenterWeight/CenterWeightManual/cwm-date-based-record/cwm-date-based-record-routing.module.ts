import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CWMDateBasedRecordPage } from './cwm-date-based-record.page';

const routes: Routes = [
  {
    path: '',
    component: CWMDateBasedRecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CWMDateBasedRecordPageRoutingModule {}
