
import { Component, OnInit, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory} from '@angular/core';
import { InterfaceService } from '../../../services/InterfaceService';
import { Global } from '../../../services/Global'; 
import { PushService } from '../../../services/PushService';
import { StorageService } from '../../../services/StorageService';

import { SetPowerComponent } from '../../../public-component/set-power/set-power.component';
import { DelAlterComponent} from '../../../public-component/del-alter/del-alter.component';


declare var $ : any;
@Component({
  selector: 'app-import-user',
  templateUrl: './import-user.component.html',
  styleUrls: ['./import-user.component.css']
})
export class ImportUserComponent implements OnInit {

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
    this.getZtreeData();
  }


  getZtreeData(){
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
      self.doStaffData(accountUuid,orgUuid)
    }
    this.pushService.staffData$.subscribe((data)=>{
      this.staffData = data;
      console.log(this.staffData);
      for(let i = 0; i < this.staffData.length; i++){
        this.staffData[i].istrue = false;
      }
    })
    //对 子集请求 返回数据进行 预处理的函数
    // function ajaxDataFilter(treeId, parentNode, responseData) {
    //   console.log(responseData);
    // }
    
    let zNodes = [];
    console.log($('#ztreeData'))
    $.fn.zTree.init($('#ztreeData'), setting, zNodes);
    $.fn.zTree.init($('#ztreeDataMO'), setting, zNodes);
  }

  //设置管理组织架构
  setManagementOrganization(){
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
    this.pushService.staffData$.subscribe((data)=>{
      this.staffData = data;
      console.log(this.staffData);
      for(let i = 0; i < this.staffData.length; i++){
        this.staffData[i].istrue = false;
      }
    })
    
    let zNodes = [];
    console.log($('#ztreeDataMO'));
    $.fn.zTree.init($('#ztreeDataMO'), setting, zNodes);
  }

  public setAuthority(){
    for(let i = 0; i < this.staffData.length; i++){
      
      if(this.staffData[i].istrue == true){
        this.authorityData.push(this.staffData[i]);
      }
    }
    let c : ComponentFactory<DelAlterComponent> = this.comfacref.resolveComponentFactory(DelAlterComponent);
    this.delComponent = this.setAuth.createComponent(c);
    this.delComponent.instance.sure.subscribe((data)=>{
      this.delComponent.destroy();
      console.log(data);
      let dataJson = {'people' : this.authorityData };
      this.interfaceService.doAddUserAuthorith(JSON.stringify(dataJson));
    });
    this.delComponent.instance.cancel.subscribe((data)=>{
      this.delComponent.destroy();
    });
    // let c : ComponentFactory<SetPowerComponent> = this.comfacref.resolveComponentFactory(SetPowerComponent);
    // this.authComponent = this.setAuth.createComponent(c);
    // this.authComponent.instance.roleData = this.roleData;
    // this.authComponent.instance.authData = this.authData;
    // this.authComponent.instance.sure.subscribe((data)=>{
    //   this.authComponent.destroy();
    //   console.log(data);
    //   let dataJson = {'parentId' : data.parentId, 'childId' : data.childId, 'people' : this.authorityData };
    //   this.interfaceService.doAddUserAuthorith(JSON.stringify(dataJson));
    // });
    // this.authComponent.instance.cancel.subscribe((data)=>{
    //   this.authComponent.destroy();
    // });
    
  }

  changeIsTrue(index,$event){
    console.log(index)
    console.log($event.target.checked)
    for(let i = 0; i < this.staffData.length; i++){
      this.staffData[index].istrue = $event.target.checked;
    }
    console.log(this.staffData)
  }


}
