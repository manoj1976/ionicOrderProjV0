import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BalanceviewPage } from './balanceview';

@NgModule({
  declarations: [
    BalanceviewPage,
  ],
  imports: [
    IonicPageModule.forChild(BalanceviewPage),
  ],
})
export class BalanceviewPageModule {}
