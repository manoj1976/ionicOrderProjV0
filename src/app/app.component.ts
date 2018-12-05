import { OrderviewPage } from './../pages/orderview/orderview';
import { CustbalcheckPage } from './../pages/custbalcheck/custbalcheck';
import { StockcheckPage } from './../pages/stockcheck/stockcheck';
import { LoginPage } from './../pages/login/login';
import { SettingsPage } from './../pages/settings/settings';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { OrderPage } from './../pages/order/order';

import {SyncPage} from '../pages/sync/sync';
import { RegisterPage } from '../pages/register/register';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage: any = HomePage;
  rootPage: any =  LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
   //   { title: 'List', component: ListPage },
      {title: 'Order', component: OrderPage },
      {title:'Order View',component:OrderviewPage},
      {title: 'Balance Check', component: CustbalcheckPage },
      {title: 'Stock Check', component: StockcheckPage },
      { title: 'Sync', component: SyncPage },
   //   { title: 'Settings', component: SettingsPage },
      { title: 'Register', component: RegisterPage },
      { title: 'Sign Off', component: LoginPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page,tag:string) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.component);
    if (tag.toLowerCase()=='order')
      this.nav.push(OrderPage);
    else if (tag.toLowerCase()=='order view')
      this.nav.push(OrderviewPage);
    else if (tag.toLowerCase()=='balance check')
      this.nav.push(CustbalcheckPage);
    else if (tag.toLowerCase()=='stock check')
      this.nav.push(StockcheckPage);
    else if (tag.toLowerCase()=='sync')
      this.nav.push(SyncPage);
    else if (tag.toLowerCase()=='settings')
      this.nav.push(SettingsPage);
    else if (tag.toLowerCase()=='register')
    this.nav.push(RegisterPage);
    else if (tag.toLowerCase()=='sign off'){
      this.nav.setRoot(LoginPage);
      //this.nav.push(LoginPage);
    }
  }
}
