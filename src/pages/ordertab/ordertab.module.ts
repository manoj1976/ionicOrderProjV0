import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdertabPage } from './ordertab';

@NgModule({
  declarations: [
    OrdertabPage,
  ],
  imports: [
    IonicPageModule.forChild(OrdertabPage),
  ],
})
export class OrdertabPageModule {}
