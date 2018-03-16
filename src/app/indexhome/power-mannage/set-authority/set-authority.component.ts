import { Component, OnInit, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory} from '@angular/core';
import { InterfaceService } from '../../../services/InterfaceService';
import { Global } from '../../../services/Global'; 
import { PushService } from '../../../services/PushService';
import { StorageService } from '../../../services/StorageService';

import { SetPowerComponent } from '../../../public-component/set-power/set-power.component';
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
  constructor(private interfaceService : InterfaceService, private pushService : PushService,
    private storageService : StorageService, private comfacref : ComponentFactoryResolver) { }

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


  setAuthority(){
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

}
