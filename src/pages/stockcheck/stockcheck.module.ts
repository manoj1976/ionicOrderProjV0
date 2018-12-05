import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockcheckPage } from './stockcheck';

@NgModule({
  declarations: [
    StockcheckPage,
  ],
  imports: [
    IonicPageModule.forChild(StockcheckPage),
  ],
})
export class StockcheckPageModule {}
