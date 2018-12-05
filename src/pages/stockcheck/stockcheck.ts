import { StockviewPage } from './../stockview/stockview';
import { SQLiteHelperService } from './../../services/sqlitehelper.service';
import { AppService } from './../../services/app.service';
import { Product } from './../../modals/product.modal';
import { DataService } from './../../services/data.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController,PopoverController } from 'ionic-angular';
import { StockcheckPopoverPage } from './stockcheck.popover';

@IonicPage()
@Component({
  selector: 'page-stockcheck',
  templateUrl: 'stockcheck.html',
  providers:[DataService,SQLiteHelperService,AppService]
})
export class StockcheckPage {
  private varStkchk={varSearchTxt:''};prodctLst:Array<Product>;
  private varShowProgress=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private appsvc:AppService,private sqlitehelperSvc:SQLiteHelperService,private datasvc:DataService,private toastCtrl: ToastController,public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad StockcheckPage');
  }

  btn_filterClick(){
    if (this.appsvc.isNull(this.varStkchk.varSearchTxt)){
      this.appsvc.showToastMessage('Please specify the filter text',this.toastCtrl);
      return;
    }
    this.varShowProgress =true;
    this.prodctLst=this.datasvc.getProductListForStkCheck(this.varStkchk.varSearchTxt);
    this.varShowProgress=false;
  }

  itemSelected(parProd:Product){
    if (!this.appsvc.checkNetwork()){
      this.appsvc.showToastMessage('No internet connection.',this.toastCtrl);
      return;
    }
    this.navCtrl.push(StockviewPage,{parProdcode:parProd.code,parProdDesc:parProd.description,parBarcode:'***'})
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(StockcheckPopoverPage,);
    popover.present({
      ev: myEvent
    });
  }
}
