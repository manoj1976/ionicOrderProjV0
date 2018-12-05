import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from './../../services/app.service';
import { SQLite } from '@ionic-native/sqlite';//this is for SQLLite
import { SQLiteHelperService} from '../../services/sqlitehelper.service';
import { ISettings} from '../../interfaces/settings.interface';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { SettingsPopoverPage} from './settings.popover'
import { PopoverController } from 'ionic-angular';
import { Alert } from 'ionic-angular/components/alert/alert';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers:[AppService,SQLiteHelperService]
})
export class SettingsPage {
  private varSetting={offline:false,varDisable:false,WebAPIBaseURL:''};
  constructor(public navCtrl: NavController, public navParams: NavParams,private appsvc:AppService,private sqlHlperSvc:SQLiteHelperService,public popoverCtrl: PopoverController) {
  }
ion

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SettingsPage');
    //this.varSetting.WebAPIBaseURL=this.appsvc.getSettings('webapibaseurl');
    //this.varSetting.offline=this.appsvc.isOffline();
    setTimeout(()=> {
      //this.varSetting.WebAPIBaseURL=AppService.getSettings('webapibaseurl');
      this.varSetting.WebAPIBaseURL=AppService.getSettings().WebapiBaseURL;
      this.varSetting.offline=AppService.isOffline();
    }, 1000);
    /*
    this.varSetting.varDisable=this.appsvc.disableAllCtrl();
    this.sqlHlperSvc.createTable(this.sqlHlperSvc._createSettingTbl)
    .then(Data=>{this.varSetting.varDisable=this.appsvc.enableAllCntrl();})
    .catch((error:Error)=>{
      alert('109:Error while creating the Settings table.');
       this.appsvc.errorHandler(error);this.varSetting.varDisable=this.appsvc.enableAllCntrl();});
       */
  }


ionViewWillLeave() {
 // console.log("Looks like I'm about to leave :(");
 let varlocSettings:ISettings={Offline:0,WebapiBaseURL:'',Username:'',Useremail:'',Regemail:'',AzureStorageContainer:''};
 this.varSetting.varDisable=this.appsvc.disableAllCtrl();
 this.sqlHlperSvc.createTable(this.sqlHlperSvc._createSettingTbl)
 .then((data:any)=>{
    varlocSettings.Offline=(this.varSetting.offline)?1:0;
    varlocSettings.WebapiBaseURL=this.varSetting.WebAPIBaseURL;
   this.sqlHlperSvc.saveSettings(varlocSettings);
   //this.appsvc.setSettings(varlocSettings);
   AppService.setSettings(varlocSettings);
   this.varSetting.varDisable=this.appsvc.enableAllCntrl();
})
 .catch((error:Error)=>{

   alert('109:Error while creating the Settings table.');
    this.appsvc.errorHandler(error);this.varSetting.varDisable=this.appsvc.enableAllCntrl();});
}

presentPopover(myEvent) {
  let popover = this.popoverCtrl.create(SettingsPopoverPage,);
  popover.present({
    ev: myEvent
  });
}
}
