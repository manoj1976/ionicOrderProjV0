import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderhdrPage } from './orderhdr';

@NgModule({
  declarations: [
    OrderhdrPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderhdrPage),
  ],
})
export class OrderhdrPageModule {}
