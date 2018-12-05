import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockviewPage } from './stockview';

@NgModule({
  declarations: [
    StockviewPage,
  ],
  imports: [
    IonicPageModule.forChild(StockviewPage),
  ],
})
export class StockviewPageModule {}
