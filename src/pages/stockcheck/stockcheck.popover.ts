import { HomePage } from './../home/home';
import { StockcheckPage } from './stockcheck';
import { Component, ErrorHandler } from '@angular/core';
import { ViewController,NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { StockviewPage } from '../stockview/stockview';

@Component({
    template: 
    '<ion-list><button ion-item (click)="ScanProdBarcode()">Scan</button> <button ion-item (click)="close()">Close</button></ion-list>',
    providers:[]
 })
 export class StockcheckPopoverPage {
    
    constructor(public viewCtrl: ViewController,public navCtrl: NavController,private barcodeScanner: BarcodeScanner) {}
  
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
             //this.navCtrl.setRoot(HomePage);
             this.navCtrl.push(StockviewPage,{parProdcode:'***',parProdDesc:'',parBarcode:varProdBarcode})
            }
            }, (err) => {
                // An error occurred
                alert('error');
            });
      }

  }