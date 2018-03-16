import { Component, OnInit, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory} from '@angular/core';
import { InterfaceService } from '../../../services/InterfaceService';
import { Global } from '../../../services/Global'; 
import { PushService } from '../../../services/PushService';
import { StorageService } from '../../../services/StorageService';

import { SetPowerComponent } from '../../../public-component/set-power/set-power.component';
declare var $ : any;
@Component({
  selector: 'app-set-authority',
  templateUrl: './set-authority.component.html',
  styleUrls: ['./set-authority.component.css']
})
export class SetAuthorityComponent implements OnInit {
  @ViewChild('setauth',{read : ViewContainerRef}) setAuth : ViewContainerRef;
  authComponent : ComponentRef<SetPowerComponent>;
  public userList : any = [];
  public roleData : any;
  public authData : any;
  public authorityData : any = [];//被选中的人员
  constructor(private interfaceService : InterfaceService, 
    private pushService : PushService,
    private storageService : StorageService, 
    private comfacref : ComponentFactoryResolver) { }

  ngOnInit() {
    this.getUserListData();
    this.getOrgData();
  }

  getUserListData(){
    this.interfaceService.doQueryUserData(this.storageService.getValue(Global.USER_CORPID_KEY));
    this.pushService.userListData$.subscribe((data)=>{
      this.userList = data;
    })
  }

  getOrgData(){
    // this.interfaceService.doOrgChat(this.storageService.getValue(Global.USER_ACCOUNTID_KEY),0);
    // this.pushService.orgData$.subscribe((data)=>{
    //   this.orgData = data;
    //   console.log(typeof this.staffData)
    // })
    this.interfaceService.doRoleData();
    this.pushService.roleData$.subscribe((data)=>{
      this.roleData = data;
    })
    this.interfaceService.doAllAuthorityData();
    this.pushService.allAuthorityData$.subscribe((data)=>{
      this.authData = data;
    })
  }

  changeIsTrue(index,$event){
    console.log(index)
    console.log($event.target.checked)
    for(let i = 0; i < this.userList.length; i++){
      this.userList[index].istrue = $event.target.checked;
    }
    console.log(this.userList[index].u_id);
  }


  //设置权限操作
  public setAuthority(){
    for(let i = 0; i < this.userList.length; i++){
      if(this.userList[i].istrue == true){
        this.authorityData.push({"user_id": this.userList[i].u_id});
      }
    }
    
    let c : ComponentFactory<SetPowerComponent> = this.comfacref.resolveComponentFactory(SetPowerComponent);
    this.authComponent = this.setAuth.createComponent(c);
    this.authComponent.instance.roleData = this.roleData;
    this.authComponent.instance.authData = this.authData;
    this.authComponent.instance.sure.subscribe((data)=>{
      this.authComponent.destroy();
      console.log(data);
      let dataJson = {"user" : this.authorityData,"role_id" : data.role_id };
      this.interfaceService.doReviseAuthorityData(JSON.stringify(dataJson));
    });
    this.authComponent.instance.cancel.subscribe((data)=>{
      this.authComponent.destroy();
    });
  }
  
  //设置管理组织架构
  public setManagementOrganization(){
      let ztreeUrl = Global.SERVICE_ROOT + Global.ORG_CHAT + '?accountUuid='+this.storageService.getValue(Global.USER_ACCOUNTID_KEY);
      let setting = {
        view: {
          selectedMulti: false,
          showIcon :false
        },
        async: {
          enable: true, 
          url: ztreeUrl,//通过getTree接口获取树状数据
          autoParam: ['orgUuid'],
          type : 'get',
          //dataFilter: ajaxDataFilter
        },
        edit: {
          enable: true,
          showRemoveBtn: false,
          showRenameBtn: false
        },
        data: {
          keep: {
            parent:true,
            leaf:true
          },
          simpleData: {
            enable: true,
            idKey: "orgUuid",
            pIdKey: "parentId",
            rootPId: 0
          },
          check: {
            enable: true,
            chkStyle: "checkbox",
            chkboxType: { "Y": "p", "N": "s" },
            chkDisabledInherit: true,
            nocheckInherit: true,
          },
        },
        callback: {
          onClick: zTreeOnClick,
          //onExpand: zTreeOnExpand
        }
      };
      console.log(ztreeUrl);
      let self = this.interfaceService;
      let accountUuid = this.storageService.getValue(Global.USER_ACCOUNTID_KEY);//this指向问题
      //用于捕获节点被点击的事件回调函数
      function zTreeOnClick(event, treeId, treeNode, clickFlag){
        var orgUuid = treeNode.orgUuid;
        console.log("拿到管理组织架构数据");
      }
      // this.pushService.staffData$.subscribe((data)=>{
      //   this.staffData = data;
      //   console.log(this.staffData);
      //   for(let i = 0; i < this.staffData.length; i++){
      //     this.staffData[i].istrue = false;
      //   }
      // });
      
      let zNodes = [];
      console.log($('#ztreeDataMO'));
      $.fn.zTree.init($('#ztreeDataMO'), setting, zNodes);
    }

}
