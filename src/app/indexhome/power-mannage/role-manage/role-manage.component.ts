import { Component, OnInit, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { InterfaceService } from '../../../services/InterfaceService';
import { Global } from '../../../services/Global'; 
import { PushService } from '../../../services/PushService';
import { StorageService } from '../../../services/StorageService';

import { RouterModule, Routes, Router } from '@angular/router';


import { AddManageComponent } from '../../../public-component/add-manage/add-manage.component';
import { DelAlterComponent } from '../../../public-component/del-alter/del-alter.component';


@Component({
  selector: 'app-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.css']
})
export class RoleManageComponent implements OnInit {

  @ViewChild('role',{read : ViewContainerRef}) Role : ViewContainerRef;
  addRoleComp : ComponentRef<AddManageComponent>;
  updataRoleComp : ComponentRef<AddManageComponent>;
  delRoleComp : ComponentRef<DelAlterComponent>;
  public roleData : any = [];
  constructor(private interfaceService : InterfaceService, private pushService : PushService,
    private storageService : StorageService, private comfacref : ComponentFactoryResolver, private router : Router) { }

  ngOnInit() {
    this.getRoleData()
  }


  getRoleData(){
    this.interfaceService.doRoleData();
    this.pushService.roleData$.subscribe((data)=>{
      this.roleData = data;
    })
  }

  addRoleManage(){
    let c : ComponentFactory<AddManageComponent> = this.comfacref.resolveComponentFactory(AddManageComponent);
    this.addRoleComp = this.Role.createComponent(c);
    this.addRoleComp.instance.manageData = {title : '角色',managename : '姓名'};
    this.addRoleComp.instance.sure.subscribe((data)=>{
      this.addRoleComp.destroy();
      this.interfaceService.doAddRole(data)
      this.pushService.addRole$.subscribe((data)=>{
        
        this.interfaceService.doRoleData();
      })
    })
    this.addRoleComp.instance.cancel.subscribe((data)=>{
      this.addRoleComp.destroy();
    })
  }

  updataRoleManage(index){
    // let i = this.roleData[index]
    // let c : ComponentFactory<AddManageComponent> = this.comfacref.resolveComponentFactory(AddManageComponent);
    // this.updataRoleComp = this.Role.createComponent(c);
    // this.updataRoleComp.instance.manageData = {title : '角色',managename : '姓名'};
    // this.updataRoleComp.instance.updataManage = {'type' : 'role', 'data' : this.roleData[index]};
    // this.updataRoleComp.instance.sure.subscribe((data)=>{
    //   console.log(1)
    //   this.updataRoleComp.destroy();
    //   this.interfaceService.doUpdataRole(i.role_id,data);
    //   this.pushService.updataRole$.subscribe((data)=>{
    //     if(data == 1){
    //       this.interfaceService.doRoleData()
    //     }
    //   })
    // })
    // this.updataRoleComp.instance.cancel.subscribe((data)=>{
    //   console.log(1)
    //   this.updataRoleComp.destroy();
    // })
    this.router.navigate(['/indexpage/indexhome/roleauthority'],{
      queryParams: {  
        roleId: this.roleData[index].role_id,
      }
    })
  }

  delRoleManage(index){
    let i = this.roleData[index]
    let c : ComponentFactory<DelAlterComponent> = this.comfacref.resolveComponentFactory(DelAlterComponent);
    this.delRoleComp = this.Role.createComponent(c);
    this.delRoleComp.instance.sure.subscribe((data)=>{
      this.delRoleComp.destroy();
      this.roleData.splice(index,1);
      this.interfaceService.doDelRole(i.role_id);
      this.pushService.delRole$.subscribe((data)=>{
        if(data == 1){
          this.interfaceService.doRoleData();
        }
      })
    })
  }


}
