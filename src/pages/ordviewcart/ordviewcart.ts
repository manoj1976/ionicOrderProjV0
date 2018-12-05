import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AppService } from '../../services/app.service';
import { DataService } from '../../services/data.service';
import { SQLiteHelperService } from '../../services/sqlitehelper.service';
import { Order } from '../../modals/order.modal';
import { CurrencyPipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-ordviewcart',
  templateUrl: 'ordviewcart.html',
  providers:[AppService, DataService,SQLiteHelperService]
})
export class OrdviewcartPage {
  private varOrder:Order=new Order();
  orderCart:Array<Order>;totalAmount:number=0;totalQty:number=0;noOfProd:number=0;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private appsvc:AppService,private datasvc:DataService,private sqlitehelperSvc:SQLiteHelperService,private currencyPipe: CurrencyPipe,private event:Events) {
    this.varOrder=navParams.get('parSelectOrder');
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad OrdviewcartPage');
    setTimeout(()=> {
      this.event.subscribe('onReadOrderLineComplete',(data)=>{
        this.updateTotal();
      })

      this.orderCart=this.datasvc.getItemsintheOrder(this.varOrder.orderno);

    }, 500);
  }

  ionViewWillLeave(){
    this.event.unsubscribe('onReadOrderLineComplete');
  }

  updateTotal(){
    for(let i=0;i<this.orderCart.length;i++){
      this.totalAmount+=this.orderCart[i].amount;
      this.totalQty+=this.orderCart[i].orderqty;
      this.noOfProd=this.orderCart.length;
    }
  }

}
