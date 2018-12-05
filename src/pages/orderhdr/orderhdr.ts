import { AppService } from './../../services/app.service';
import { Order } from './../../modals/order.modal';
import { Customer } from './../../modals/customer.modal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-orderhdr',
  templateUrl: 'orderhdr.html',
})
export class OrderhdrPage {
  private varOrder:Order=new Order();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.varOrder.customer=navParams.get('parSelectCust');
   this.varOrder.ordercontact='';
   this.varOrder.orderref='';
   AppService.addHeaderDetToOrder(this.varOrder);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad OrderhdrPage');
  }

  onValueHdrChange(){
    AppService.addHeaderDetToOrder(this.varOrder);
  }

}
