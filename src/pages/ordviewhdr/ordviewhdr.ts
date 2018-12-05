import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Order } from '../../modals/order.modal';


@IonicPage()
@Component({
  selector: 'page-ordviewhdr',
  templateUrl: 'ordviewhdr.html',
})
export class OrdviewhdrPage {
  private varOrder:Order=new Order();
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.varOrder=navParams.get('parSelectOrder');
  }

  ionViewDidLoad() {
    
  //  console.log('ionViewDidLoad OrdviewhdrPage');
  }

}
