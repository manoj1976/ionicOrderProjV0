import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Order1Page } from './order1';

@NgModule({
  declarations: [
    Order1Page,
  ],
  imports: [
    IonicPageModule.forChild(Order1Page),
  ],
})
export class OrderPageModule {}
