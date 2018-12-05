import { Customer } from './../../modals/customer.modal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ISubscription } from 'rxjs/Subscription';
import { DataService } from '../../services/data.service';
import { SQLiteHelperService } from '../../services/sqlitehelper.service';
import { AppService } from '../../services/app.service';
import { CustomerBalance } from '../../modals/customerbalance.modal';

@IonicPage()
@Component({
  selector: 'page-balanceview',
  templateUrl: 'balanceview.html',
  providers:[DataService,SQLiteHelperService,AppService]
})
export class BalanceviewPage {
  private varShowProgress=false;
  private varBalanceCheck:Customer=new Customer();
  private subsBalanceCheck:ISubscription;
  private customerBalanceList:Array<CustomerBalance>=[];varTotalBalanceLCY:number=0;

  constructor(public navCtrl: NavController, public navParams: NavParams,private appsvc:AppService,private sqlitehelperSvc:SQLiteHelperService,private datasvc:DataService) {
    this.varBalanceCheck.code=navParams.get('parCustcode');
    this.varBalanceCheck.name=navParams.get('parCustname');
    
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad BalanceviewPage');
    this.varShowProgress=true;

    setTimeout(()=> {
      this.subsBalanceCheck= this.datasvc.getCustomerBalance(this.varBalanceCheck.code)
      .subscribe(
        data=>{
          this.customerBalanceList=data;
          this.varShowProgress=false;
            for(let i=0;i<this.customerBalanceList.length;i++)
              this.varTotalBalanceLCY +=this.customerBalanceList[i].balanceLCY;
          },
        Error=>{
          this.varShowProgress=false;
          this.appsvc.errorHandler(Error);}
      );
    });
  }

  ionViewWillLeave(){
    if (!this.appsvc.isNull(this.subsBalanceCheck))
     this.subsBalanceCheck.unsubscribe();
  }

}
