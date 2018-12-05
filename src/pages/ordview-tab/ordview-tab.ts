import { OrdviewcartPage } from './../ordviewcart/ordviewcart';
import { OrdviewsignPage } from './../ordviewsign/ordviewsign';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Order } from '../../modals/order.modal';
import { OrdviewhdrPage } from '../ordviewhdr/ordviewhdr';

/**
 * Generated class for the OrdviewTabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ordview-tab',
  templateUrl: 'ordview-tab.html',
})
export class OrdviewTabPage {
  selectedOrder:Order=new Order();
  tab1Order=OrdviewhdrPage;
  tab3Cart=OrdviewcartPage;
  tab4Sign=OrdviewsignPage;
  tab1Params:any;tab3Params:any;tab4Params:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedOrder=navParams.get('parSelectedOrder');
    this.tab1Params = { parSelectOrder: this.selectedOrder};
    this.tab3Params = { parSelectOrder: this.selectedOrder};
    this.tab4Params = { parSelectOrder: this.selectedOrder};
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad OrdviewTabPage');
  }

}
