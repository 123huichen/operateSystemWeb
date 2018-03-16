import { Component, OnInit } from '@angular/core';
import { InterfaceService } from '../../../services/InterfaceService';
import { Global } from '../../../services/Global'; 
import { PushService } from '../../../services/PushService';
import { StorageService } from '../../../services/StorageService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-role-authority',
  templateUrl: './role-authority.component.html',
  styleUrls: ['./role-authority.component.css']
})
export class RoleAuthorityComponent implements OnInit {


  findOperationData : any[] = [{operationId:1,operationName:"增加", status : false},{operationId:2,operationName:"删除", status : false},{operationId:3,operationName:"修改", status : false},{operationId:4,operationName:"查看", status : false}]  ;
  authData : any[] = [];
  authority : any[] = [];
  operation : any[] = [];
  roleId : any;
  roles : any;
  constructor(private interfaceService : InterfaceService, private pushService : PushService,
    private storageService : StorageService, private actroute : ActivatedRoute) { }

  ngOnInit() {
    //this.getFindOperationData();
    this.actroute.queryParams.subscribe(queryParams => {  
      this.roleId = queryParams.roleId;
      console.log(this.roleId)  
  });  
    this.getAuthData();
    
  }

  // getFindOperationData(){
  //   this.interfaceService.doFindOperationData();
  //   this.pushService.findOperation$.subscribe((data)=>{
  //     this.findOperationData = data;
  //   })
  // }

  getAuthData(){
    this.interfaceService.doAllAuthorityData();
    this.pushService.allAuthorityData$.subscribe((data)=>{
      this.authData = data;
      if(this.authData != undefined){
        for( let i = 0; i < this.authData.length; i++){
          //console.log(this.authData[i])
          this.authData[i].handle = [{operationId:1,operationName:"增加", status : false},{operationId:2,operationName:"删除", status : false},{operationId:3,operationName:"修改", status : false},{operationId:4,operationName:"查看", status : false}]
          
        }
      }
     
      console.log(this.authData)
    })
  }

  changeOperation(i,j,$event){
    console.log(i);
    console.log(j)
    console.log($event.target)
    console.log(this.authData[i].handle[j])
    this.authData[i].handle[j].status = $event.target.checked;
    // this.operation.push({'operationId' : this.authData[i].handle[j].operationId})
    // this.authority.push({'menu_id' : this.authData[i].authority_id,'operation' : this.operation})
    console.log(this.authData)
    // i = i+1;
    // j = j+1;
    
    console.log(this.authData[i].handle[j].operationName)
    
  }

  keepData(){
    let authority : any[] = [];
    let operation : any[] = [];
    let index : any[] = [];
    for(let i = 0; i < this.authData.length; i++){
      for(let j = 0; j < this.authData[i].handle.length; j++){
        if(this.authData[i].handle[j].status == true){
          //operation.push({'operationId' : this.authData[i].handle[j].operationId})
          // authority.push({'menu_id' : this.authData[i].authority_id,'operation' : operation})
          // console.log(this.authData[i].handle[j].operationId)
          // console.log(operation)
          // console.log(i)
          index.push(i)
        }
      }
    }
    let authdata$ = this.authData;
    console.log(index)
    let arr : any[] = index.filter((ele,index,self)=>{
      return self.indexOf(ele) == index;
    })
    console.log(arr);
    
    for(let a = 0; a < arr.length; a++){
      let s = pjfunction(arr[a])
      authority.push(s);
    }
    console.log(authority);
    this.roles = {"role_id" : this.roleId,"menu" : authority}
    console.log(this.roles);
    function pjfunction(val){
      let arr = [];
      for(let j = 0; j < authdata$[val].handle.length; j++){
        if(authdata$[val].handle[j].status == true){
          arr.push({'operationId' : authdata$[val].handle[j].operationId})
        }
      }
      return {"menu_id" : authdata$[val].authority_id,"operation" : arr}
    }
    this.interfaceService.doSetRoleAuthority(JSON.stringify(this.roles));
  }

}
