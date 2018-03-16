import { Component, OnInit, Inject, forwardRef } from '@angular/core';

import { WebClient } from '../services/WebClient';
import { PushService } from '../services/PushService';
import { InterfaceService } from '../services/InterfaceService';
import { StorageService } from '../services/StorageService';
import { Global } from '../services/Global';
import { SessionService } from '../services/SessionService';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {



  authorityData : any;
  INDEX : string; //用来控制权限是否显示
  FUNCTION_SET : string; //用来控制权限是否显示
  ADD_PROJECT : string; //用来控制权限是否显示
  MY_PROJECT_LIST : string; //用来控制权限是否显示
  INFORMATION_POOL : string; //用来控制权限是否显示
  PROJECT_SUPERVISION : string; //用来控制权限是否显示
  FILE_CABINETS : string; //用来控制权限是否显示
  COUNT_ANALY : string; //用来控制权限是否显示
  GROUP_MANNAGE : string; //用来控制权限是否显示
  DAYILY_MANAGE : string; //用来控制权限是否显示
  constructor(public webClient : WebClient, private interfaceService : InterfaceService, private sessionService : SessionService,
    @Inject (forwardRef (() => PushService)) public pushService: PushService, private storageService : StorageService) { }

  ngOnInit() {

    this.getAuthorityData();
  }

  testWeb(){
    this.webClient.doConnectToServer();
  };

  getAuthorityData(){
    this.pushService.getData().subscribe((data)=>{
      this.authorityData = data;
    })
    // this.INDEX = this.sessionService.getValue(Global.INDEX);
    // this.FUNCTION_SET = this.sessionService.getValue(Global.FUNCTION_SET);
    // this.ADD_PROJECT = this.sessionService.getValue(Global.ADD_PROJECT);
    // this.MY_PROJECT_LIST = this.sessionService.getValue(Global.MY_PROJECT_LIST);
    // this.INFORMATION_POOL = this.sessionService.getValue(Global.INFORMATION_POOL);
    // this.PROJECT_SUPERVISION = this.sessionService.getValue(Global.PROJECT_SUPERVISION);
    // this.FILE_CABINETS = this.sessionService.getValue(Global.FILE_CABINETS);
    // this.COUNT_ANALY = this.sessionService.getValue(Global.COUNT_ANALY);
    // this.GROUP_MANNAGE = this.sessionService.getValue(Global.GROUP_MANNAGE);
    // this.DAYILY_MANAGE = this.sessionService.getValue(Global.DAYILY_MANAGE);

    this.INDEX = this.storageService.getValue(Global.INDEX);
    this.FUNCTION_SET = this.storageService.getValue(Global.FUNCTION_SET);
    this.ADD_PROJECT = this.storageService.getValue(Global.ADD_PROJECT);
    this.MY_PROJECT_LIST = this.storageService.getValue(Global.MY_PROJECT_LIST);
    this.INFORMATION_POOL = this.storageService.getValue(Global.INFORMATION_POOL);
    this.PROJECT_SUPERVISION = this.storageService.getValue(Global.PROJECT_SUPERVISION);
    this.FILE_CABINETS = this.storageService.getValue(Global.FILE_CABINETS);
    this.COUNT_ANALY = this.storageService.getValue(Global.COUNT_ANALY);
    this.GROUP_MANNAGE = this.storageService.getValue(Global.GROUP_MANNAGE);
    this.DAYILY_MANAGE = this.storageService.getValue(Global.DAYILY_MANAGE);
  }

}
