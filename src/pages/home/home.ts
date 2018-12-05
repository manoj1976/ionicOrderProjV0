import { AppService } from './../../services/app.service';
import { Network } from '@ionic-native/network';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[AppService]
})
export class HomePage {
  varLogin={email:'',password:''};
  private varDispDetails={userid:''};
  constructor(public navCtrl: NavController,public network:Network,private appsvc:AppService) {
    this.varDispDetails.userid=AppService.getUser().UserID;
    /*for future development
    this.network.onDisconnect().subscribe(()=>
  {alert('network was disconnected')});


  // watch network for a connection
 this.network.onConnect().subscribe(() => {
  console.log('network connected!');
  alert('network connected!');
  // We just got a connection but we need to wait briefly
   // before we determine the connection type. Might need to wait.
  // prior to doing any api requests as well.
  setTimeout(() => {
    if (this.network.type === 'wifi') {
      //console.log('we got a wifi connection, woohoo!'); 
      //for future development
    }
  }, 3000);
});
*/
  }

}
