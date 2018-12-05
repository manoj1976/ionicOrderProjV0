import { SyncMgmtService } from './../../services/syncmgmt.service';
import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { AppService } from '../../services/app.service';
import { SQLiteHelperService } from '../../services/sqlitehelper.service';
import { Device } from '@ionic-native/device';
import { App } from 'ionic-angular/components/app/app';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-ordersig',
  templateUrl: 'ordersig.html',
  providers:[AppService,SyncMgmtService,SQLiteHelperService]
})
export class OrdersigPage {
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  private signaturePadOptions: Object = { // Check out https://github.com/szimek/signature_pad
    'minWidth': 2,
    'canvasWidth': 1000,
    'canvasHeight': 200,
    //'backgroundColor': '#f6fbff',
    'backgroundColor': '#ffb6c1',
    'penColor': '#666a73'
  };
  private varDisable:boolean=false;varDisableSubmit:boolean=true;
  constructor(public navCtrl: NavController, public navParams: NavParams,private appsvc:AppService,private sqlHlperSvc:SQLiteHelperService,private device:Device,private toastCtrl: ToastController,private app:App,private syncmgmtsvc:SyncMgmtService,private event:Events ) {

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad OrdersigPage');
    
  }

  ionViewWillEnter(){
    this.varDisableSubmit=(this.appsvc.validateOrder()!='')?true:false;
    //if (!this.varDisableSubmit) this.varDisableSubmit=this.signaturePad.isEmpty();
  }

  btn_clearPad() {
    this.signaturePad.clear();
  }

  drawComplete() {
    //this.isDrawing = false;
    //if (!this.varDisableSubmit) this.varDisableSubmit=this.signaturePad.isEmpty();
  }
 
  drawStart() {
    //this.isDrawing = true;
    //if (!this.varDisableSubmit) this.varDisableSubmit=this.signaturePad.isEmpty();
  }

  btn_saveOrder(){
    let varValiMsg:string='',varOrderno:string;
    this.varDisable =this.appsvc.disableAllCtrl();
    varValiMsg= this.appsvc.validateOrder();
    if (varValiMsg!=''){
      alert(varValiMsg);this.varDisable =this.appsvc.enableAllCntrl();return;}

    if (this.signaturePad.isEmpty()){
      varValiMsg='Please draw your signature.'
      alert(varValiMsg);this.varDisable =this.appsvc.enableAllCntrl();return;}
      
      varOrderno= this.appsvc.assignOrderNo(this.appsvc.getDeviceID(this.device),this.signaturePad.toDataURL());
      this.sqlHlperSvc.saveOrderToLocalDB(this.app,varOrderno,this.toastCtrl);
      setTimeout(()=> {
        this.syncmgmtsvc.syncOrder('order',this.toastCtrl);
      }, 3000);
  }
}
