import { Component, OnInit, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory} from '@angular/core';
import { InterfaceService } from '../../services/InterfaceService';
import { Global } from '../../services/Global'; 
import { PushService } from '../../services/PushService';
import { StorageService } from '../../services/StorageService';

import { SetPowerComponent } from '../../public-component/set-power/set-power.component';
import { DelAlterComponent} from '../../public-component/del-alter/del-alter.component';

@Component({
  selector: 'app-power-mannage',
  templateUrl: './power-mannage.component.html',
  styleUrls: ['./power-mannage.component.css']
})
export class PowerMannageComponent implements OnInit {

  // setting = {
  //   data: {
  //     simpleData: {
  //       enable: true
  //     }
  //   }
  // };
  // zNodes = [{"isParent":true,"name":"彩生活服务集团","parentId":"0","orgUuid":"9959f117-df60-4d1b-a354-776c20ffb8c7","status":"0"},{"isParent":true,"name":"供应商合作单位","parentId":"0","orgUuid":"d30a5374-c30f-11e5-8697-9bf1e8b5d302","status":"0"}];
  @ViewChild('setauth',{read : ViewContainerRef}) setAuth : ViewContainerRef;
  authComponent : ComponentRef<SetPowerComponent>;
  delComponent : ComponentRef<DelAlterComponent>
  public orgData : any; //组织架构信息
  public staffData : any; //员工的信息
  public roleData : any;
  public authData : any;
  public authorityData : any = [];//被选中的人员
  public ROLE : string = 'role';
  public USER : string = 'user';
  public MODULE : string = 'module';
  public NOWTYPE : string = 'user';
  constructor(private interfaceService : InterfaceService, private pushService : PushService,
     private storageService : StorageService, private comfacref : ComponentFactoryResolver) { }

  ngOnInit() {
    this.getOrgData();
    // console.log($.fn.zTree)
    // console.log($('#ztreeData'))
    // this.getZtreeData();
    //$.fn.zTree.init($("#ztreeData"),this.setting,this.zNodes);
  }


roleManageType(){
  this.NOWTYPE = this.ROLE;
 // this.getOrgData();
 // this.getZtreeData()
}

userManageType(){
  this.NOWTYPE = this.USER;
}

moduleManageType(){
  this.NOWTYPE = this.MODULE;
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

  // getStaffData(val){
  //   this.interfaceService.doStaffData(this.storageService.getValue(Global.USER_ACCOUNTID_KEY),val);
  //   this.pushService.staffData$.subscribe((data)=>{
  //     this.staffData = data;
  //     for(let i = 0; i < this.staffData.length; i++){
  //       this.staffData[i].istrue = false;
  //     }
  //   })
  // }

 

  

  

  // zTreeOnClick(event, treeId, treeNode, clickFlag){
  //   var orgUuid = treeNode.orgUuid;
  //   this.interfaceService.doStaffData(this.storageService.getValue(Global.USER_ACCOUNTID_KEY),orgUuid)
  // }

}
