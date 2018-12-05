import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../services/app.service';
import { Order } from '../../modals/order.modal';
import { ToastController } from 'ionic-angular';
import { CurrencyPipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-ordercartview',
  templateUrl: 'ordercartview.html',
  providers:[AppService]
})
export class OrdercartviewPage {
  private orderCart:Array<Order>=[];totalAmount:number=0;totalQty:number=0;noOfProd:number=0;

  constructor(public navCtrl: NavController, public navParams: NavParams,private appsvc:AppService,private toastCtrl: ToastController,private currencyPipe: CurrencyPipe) {
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad OrdercartviewPage');
   this.orderCart=AppService.getCart();
  }

  ionViewWillEnter(){
    this.updateTotal();
  }
  
  updateCartItem(parCartItem:Order){
    if (parCartItem.orderqty<1){
      alert('Invalid order qty.');return;}
    AppService.updateCart(parCartItem);
    this.updateTotal();
    this.appsvc.showToastMessage('Updated.',this.toastCtrl);
  }

  removeCartItem(parCartItem:Order){
    AppService.removeProdFromCart(parCartItem);
    this.updateTotal();
    this.appsvc.showToastMessage('The line is removed from the cart.',this.toastCtrl);
  }

  onQtyChange(parItem:Order){
    parItem.amount=this.appsvc.Round(parItem.orderqty*parItem.unitprice,2);
    this.updateTotal();
  }

  updateTotal(){
    this.totalAmount=this.appsvc.calcCartTotalAmt();
    this.totalQty=this.appsvc.calcCartTotalQty();
    this.noOfProd=this.appsvc.calcCartNoOfProduct();
  }
  

}
