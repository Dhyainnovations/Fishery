import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CWMDateBasedRecordPageRoutingModule } from './cwm-date-based-record-routing.module';

import { CWMDateBasedRecordPage } from './cwm-date-based-record.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CWMDateBasedRecordPageRoutingModule
  ],
  declarations: [CWMDateBasedRecordPage]
})
export class CWMDateBasedRecordPageModule {}
