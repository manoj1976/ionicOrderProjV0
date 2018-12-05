import { AppService } from './../../services/app.service';
import { SQLiteHelperService } from './../../services/sqlitehelper.service';
import { DataService } from './../../services/data.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdCategory } from '../../modals/prodcategory.model';
import { OrderproductPage } from '../orderproduct/orderproduct';

@IonicPage()
@Component({
  selector: 'page-orderproductcate',
  templateUrl: 'orderproductcate.html',
  providers:[AppService, DataService,SQLiteHelperService]
})
export class OrderproductcatePage {
  private prodCategoryList:Array<ProdCategory>;
  constructor(public navCtrl: NavController, public navParams: NavParams,private datasvc:DataService,private sqlitehelperSvc:SQLiteHelperService) {
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad OrderproductcatePage');
   setTimeout(()=> {
    this.prodCategoryList=this.datasvc.getProdCategoryList();
  }, 500);

  }

  category_click(parCategory:ProdCategory){  
    this.navCtrl.push(OrderproductPage,{parSelectedProdCategory:parCategory})
  }

 

}
