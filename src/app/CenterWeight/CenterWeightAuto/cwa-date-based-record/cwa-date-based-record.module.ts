import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CWADateBasedRecordPageRoutingModule } from './cwa-date-based-record-routing.module';

import { CWADateBasedRecordPage } from './cwa-date-based-record.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CWADateBasedRecordPageRoutingModule
  ],
  declarations: [CWADateBasedRecordPage]
})
export class CWADateBasedRecordPageModule {}
