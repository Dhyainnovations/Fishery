import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CWADateBasedRecordPage } from './cwa-date-based-record.page';

const routes: Routes = [
  {
    path: '',
    component: CWADateBasedRecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CWADateBasedRecordPageRoutingModule {}
