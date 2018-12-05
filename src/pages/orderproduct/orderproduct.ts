import { Order } from './../../modals/order.modal';
import { OrderprodviewPage } from './../orderprodview/orderprodview';
import { Product } from './../../modals/product.modal';
import { AppService } from './../../services/app.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLiteHelperService } from './../../services/sqlitehelper.service';
import { DataService } from './../../services/data.service';
import { ProdCategory } from '../../modals/prodcategory.model';
import { ToastController } from 'ionic-angular';
import { CurrencyPipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-orderproduct',
  templateUrl: 'orderproduct.html',
  providers:[AppService,DataService,SQLiteHelperService]
})
export class OrderproductPage {
  private varProduct={varSearchTxt:''}

  private productCategory:ProdCategory;private productList:Array<Product>=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,private datasvc:DataService,private appsvc:AppService,private sqlitehelperSvc:SQLiteHelperService,private toastCtrl: ToastController,private currencyPipe: CurrencyPipe) {
    this.productCategory=navParams.get('parSelectedProdCategory');
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad OrderproductPage');
    setTimeout(()=> {
      this.productList=this.datasvc.getProductList(this.productCategory.code);
    }, 500);
  }

  viewProdDetail(parProduct:Product){
    this.navCtrl.push(OrderprodviewPage,{parSelectedProd:parProduct});
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
