import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdviewTabPage } from './ordview-tab';

@NgModule({
  declarations: [
    OrdviewTabPage,
  ],
  imports: [
    IonicPageModule.forChild(OrdviewTabPage),
  ],
})
export class OrdviewTabPageModule {}
