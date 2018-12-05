import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Order } from '../../modals/order.modal';


@IonicPage()
@Component({
  selector: 'page-ordviewsign',
  templateUrl: 'ordviewsign.html',
})
export class OrdviewsignPage {
  signature = '';
  private varOrder:Order=new Order();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.varOrder=navParams.get('parSelectOrder');
    this.signature =this.varOrder.sign;
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad OrdviewsignPage');
  }

}
