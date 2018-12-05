import { Product } from './../../modals/product.modal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../services/app.service';
import { ToastController } from 'ionic-angular';
import { CurrencyPipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-orderprodview',
  templateUrl: 'orderprodview.html',
  providers:[AppService]
})
export class OrderprodviewPage {
  private selectedProd:Product;

  constructor(public navCtrl: NavController, public navParams: NavParams,private appsvc:AppService,private toastCtrl: ToastController,private currencyPipe: CurrencyPipe) {
    this.selectedProd=navParams.get('parSelectedProd');
    //this.selectedProd.prodimagename= AppService.getProdimagename(this.selectedProd.prodimagename);
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad OrderprodviewPage');
  }

  addtoOrder(parProduct:Product){
    if (parProduct.orderqty<1){
      alert('Invalid order qty.');return;}

    AppService.addProductToOrder(parProduct);
    this.appsvc.showToastMessage('The product is added to the cart.',this.toastCtrl);
  }

  onQtyChange(parItem:Product){
    parItem.amount=this.appsvc.Round(parItem.orderqty*parItem.price,2);
  }

}
