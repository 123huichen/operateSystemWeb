import { Component, OnInit, ChangeDetectorRef, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory } from '@angular/core';
import { InterfaceService } from '../services/InterfaceService';
import { Global } from '../services/Global'; 
import { PushService } from '../services/PushService';

import { EditModalComponent } from '../public-component/edit-modal.component';
import { ViewChildren } from '@angular/core/src/metadata/di';
@Component({
  selector: 'app-indexhome',
  templateUrl: './indexhome.component.html',
  styleUrls: ['./indexhome.component.css']
})
export class IndexhomeComponent implements OnInit {


  @ViewChild('modal',{read : ViewContainerRef}) Modal : ViewContainerRef
  id : number;
  name : string;
  comment : string;
  componentRef : ComponentRef<EditModalComponent>;
  cooperationData : any[] = [];//合作类型数据
  negoData : any[] = [];//洽谈类型数据
  projectData : any[] = [];//项目类型数据
  COOPER : string = 'cooperType';//这是匹配的常量
  PROJT : string = 'projectType';//这是匹配的常量
  NEGO : string = 'ngeoType';//这是匹配的常量
  nowType : string; //和常量配对的值  来进行操作
  Index : number; // 获取当前点击的数据在Alldata的下标
  queryData : any; //传递给子组件的数据  主要是修改和新增的数据
  childShow : boolean = false; // 销毁子组件 来更新传进去的数据
  constructor( private interfaceService : InterfaceService, private pushService : PushService,
     private changRef : ChangeDetectorRef, private compFacRes : ComponentFactoryResolver) { 
    
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    
  }

  QueryCooperationType(){
    this.nowType = this.COOPER;
    this.interfaceService.doQueryCooperationType();
    this.pushService.queryCooperation_type$.subscribe( (data)=>{
      this.cooperationData = data;
      console.log(this.cooperationData)
    })
    this.childShow = false;
  }

  DelCooperationType(id,index){
    this.cooperationData.splice(index,1);
    this.interfaceService.doDelCooperationType(id)
  }

  UpdataCooperationType(id,name,comment){
    this.interfaceService.doUpdataCooperationType(id,name,comment)
  }

  AddCooperationType(name,comment){
    this.interfaceService.doAddCooperationType(name,comment)
  }

  QueryProjectType(){
    this.nowType = this.PROJT;
    console.log(1);
    this.interfaceService.doQueryProjectType();
    this.pushService.queryProject_type$.subscribe( (data)=>{
      this.projectData = data;
      console.log(this.projectData)
    })
    this.childShow = false;
  }

  DelProjectType(id,index){
    this.projectData.splice(index,1);
    this.interfaceService.doDelProjectType(id)
  }

  UpdatayProjectType(id,name,comment){
    this.interfaceService.doUpdataProjectType(id,name,comment)
  }

  AddProjectType(name,comment){
    this.interfaceService.doAddProjectType(name,comment)
  }

  QueryNegotiateType(){
    this.nowType = this.NEGO;
    this.interfaceService.doQueryNegotiateType();
    this.pushService.queryNegotiate_type$.subscribe( (data)=>{
      this.negoData = data;
    })
    this.childShow = false;
  }

  DelNegotiateType(id,index){
    this.negoData.splice(index,1);
    this.interfaceService.doDelNegotiateType(id)
  }

  UpdataNegotiateType(id,name,comment){
    this.interfaceService.doUpdataNegotiateType(id,name,comment)
  }
  
  AddNegotiateType(name,comment){
    this.interfaceService.doAddNegotiateType(name,comment)
  }


  GetIndex(i){
    // this.Index = i;
    // console.log(this.Index)
    // this.queryData = { 'type' : this.nowType, 'data' : this.AllData[this.Index]};
    // console.log(this.queryData)
    // this.childShow = true;
    switch(this.nowType){
      case this.COOPER : {
        this.queryData = {'type' : this.nowType, 'data' : this.cooperationData[i]}
        this.Modal.clear();
        let c : ComponentFactory<EditModalComponent> = this.compFacRes.resolveComponentFactory(EditModalComponent);
        this.componentRef = this.Modal.createComponent(c);
        this.componentRef.instance.queryData = this.queryData;
        this.componentRef.instance.updata.subscribe( (data)=>{
          console.log(data);
          this.interfaceService.doUpdataCooperationType(data.id,data.title,data.comment);
          this.pushService.updataCooperation_type$.subscribe((data)=>{
            this.componentRef.destroy();
            this.interfaceService.doQueryCooperationType();
          })
        })
        this.componentRef.instance.destroyData.subscribe((data)=>{
          this.componentRef.destroy();
        })
      }
      break;

      case this.NEGO : {
        this.queryData = {'type' : this.nowType, 'data' : this.negoData[i]}
        this.Modal.clear();
        let c : ComponentFactory<EditModalComponent> = this.compFacRes.resolveComponentFactory(EditModalComponent);
        this.componentRef = this.Modal.createComponent(c);
        this.componentRef.instance.queryData = this.queryData;
        this.componentRef.instance.updata.subscribe( (data)=>{
          console.log(data);
          this.interfaceService.doUpdataNegotiateType(data.id,data.title,data.comment);
          this.pushService.updataNegotiate_type$.subscribe((data)=>{
            this.componentRef.destroy();
            this.interfaceService.doQueryNegotiateType();
          })
        })
        this.componentRef.instance.destroyData.subscribe((data)=>{
          this.componentRef.destroy();
        })
      }
      break;

      case this.PROJT : {
        this.queryData = {'type' : this.nowType, 'data' : this.projectData[i]}
        this.Modal.clear();
        let c : ComponentFactory<EditModalComponent> = this.compFacRes.resolveComponentFactory(EditModalComponent);
        this.componentRef = this.Modal.createComponent(c);
        this.componentRef.instance.queryData = this.queryData;
        this.componentRef.instance.updata.subscribe( (data)=>{
          console.log(data);
          this.interfaceService.doUpdataProjectType(data.id,data.title,data.comment);
          this.pushService.updataProject_type$.subscribe((data)=>{
            this.componentRef.destroy();
            this.interfaceService.doQueryProjectType();
          })
        })
        this.componentRef.instance.destroyData.subscribe((data)=>{
          this.componentRef.destroy();
        })
      }
      break;

      default : {
        console.log('----类型错误-----');
      }
      break;
    }
  }

  AddManage(){
    switch(this.nowType){
      case this.COOPER : {
        console.log('调用了动态组件');
        this.Modal.clear();
        let c : ComponentFactory<EditModalComponent> = this.compFacRes.resolveComponentFactory(EditModalComponent);
        this.componentRef = this.Modal.createComponent(c);
        this.componentRef.instance.typeData = this.nowType;
        this.componentRef.instance.updata.subscribe( (data)=>{
          console.log(data);
          this.interfaceService.doAddCooperationType(data.title,data.comment);
          this.pushService.addCooperation_type$.subscribe((data)=>{
            console.log(data);
            this.componentRef.destroy();
            this.interfaceService.doQueryCooperationType();
          })
        })
        this.componentRef.instance.destroyData.subscribe((data)=>{
          this.componentRef.destroy()
        })
      }
      break;

      case this.NEGO : {
        console.log('调用了动态组件');
        this.Modal.clear();
        let c : ComponentFactory<EditModalComponent> = this.compFacRes.resolveComponentFactory(EditModalComponent);
        this.componentRef = this.Modal.createComponent(c);
        this.componentRef.instance.typeData = this.nowType;
        this.componentRef.instance.updata.subscribe( (data)=>{
          console.log(data);
          this.interfaceService.doAddNegotiateType(data.title,data.comment);
          this.pushService.addNegotiate_type$.subscribe((data)=>{
            console.log(data);
            this.componentRef.destroy();
            this.interfaceService.doQueryNegotiateType();
          })
        })
        this.componentRef.instance.destroyData.subscribe((data)=>{
          this.componentRef.destroy()
        })
      }
      break;

      case this.PROJT : {
        console.log('调用了动态组件');
        this.Modal.clear();
        let c : ComponentFactory<EditModalComponent> = this.compFacRes.resolveComponentFactory(EditModalComponent);
        this.componentRef = this.Modal.createComponent(c);
        this.componentRef.instance.typeData = this.nowType;
        this.componentRef.instance.updata.subscribe( (data)=>{
          console.log(data);
          this.interfaceService.doAddProjectType(data.title,data.comment);
          this.pushService.addProject_type$.subscribe((data)=>{
            console.log(data);
            this.componentRef.destroy();
            this.interfaceService.doQueryProjectType();
          })
        })
        this.componentRef.instance.destroyData.subscribe((data)=>{
          this.componentRef.destroy()
        })
      }
      break;
      
      default :
      {
              console.log('----类型错误-----');
      }
      break;
    }
  }

  // GetDestroyData(e){
  //   this.childShow = e
  // }

  // GetUpdata(e){
  //   let d = e.data;
  //   console.log(d);
  //   this.childShow = e.destroyData;
  // }

  // getData(){
  //   this.pushService.getData().subscribe( (data)=>{
  //     console.log(data);
  //     if(data != null){

  //       this.AllData = data;
  //       //this.changRef.detectChanges();
  //     }else{
  //       console.log('数据为空')
  //     }
  //     console.log(this.AllData);
  //   })
  // }



}
