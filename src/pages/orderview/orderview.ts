import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../services/app.service';
import { DataService } from '../../services/data.service';
import { SQLiteHelperService } from '../../services/sqlitehelper.service';
import { Order } from '../../modals/order.modal';
import { OrdviewTabPage } from '../ordview-tab/ordview-tab';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-orderview',
  templateUrl: 'orderview.html',
  providers:[AppService, DataService,SQLiteHelperService]
})
export class OrderviewPage {
  private varordertype:string=''
  orderList: Array<Order>; varOrderview={varSearchTxt:''}
  constructor(public navCtrl: NavController, public navParams: NavParams,private datasvc:DataService,private sqlitehelperSvc:SQLiteHelperService,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad OrderproductcatePage');
    setTimeout(()=> {
      this.orderList=this.datasvc.getOrderListFromLocalDB('nonsyncorder');
    }, 500);
   }

   onOrdertypeChange(event:Event){
    this.varOrderview.varSearchTxt='';
    this.orderList= this.datasvc.getOrderListFromLocalDB(this.varordertype);
  }

  orderview_click(parorder:Order){
   this.navCtrl.push(OrdviewTabPage,{parSelectedOrder:parorder});
  }

  orderdelete_click(parorder:Order){
    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Do you want to delete the order?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
        //    console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            //console.log('Buy clicked');
            this.datasvc.deleteOrder(parorder.orderno);
            this.orderList = this.orderList.filter(obj => obj !== parorder);
          }
        }
      ]
    });
    alert.present();
  }
}
