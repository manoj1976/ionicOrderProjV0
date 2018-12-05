import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderviewPage } from './orderview';

@NgModule({
  declarations: [
    OrderviewPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderviewPage),
  ],
})
export class OrderviewPageModule {}
