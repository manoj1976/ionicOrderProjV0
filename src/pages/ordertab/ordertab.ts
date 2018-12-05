import { OrdertabPopoverPage } from './ordertab.popover';
import { OrdersigPage } from './../ordersig/ordersig';
import { OrderproductcatePage } from './../orderproductcate/orderproductcate';
import { Customer } from './../../modals/customer.modal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderhdrPage } from '../orderhdr/orderhdr';
import { OrdercartviewPage } from '../ordercartview/ordercartview';
import { PopoverController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-ordertab',
  templateUrl: 'ordertab.html',
})
export class OrdertabPage {
  private selectedCustomer:Customer;
  tab1Order=OrderhdrPage;
  tab2ProductCate=OrderproductcatePage;
  tab3Cart=OrdercartviewPage;
  tab4Sign=OrdersigPage;
  tab1Params:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public popoverCtrl: PopoverController) {
    this.selectedCustomer=navParams.get('parSelectedCust');
    this.tab1Params = { parSelectCust: this.selectedCustomer};
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad OrdertabPage');
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(OrdertabPopoverPage,);
    popover.present({
      ev: myEvent
    });
  }

}
