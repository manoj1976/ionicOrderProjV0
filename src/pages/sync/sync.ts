import { OrderSyncResult } from './../../modals/ordersyncresult.model';
import { Salesrep } from './../../modals/salesrep.modal';
import { Product } from './../../modals/product.modal';
import { AppService } from './../../services/app.service';
import {SyncPopoverPage} from '../sync/sync.popover'
//import { DataService } from './../../services/data.service';

import { Customer } from './../../modals/customer.modal';

import { SyncMgmtService } from './../../services/syncmgmt.service';
import {StringBuilder, String} from 'typescript-string-operations';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
//import {SQLite} from 'ionic-native'
import { SQLite } from '@ionic-native/sqlite';//this is for SQLLite
import { SQLiteHelperService} from '../../services/sqlitehelper.service';
import { ngContentDef } from '@angular/core/src/view/ng_content';
import { ISubscription } from 'rxjs/Subscription';
import { ToastController } from 'ionic-angular';

import {Http,Headers} from '@angular/http';
import { Services } from '@angular/core/src/view';
import { PopoverController } from 'ionic-angular';
import { DateTime } from 'ionic-angular/components/datetime/datetime';
import { LoginAccount } from '../../modals/loginaccount.modal';
import { ProdCategory } from '../../modals/prodcategory.model';

@IonicPage()
@Component({
  selector: 'page-sync',
  templateUrl: 'sync.html',
  providers:[ SyncMgmtService,AppService,SQLiteHelperService]
})
export class SyncPage {
private  varSyncall:boolean=true;varShowProgress:boolean=false;
private varSyncVar={custSync:this.varSyncall,prodSync:this.varSyncall,prodCategorySync:this.varSyncall,loginaccSync:this.varSyncall,orderSync:this.varSyncall,varDisable:false,salesrepSync:this.varSyncall};
//private db:SQLite;

  constructor(public navCtrl: NavController, public navParams: NavParams,private syncmgmtsvc:SyncMgmtService,private appsvc:AppService,private sqlHlperSvc:SQLiteHelperService,public popoverCtrl: PopoverController,private toastCtrl: ToastController,private event:Events) {
    
  }



//constructor(public navCtrl: NavController, public navParams: NavParams) {
//}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SyncPage');
  }

  ionViewWillLeave(){
    if (!this.appsvc.isNull(this.subsCustSync))
     this.subsCustSync.unsubscribe();

     if (!this.appsvc.isNull(this.subsProdCateSync))
     this.subsProdCateSync.unsubscribe();

     if (!this.appsvc.isNull(this.subsProductSync))
     this.subsProductSync.unsubscribe();

     if (!this.appsvc.isNull(this.subsLoginSync))
     this.subsLoginSync.unsubscribe();

     if (!this.appsvc.isNull(this.subsSalesrepSync))
     this.subsSalesrepSync.unsubscribe();
     
     this.event.unsubscribe('onOrderSynComplete');
     this.event.unsubscribe('onSalerepSynComplete');
     this.event.unsubscribe('onCustSynComplete');
     this.event.unsubscribe('onProdCateSyncComplete');
     this.event.unsubscribe('onProdSyncComplete');
     this.event.unsubscribe('onLoginSyncComplete');
     
  }

  btn_syncallChange(){
    if (this.varSyncall){
      this.varSyncVar.custSync=true;
      this.varSyncVar.prodCategorySync=true;
      this.varSyncVar.prodSync=true;
      this.varSyncVar.loginaccSync=true;
      this.varSyncVar.orderSync=true;
      this.varSyncVar.salesrepSync=true;
    }
    else if (!this.varSyncall){
      this.varSyncVar.custSync=false;
      this.varSyncVar.prodCategorySync=false;
      this.varSyncVar.prodSync=false;
      this.varSyncVar.loginaccSync=false;
      this.varSyncVar.orderSync=false;
      this.varSyncVar.salesrepSync=false;
    }
  }
  
  custmerList:Array<Customer>=[];prodCategoryList:Array<ProdCategory>=[];salesrepList:Array<Salesrep>=[];productList:Array<Product>=[];loginaccList:Array<LoginAccount>=[];ordersyncresultList:Array<OrderSyncResult>=[];
 private syncStatus:Array<IsyncStatusEntity>=[];private subsCustSync:ISubscription; private subsSalesrepSync:ISubscription;subsProdCateSync:ISubscription;subsProductSync:ISubscription;subsLoginSync:ISubscription;

  btnClick_Sync(){
    if (!this.appsvc.checkNetwork()){
      this.appsvc.showToastMessage('No internet connection.',this.toastCtrl); 
      return;
    }

    if (AppService.generalValidation()!=''){
      alert(AppService.generalValidation());return;
    }

    this.varSyncVar.varDisable= this.appsvc.disableAllCtrl();
    //Create syncConfig table --
    this.sqlHlperSvc.createTable(this.sqlHlperSvc._createSyncConfigTbl)
    .then(a=>{})
    .catch(error=>{ 
      this.varSyncVar.varDisable= this.appsvc.enableAllCntrl();
      alert('102:Error while creating the syncConfig table.')
      this.appsvc.errorHandler(error);return;})
    //Create syncConfig table ++
    let str1:string,synctype:string,lastsyncdttime:string;
    this.syncStatus=[];let syncStartDt:Date=new Date();
    if (this.varSyncVar.salesrepSync) {
      this.varSyncVar.varDisable= this.appsvc.disableAllCtrl();
      this.varShowProgress =true;

      str1="Select lastsyncdt from syncConfig where code='SALESREP'";
        this.sqlHlperSvc.executeSQL(str1)
        .catch(err=>{lastsyncdttime='1753-01-01 00:00:00';synctype='fullsync';})
        .then((response:any)=>{
            if (response.rows.length==0) {
                lastsyncdttime='1753-01-01 00:00:00';
                synctype='fullsync';
            }
            else{
                lastsyncdttime=response.rows.item(0).lastsyncdt;
                synctype='incrementalsync';
            }

          this.subsSalesrepSync= this.syncmgmtsvc.syncSalesrep(synctype,lastsyncdttime)
          .subscribe(
            data=>{
              this.salesrepList=data;
              this.updateLocalSalesrepTable(this.salesrepList,syncStartDt);
              },
            Error=>{this.appsvc.errorHandler(Error);this.varShowProgress=false;this.varSyncVar.varDisable= this.appsvc.enableAllCntrl();}
          );
          });
    }

    if (this.varSyncVar.custSync) {
      this.varShowProgress =true;
      this.varSyncVar.varDisable= this.appsvc.disableAllCtrl();

      str1="Select lastsyncdt from syncConfig where code='CUSTOMER'";
        this.sqlHlperSvc.executeSQL(str1)
        .catch(err=>{lastsyncdttime='1753-01-01 00:00:00';synctype='fullsync';})
        .then((response:any)=>{
            if (response.rows.length==0) {
                lastsyncdttime='1753-01-01 00:00:00';
                synctype='fullsync';
            }
            else{
                lastsyncdttime=response.rows.item(0).lastsyncdt;
                synctype='incrementalsync';
            }

            this.subsCustSync= this.syncmgmtsvc.syncCustomer(synctype,lastsyncdttime)
            .subscribe(
              data=>{
                this.custmerList=data;
                this.updateLocalCustTable(this.custmerList,syncStartDt);
                
                },
              Error=>{this.appsvc.errorHandler(Error);this.varShowProgress=false;}
            );
        });
      }

    if (this.varSyncVar.prodCategorySync){
      this.varShowProgress=true;
      this.varSyncVar.varDisable= this.appsvc.disableAllCtrl();

      str1="Select lastsyncdt from syncConfig where code='PRODCATEGORY'";
        this.sqlHlperSvc.executeSQL(str1)
        .catch(err=>{lastsyncdttime='1753-01-01 00:00:00';synctype='fullsync';})
        .then((response:any)=>{
            if (response.rows.length==0) {
                lastsyncdttime='1753-01-01 00:00:00';
                synctype='fullsync';
            }
            else{
                lastsyncdttime=response.rows.item(0).lastsyncdt;
                synctype='incrementalsync';
            }
      
            this.subsProdCateSync=this.syncmgmtsvc.syncProductCategory(synctype,lastsyncdttime)
            .subscribe(
            data=>{
              this.prodCategoryList=data;
              this.updateLocalProdCategoryTable(this.prodCategoryList,syncStartDt);
              
              //this.syncStatus.push({tble:'Product',status:'Success'});
            },
              Error=>{this.appsvc.errorHandler(Error);this.varShowProgress=false;this.varSyncVar.varDisable= this.appsvc.enableAllCntrl();}
            );
          });
    }

    if (this.varSyncVar.prodSync) {
      this.varShowProgress=true;
      this.varSyncVar.varDisable= this.appsvc.disableAllCtrl();

      str1="Select lastsyncdt from syncConfig where code='PRODUCT'";
        this.sqlHlperSvc.executeSQL(str1)
        .catch(err=>{lastsyncdttime='1753-01-01 00:00:00';synctype='fullsync';})
        .then((response:any)=>{
            if (response.rows.length==0) {
                lastsyncdttime='1753-01-01 00:00:00';
                synctype='fullsync';
            }
            else{
                lastsyncdttime=response.rows.item(0).lastsyncdt;
                synctype='incrementalsync';
            }

            this.subsProductSync=this.syncmgmtsvc.syncProduct(synctype,lastsyncdttime)
            .subscribe(
            data=>{
              this.productList=data;
              this.updateLocalProductTable(this.productList,syncStartDt);
        
                //this.syncStatus.push({tble:'Product',status:'Success'});
              },
            Error=>{this.appsvc.errorHandler(Error);this.varShowProgress=false;this.varSyncVar.varDisable= this.appsvc.enableAllCntrl();}
              );
            });
    }

      if (this.varSyncVar.loginaccSync) {
        this.varShowProgress=true;
        this.varSyncVar.varDisable= this.appsvc.disableAllCtrl();

      str1="Select lastsyncdt from syncConfig where code='LOGIN'";
      this.sqlHlperSvc.executeSQL(str1)
      .catch(err=>{lastsyncdttime='1753-01-01 00:00:00';synctype='fullsync';})
      .then((response:any)=>{
          if (response.rows.length==0) {
              lastsyncdttime='1753-01-01 00:00:00';
              synctype='fullsync';
          }
          else{
              lastsyncdttime=response.rows.item(0).lastsyncdt;
              synctype='incrementalsync';
          }
              
            this.subsLoginSync=this.syncmgmtsvc.syncLogin(synctype,lastsyncdttime)
            .subscribe(
            data=>{
              this.loginaccList=data;
              this.updateLocalLoginAccountTable(this.loginaccList,syncStartDt);
              
              //this.syncStatus.push({tble:'Product',status:'Success'});
            },
              Error=>{this.appsvc.errorHandler(Error);this.varShowProgress=false;this.varSyncVar.varDisable= this.appsvc.enableAllCntrl();}
            );
          });
    }

    if (this.varSyncVar.orderSync){
      this.varShowProgress=true;
      this.varSyncVar.varDisable= this.appsvc.disableAllCtrl();

      let str1:string="SELECT name FROM sqlite_master WHERE type='table' AND name='order'";
      this.sqlHlperSvc.executeSQL(str1)
      .then((response:any)=>{
        if (response.rows.length==0) { //if table exist, sync the order.
          this.varSyncVar.varDisable= this.appsvc.enableAllCntrl();
          this.varShowProgress=false;
        }
          if (response.rows.length>0) { //if table exist, sync the order.
              this.event.subscribe('onOrderSynComplete',(data)=>{
                this.varSyncVar.varDisable= this.appsvc.enableAllCntrl();
                this.varShowProgress=false;
              })
              this.syncmgmtsvc.syncOrder('syncpage',this.toastCtrl);
        }
      })
      .catch((error:Error)=>{alert('Error-98');
              this.varSyncVar.varDisable= this.appsvc.enableAllCntrl();
              this.varShowProgress=false;
              this.appsvc.errorHandler(error);
            });
    }
  }

  updateLocalSalesrepTable(parDwnldSalesreplist:Array<Salesrep>,parsyncStartDt:Date){
   
    this.sqlHlperSvc.createTable(this.sqlHlperSvc._createSalerepTbl)
   .then(a=>
    {
      this.event.subscribe('onSalerepSynComplete',(data)=>{
        this.varSyncVar.varDisable=this.appsvc.enableAllCntrl();
        this.varShowProgress=false;
      })
     this.sqlHlperSvc.updateLocalSalesrepTable(parDwnldSalesreplist,this.syncStatus,parsyncStartDt);
    }
    )
   .catch(error=>{this.syncStatus.push({tble:'Salesrep',status:'101:'+error});this.varSyncVar.varDisable=this.appsvc.enableAllCntrl();});
  }

updateLocalCustTable(parDwnldCustlist:Array<Customer>,parsyncStartDt:Date){
   
    this.sqlHlperSvc.createTable(this.sqlHlperSvc._createCustomerTbl)
   .then(a=>
    {

      this.event.subscribe('onCustSynComplete',(data)=>{
        this.varSyncVar.varDisable=this.appsvc.enableAllCntrl();
        this.varShowProgress=false;
      })
     this.sqlHlperSvc.updateLocalCustTable(parDwnldCustlist,this.syncStatus,parsyncStartDt);
    }
    )
   .catch(error=>{this.syncStatus.push({tble:'Customer',status:'101:'+error});this.varSyncVar.varDisable=this.appsvc.enableAllCntrl();});
  }

  updateLocalProdCategoryTable(parDwnldProdCatlist:Array<ProdCategory>,parsyncStartDt:Date){
    this.sqlHlperSvc.createTable(this.sqlHlperSvc._createProdCategoryTbl)
   .then(a=>
    {
      this.event.subscribe('onProdCateSyncComplete',(data)=>{
      this.varSyncVar.varDisable=this.appsvc.enableAllCntrl();
      this.varShowProgress=false;
      })
     this.sqlHlperSvc.updateLocalProdCateTable(parDwnldProdCatlist,this.syncStatus,parsyncStartDt);
     
    }
    )
   .catch(error=>{this.syncStatus.push({tble:'ProductCategory',status:'108:'+error});this.varSyncVar.varDisable=this.appsvc.enableAllCntrl();});
  }

  updateLocalProductTable(parDwnldProdlist:Array<Product>,parsyncStartDt:Date){
     this.sqlHlperSvc.createTable(this.sqlHlperSvc._createProductTbl)
    .then(a=>
     {
        this.event.subscribe('onProdSyncComplete',(data)=>{
          this.varSyncVar.varDisable=this.appsvc.enableAllCntrl();
          this.varShowProgress=false;
        })
        this.sqlHlperSvc.updateLocalProdTable(parDwnldProdlist,this.syncStatus,parsyncStartDt);
     }
     )
    .catch(error=>{this.syncStatus.push({tble:'Product',status:'108:'+error});this.varSyncVar.varDisable=this.appsvc.enableAllCntrl();});
   }

  updateLocalLoginAccountTable(parDwnldLoginlist:Array<LoginAccount>,parsyncStartDt:Date){
    this.sqlHlperSvc.createTable(this.sqlHlperSvc._createLoginTbl)
    .then(a=>
      {
        this.event.subscribe('onLoginSyncComplete',(data)=>{
          this.varSyncVar.varDisable=this.appsvc.enableAllCntrl();
          this.varShowProgress=false;
        })
        this.sqlHlperSvc.updateLocalLoginTable(parDwnldLoginlist,this.syncStatus,parsyncStartDt);
      }
      )
    .catch(error=>{this.syncStatus.push({tble:'Login Account',status:'108:'+error});this.varSyncVar.varDisable=this.appsvc.enableAllCntrl();});
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(SyncPopoverPage,);
    popover.present({
      ev: myEvent
    });
  }

}

 interface IsyncStatusEntity{
    tble:string;
    status:string;
    }
     