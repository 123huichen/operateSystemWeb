import { Component, OnInit, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory} from '@angular/core';
import { InterfaceService } from '../../../services/InterfaceService';
import { Global } from '../../../services/Global'; 
import { PushService } from '../../../services/PushService';
import { StorageService } from '../../../services/StorageService';

import { AddManageComponent } from '../../../public-component/add-manage/add-manage.component';
import { DelAlterComponent } from '../../../public-component/del-alter/del-alter.component';
@Component({
  selector: 'app-module-manage',
  templateUrl: './module-manage.component.html',
  styleUrls: ['./module-manage.component.css']
})
export class ModuleManageComponent implements OnInit {

  @ViewChild('module',{read : ViewContainerRef}) Module : ViewContainerRef;
  addModuleComp : ComponentRef<AddManageComponent>;
  updataModuleComp : ComponentRef<AddManageComponent>;
  delModuleComp : ComponentRef<DelAlterComponent>;
  public authData : any = [];
  constructor(private interfaceService : InterfaceService, private pushService : PushService,
    private storageService : StorageService, private comfacref : ComponentFactoryResolver) { }

  ngOnInit() {
    this.getAuthData()
  }

  getAuthData(){
    this.interfaceService.doAllAuthorityData();
    this.pushService.allAuthorityData$.subscribe((data)=>{
      this.authData = data;
    })
  }

  addModuleManage(){
    let c : ComponentFactory<AddManageComponent> = this.comfacref.resolveComponentFactory(AddManageComponent);
    this.addModuleComp = this.Module.createComponent(c);
    this.addModuleComp.instance.manageData = {title : '模块',managename : '名称'};
    this.addModuleComp.instance.sure.subscribe((data)=>{
      this.addModuleComp.destroy()
      console.log(1);
      this.interfaceService.doAddAuthority(data);
      this.pushService.addAuthority$.subscribe((data)=>{
        console.log(1);
        this.interfaceService.doAllAuthorityData();
      })
    })
    this.addModuleComp.instance.cancel.subscribe((data)=>{
      this.addModuleComp.destroy();
    })
  }

  updataModuleManage(index){
    let c : ComponentFactory<AddManageComponent> = this.comfacref.resolveComponentFactory(AddManageComponent);
    this.updataModuleComp = this.Module.createComponent(c);
    this.updataModuleComp.instance.manageData = {title : '模块',managename : '名称'};
    this.updataModuleComp.instance.updataManage = {'type' : 'module', 'data' : this.authData[index]};
    // this.updataModuleComp.instance.sure.subscribe((data)=>{
    //   this.updataModuleComp.destroy();
    //   this.interfaceService.doUpdataRole(this.authData[index].authority_id,this.authData[index].operate);
    //   this.pushService.updataRole$.subscribe((data)=>{
    //     if(data == 1){
    //       this.interfaceService.doRoleData();
    //     }
    //   })
    // })
    this.updataModuleComp.instance.sure.subscribe((data)=>{
      this.updataModuleComp.destroy();
      this.interfaceService.doUpdataAuthority(this.authData[index].authority_id,data)
      this.pushService.updataAuthority$.subscribe((data)=>{
        if(data == 1){
          this.interfaceService.doAllAuthorityData();
        }
      })
    })
    this.updataModuleComp.instance.cancel.subscribe((data)=>{
      console.log(1)
      this.updataModuleComp.destroy();
    })
  }

  delRoleManage(index){
    console.log(this.authData[index])
    let i = this.authData[index];
    let c : ComponentFactory<DelAlterComponent> = this.comfacref.resolveComponentFactory(DelAlterComponent);
    this.delModuleComp = this.Module.createComponent(c);
    this.delModuleComp.instance.sure.subscribe((data)=>{
      this.delModuleComp.destroy();
      this.authData.splice(index,1);
      console.log(this.authData[index])
      console.log(i)
      this.interfaceService.doDelRole(i.authority_id);
      this.pushService.delRole$.subscribe((data)=>{
        if(data == 1){
          this.interfaceService.doRoleData();
        }
      })
    })
    this.delModuleComp.instance.cancel.subscribe((data)=>{
      this.delModuleComp.destroy();
    })
  }


}
