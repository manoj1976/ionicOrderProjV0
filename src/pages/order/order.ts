import { Salesrep } from './../../modals/salesrep.modal';
import { OrdertabPage } from './../ordertab/ordertab';
import { SQLiteHelperService } from './../../services/sqlitehelper.service';
import { DataService } from './../../services/data.service';
import { AppService } from './../../services/app.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Customer } from '../../modals/customer.modal';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
  providers:[ AppService,DataService,SQLiteHelperService]
})
export class OrderPage {
private items:Array<Customer>;private countylist:Array<Customer>;
private salesreplist:Array<Salesrep>;;
private varSearchTxt:string='';private varCounty:string='';private varSalesrep:string='';
  constructor(public navCtrl: NavController, public navParams: NavParams,private appsvc:AppService,private datasvc:DataService,private sqlitehelperSvc:SQLiteHelperService,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    if (AppService.getUser().GuestUser) {
      alert('The GUEST user is not allowed to create the order.');this.navCtrl.pop(); return;
    }

    //console.log('ionViewDidLoad OrderPage');
    setTimeout(()=> {
      //this.countylist=this.datasvc.getCountyList();
      this.salesreplist=this.datasvc.getSalesrepList();
    });
  }

  btnClick_Test(){
    //this.items= this.datasvc.getCustomerList(this.varCounty);
    //this.navCtrl.push(Order2Page,{selectedCustomer:'test..'});
  }

  onCountyChange(event:Event){
    this.varSearchTxt='';
    this.items= this.datasvc.getCustomerListByCounty(this.varCounty);
  }


  onSalesRepChange(event:Event){
    this.varSearchTxt='';
    this.items= this.datasvc.getCustomerListBySalesrep(this.varSalesrep);
  }

  getItems(event:Event){

  }

  customerSelect(parSelecteitm:Customer){
    if (AppService.getCart().length==0){
      this.navCtrl.push(OrdertabPage,{parSelectedCust:parSelecteitm});
      return;
    }

    if (AppService.getCart().length>0)
      if (AppService.getCustomerFromtheCart().code!=parSelecteitm.code){
        this.appsvc.emptyCart();
        this.navCtrl.push(OrdertabPage,{parSelectedCust:parSelecteitm});
      }
      else //if the selected cust. and cust. in the cart is same
      {
        this.presentConfirm(parSelecteitm)
      }

  }

  private presentConfirm(parSelecteitm:Customer) {
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to empty the cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'No',
          handler: () => {
            this.navCtrl.push(OrdertabPage,{parSelectedCust:parSelecteitm});
          }
        },
          {
            text: 'Yes',
            handler: () => {
              this.appsvc.emptyCart();
              this.navCtrl.push(OrdertabPage,{parSelectedCust:parSelecteitm});
            }
        }
      ]
    });
    alert.present();
  }
}
