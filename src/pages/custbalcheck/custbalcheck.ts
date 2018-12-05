import { Customer } from './../../modals/customer.modal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { SQLiteHelperService } from '../../services/sqlitehelper.service';
import { AppService } from '../../services/app.service';
import { ToastController } from 'ionic-angular';
import { BalanceviewPage } from '../balanceview/balanceview';


@IonicPage()
@Component({
  selector: 'page-custbalcheck',
  templateUrl: 'custbalcheck.html',
  providers:[DataService,SQLiteHelperService,AppService]
})
export class CustbalcheckPage {
  private varCustbal={varSearchTxt:''};custLst:Array<Customer>;
  private varShowProgress=false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private appsvc:AppService,private sqlitehelperSvc:SQLiteHelperService,private datasvc:DataService,private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad CustbalcheckPage');
  }

  btn_filterClick(){
    if (this.appsvc.isNull(this.varCustbal.varSearchTxt)){
      this.appsvc.showToastMessage('Please specify the filter text',this.toastCtrl);
      return;
    }
    this.varShowProgress =true;
    this.custLst=this.datasvc.getCustomerListForBalanceCheck(this.varCustbal.varSearchTxt);
    this.varShowProgress=false;
    this.varCustbal.varSearchTxt ='';
  }

  customerSelect(parCust:Customer){
    if (!this.appsvc.checkNetwork()){
      this.appsvc.showToastMessage('No internet connection.',this.toastCtrl);
      return;
    }
    this.navCtrl.push(BalanceviewPage,{parCustcode:parCust.code,parCustname:parCust.name})
  }
}
