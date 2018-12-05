import { Component, ErrorHandler } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { SQLiteHelperService} from '../../services/sqlitehelper.service';
import { AppService } from './../../services/app.service';

@Component({
    template: 
'<ion-list><!--<ion-list-header>Database</ion-list-header>--><button ion-item (click)="DropCustTbl()">Drop Cust. Tble</button><button ion-item (click)="DropSalesrepTbl()">Drop SalesRep.</button><button ion-item (click)="DropProdCateTbl()">Drop Prod.Cate. Tble</button><button ion-item (click)="DropProductTbl()">Drop Prod. Tble</button> <button ion-item (click)="DropOrderTbl()">Drop Order Tble</button><button ion-item (click)="DropLoginTbl()">Drop Login Tble</button><button ion-item (click)="close()">Close</button></ion-list>',
  providers:[ AppService,SQLiteHelperService]
 })
 export class SyncPopoverPage {
    constructor(public viewCtrl: ViewController,private sqlHlperSvc:SQLiteHelperService,private appsvc:AppService) {}
  
    close() {
      this.viewCtrl.dismiss();
    }

    DropCustTbl(){
      this.sqlHlperSvc.executeSQL(this.sqlHlperSvc._dropCustomerTbl)
      .then(e=>{this.resetSyncConfig('CUSTOMER');alert('Customer table is deleted.')})
      .catch((error:any)=>{alert('105:Error while dropping the table.');this.appsvc.errorHandler(error);}
    );
  }
  
  DropProdCateTbl(){
      this.sqlHlperSvc.executeSQL(this.sqlHlperSvc._dropProductCateTbl)
      .then(e=>{this.resetSyncConfig('PRODCATEGORY');alert('Product category table is deleted.');})
      .catch((error:any)=>{alert('106:Error while dropping the table.');this.appsvc.errorHandler(error);}
        );
    }

    DropProductTbl(){
      this.sqlHlperSvc.executeSQL(this.sqlHlperSvc._dropProductTbl)
      .then(e=>{this.resetSyncConfig('PRODUCT');alert('Product table is deleted.');})
      .catch((error:any)=>{alert('106:Error while dropping the table.');this.appsvc.errorHandler(error);}
        );
    }
    
    DropOrderTbl(){
      this.sqlHlperSvc.executeSQL(this.sqlHlperSvc._dropOrderTbl)
      .then(e=>{alert('Order table is deleted.');})
      .catch((error:any)=>{alert('118:Error while dropping the table.');this.appsvc.errorHandler(error);}
        );
    }

    DropLoginTbl(){
      this.sqlHlperSvc.executeSQL(this.sqlHlperSvc._dropLoginTbl)
      .then(e=>{this.resetSyncConfig('LOGIN');alert('Login table is deleted.');})
      .catch((error:any)=>{alert('117:Error while dropping the table.');this.appsvc.errorHandler(error);}
        );
    }
    
    DropSalesrepTbl(){
      this.sqlHlperSvc.executeSQL(this.sqlHlperSvc._dropSalesrepTbl)
      .then(e=>{this.resetSyncConfig('SALESREP');alert('Salesrep table is deleted.');})
      .catch((error:any)=>{alert('117:Error while dropping the table.');this.appsvc.errorHandler(error);}
        );
    }

    resetSyncConfig(parSyncRecID:string){
      let str1:string;
      str1="Delete from syncConfig where code='"+parSyncRecID+"'";
      this.sqlHlperSvc.executeSQL(str1)
      .then(data=>{})
      .catch((error:any)=>{alert('107:Error while reseting the syncConfig table.');this.appsvc.errorHandler(error);}
      );

    }

  }