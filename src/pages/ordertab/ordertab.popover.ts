import { Component, ErrorHandler } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { AppService } from './../../services/app.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SQLiteHelperService } from '../../services/sqlitehelper.service';
import { ToastController } from 'ionic-angular';

@Component({
   template: 
'<ion-list><button ion-item (click)="ScanProdBarcode()">Scan</button> <button ion-item (click)="close()">Close</button></ion-list>',
  providers:[ AppService,SQLiteHelperService]
 })
 export class OrdertabPopoverPage {
    constructor(public viewCtrl: ViewController,private appsvc:AppService,private sqlitehelperSvc:SQLiteHelperService,private barcodeScanner: BarcodeScanner,private toastCtrl: ToastController) {

    }
      close() {
        this.viewCtrl.dismiss();
      }

      ScanProdBarcode(){
        this.close();
        this.barcodeScanner.scan().then((barcodeData) => {
            // Success! Barcode data is here
            //alert('success');
            let varProdBarcode:string;
            if (barcodeData.cancelled){
              //alert('cancelled');
            }
            else{
             // alert(barcodeData.text);
             varProdBarcode=barcodeData.text;

             if (this.sqlitehelperSvc.findProductByBarcode(varProdBarcode))
              this.appsvc.showToastMessage('The product is added to the cart.',this.toastCtrl);
             else
              this.appsvc.showToastMessage('Barcode '+varProdBarcode+' not found.',this.toastCtrl);
              this.ScanProdBarcode();
            }
            }, (err) => {
                // An error occurred
                alert('error');
            });
      }
 }