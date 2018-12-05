import { OrdviewcartPage } from './../pages/ordviewcart/ordviewcart';
import { OrdviewsignPage } from './../pages/ordviewsign/ordviewsign';
import { OrdviewhdrPage } from './../pages/ordviewhdr/ordviewhdr';
import { OrderviewFilterPipe } from './../filters/orderview.filter';
import { OrderviewPage } from './../pages/orderview/orderview';
import { BalanceviewPage } from './../pages/balanceview/balanceview';
import { StockviewPage } from './../pages/stockview/stockview';
import { StockcheckPage } from './../pages/stockcheck/stockcheck';
import { RegisterPopoverPage } from './../pages/register/register.popover';
import { RegisterPage } from './../pages/register/register';
import { SyncPageModule } from './../pages/sync/sync.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SQLite } from '@ionic-native/sqlite';//this is for SQLLite
import { SignaturePadModule } from 'angular2-signaturepad';
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CurrencyPipe } from '@angular/common';
import { Device } from '@ionic-native/device';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {OrderPage} from '../pages/order/order';
import {SyncPage} from '../pages/sync/sync';
import {SyncPopoverPage} from '../pages/sync/sync.popover';
import {SettingsPopoverPage} from '../pages/settings/settings.popover';

import {CustomerFilterPipe} from '../filters/customer.filter'
import {ProductFilterPipe} from '../filters/product.filter'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {HttpModule} from '@angular/http';
import {Network} from '@ionic-native/network';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';
import { OrderhdrPage } from '../pages/orderhdr/orderhdr';
import { OrderproductPage } from '../pages/orderproduct/orderproduct';
import {OrderprodviewPage} from '../pages/orderprodview/orderprodview';
import { OrderproductcatePage } from './../pages/orderproductcate/orderproductcate';
import { OrdertabPage } from './../pages/ordertab/ordertab';
import { OrdercartviewPage } from '../pages/ordercartview/ordercartview';
import { OrdersigPage } from '../pages/ordersig/ordersig';
import { OrdertabPopoverPage } from '../pages/ordertab/ordertab.popover';
import { LoginPopoverPage } from '../pages/login/login.popover';
import { CustbalcheckPage } from '../pages/custbalcheck/custbalcheck';
import { StockcheckPopoverPage } from '../pages/stockcheck/stockcheck.popover';
import { OrdviewTabPage } from '../pages/ordview-tab/ordview-tab';

class CameraMock extends Camera {
  getPicture(options) {
    return new Promise((resolve, reject) => {
      resolve("BASE_64_ENCODED_DATA_GOES_HERE");
    })
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    OrderPage,
    OrdertabPage,
    OrderhdrPage,
    OrderproductcatePage,
    OrderproductPage,
    OrderprodviewPage,
    OrdercartviewPage,
    OrdersigPage,
    OrdertabPopoverPage,
    SyncPage,
    SyncPopoverPage,
    SettingsPage,
    SettingsPopoverPage,
    LoginPage,
    LoginPopoverPage,
    RegisterPage,
    RegisterPopoverPage,
    StockcheckPage,
    StockcheckPopoverPage,
    StockviewPage,
    CustbalcheckPage,
    BalanceviewPage,
    OrderviewPage,
    OrdviewTabPage,
    OrdviewhdrPage,
    OrdviewcartPage,
    OrdviewsignPage,
    CustomerFilterPipe,
    ProductFilterPipe,
    OrderviewFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SignaturePadModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    OrderPage,
    OrdertabPage,
    OrderhdrPage,
    OrderproductcatePage,
    OrderproductPage,
    OrderprodviewPage,
    OrdercartviewPage,
    OrdersigPage,
    OrdertabPopoverPage,
    SyncPage,
    SyncPopoverPage,
    SettingsPage,
    SettingsPopoverPage,
    RegisterPage,
    RegisterPopoverPage,
    StockcheckPage,
    StockcheckPopoverPage,
    StockviewPage,
    CustbalcheckPage,
    BalanceviewPage,
    OrderviewPage,
    OrdviewTabPage,
    OrdviewhdrPage,
    OrdviewcartPage,
    OrdviewsignPage,
    LoginPage,
    LoginPopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    BarcodeScanner,
    Network,
    Device,
    CurrencyPipe,
    { provide: Camera, useClass: CameraMock },
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
