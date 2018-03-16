import { Component, OnInit } from '@angular/core';


import { PushService } from '../services/PushService';
import { InterfaceService } from '../services/InterfaceService';
import { StorageService } from '../services/StorageService';
import { Global } from '../services/Global';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userName : string;
  accountUuid : string;
  private headImage : string = '../../assets/image/touxiang.jpg';
  
  constructor( private storageService : StorageService, private interfaceService: InterfaceService, private pushService : PushService) { }
  ngOnInit() {
    this.userName = this.storageService.getValue(Global.name);
    this.accountUuid = this.storageService.getValue(Global.USER_ACCOUNTID_KEY);
    this.getHeadImage();
  }

  LogOut(id) {
    this.interfaceService.doLogOut(this.accountUuid);
  }

  /**
   * 获取用户头像
   * getHeadImage
   */
  public getHeadImage() {
    var tempAccountUuid = this.storageService.getValue(Global.USER_ACCOUNTID_KEY);
    var tempOAName = this.storageService.getValue(Global.USER_USERNAME_KEY);
    if(tempAccountUuid==null||tempAccountUuid==undefined){
      return;
    }
    if(tempOAName==null||tempOAName==undefined){
      return;
    }
    this.interfaceService.doGetHeadImage(tempAccountUuid, tempOAName);
    this.pushService.getHeadImage$.subscribe((data) => {
      if (data != null) {
        console.log("头像数据返回" + data);
        this.headImage = data; 
      }
    })
  }



}
