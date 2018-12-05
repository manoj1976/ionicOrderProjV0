import { Product } from './../../modals/product.modal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { AppService } from '../../services/app.service';
import { ToastController } from 'ionic-angular';
import { SQLiteHelperService } from '../../services/sqlitehelper.service';
import { ISubscription } from 'rxjs/Subscription';
import { Stock } from '../../modals/stock.modal';

@IonicPage()
@Component({
  selector: 'page-stockview',
  templateUrl: 'stockview.html',
  providers:[DataService,SQLiteHelperService,AppService]
})
export class StockviewPage {
  private varShowProgress=false;
  private varStkcheck:Product=new Product();
  private subsStockCheck:ISubscription;varTotalStock:number=0;
  private stockList:Array<Stock>=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,private appsvc:AppService,private sqlitehelperSvc:SQLiteHelperService,private datasvc:DataService,private toastCtrl: ToastController) {
    this.varStkcheck.code=navParams.get('parProdcode');
    this.varStkcheck.barcode=navParams.get('parBarcode');
    this.varStkcheck.description=navParams.get('parProdDesc');
    
  }

  ionViewDidLoad() {
    
    this.varShowProgress=true;

    setTimeout(()=> {
      this.subsStockCheck= this.datasvc.getStock(this.varStkcheck.code,this.varStkcheck.barcode)
      .subscribe(
        data=>{
          this.stockList=data;
          this.varShowProgress=false;
            for(let i=0;i<this.stockList.length;i++){
              this.varTotalStock +=this.stockList[i].stock;
             this.varStkcheck.code =this.stockList[i].itemcode;
             this.varStkcheck.description=this.stockList[i].itemDesc;
            }
          },
        Error=>{
          this.varShowProgress=false;
          this.appsvc.errorHandler(Error);}
      );


    });

    
  }

  ionViewWillLeave(){
    if (!this.appsvc.isNull(this.subsStockCheck))
     this.subsStockCheck.unsubscribe();
  }

}
