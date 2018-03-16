/**
 * Created by zhao on 2017/1/16.
 * 导航跳转
 *
 * AsyncSubject BehaviorSubject PublishSubject ReplaySubject
 * http://www.jianshu.com/p/1257c8ba7c0c
 *
 *
 *  路由参考
 * https://segmentfault.com/a/1190000009265310
 *
 * http://www.jb51.net/article/115848.htm
 *
 * http://blog.csdn.net/young4dream/article/details/78312296
 *
 */

import {Component, Inject, Injectable, EventEmitter } from "@angular/core";

import { Router } from '@angular/router';

import { Global } from './Global';

import { StorageService } from './StorageService';
import { SessionService } from './SessionService';
import { GlobalFunction } from './GlobalFuntion';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';
// import { containsTree } from "@angular/router/src/url_tree";




import { MyprojectComponent } from "../myproject/myproject.component";
import { AddprojectComponent } from "../addproject/addproject.component";
import { EditModalComponent } from '../public-component/edit-modal.component';

import { from } from "rxjs/observable/from";
import { isNull } from "util";
import { Subject } from "rxjs/Subject";
import { concat } from "rxjs/operators/concat";


@Injectable()
export class PushService {

        // public courtionEvent$ : EventEmitter<CourtionPage>;
        // private subject = new BehaviorSubject(0);

        // 第一种数据转发、通知机制 EventEmitter
        a : any
        private subject = new BehaviorSubject(this.a);

        private login = new Subject<any>();
        public login$ = this.login.asObservable()

        private queryLinkPeo  = new Subject<any[]>();
        public queryLinkPeo$ = this.queryLinkPeo.asObservable()

        private queryCity = new Subject<any[]>();
        public queryCity$ = this.queryCity.asObservable();

        private queryLinkProject = new Subject<any[]>();
        public queryLinkProject$ = this.queryLinkProject.asObservable();

        private queryCitydata = new Subject<any[]>();
        public queryCitydata$ = this.queryCitydata.asObservable();

        private queryProjectFilterType = new Subject<any[]>();
        public queryProjectFilterType$ = this.queryProjectFilterType.asObservable();

        private queryCooperation_type = new Subject<any[]>();
        public queryCooperation_type$ = this.queryCooperation_type.asObservable();
        private updataCooperation_type = new Subject<any[]>();
        public updataCooperation_type$ = this.updataCooperation_type.asObservable();
        private delCooperation_type = new Subject<any[]>();
        public delCooperation_type$ = this.delCooperation_type.asObservable();
        private addCooperation_type = new Subject<any[]>();
        public addCooperation_type$ = this.addCooperation_type.asObservable();

        private queryNegotiate_type = new Subject<any[]>();
        public queryNegotiate_type$ = this.queryNegotiate_type.asObservable();
        private updataNegotiate_type = new Subject<any[]>();
        public updataNegotiate_type$ = this.updataNegotiate_type.asObservable();
        private delNegotiate_type = new Subject<any[]>();
        public delNegotiate_type$ = this.delNegotiate_type.asObservable();
        private addNegotiate_type = new Subject<any[]>();
        public addNegotiate_type$ = this.addNegotiate_type.asObservable();

        private queryProject_type = new Subject<any[]>();
        public queryProject_type$ = this.queryProject_type.asObservable();
        private updataProject_type = new Subject<any[]>();
        public updataProject_type$ = this.updataProject_type.asObservable();
        private delProject_type = new Subject<any[]>();
        public delProject_type$ = this.delProject_type.asObservable();
        private addProject_type = new Subject<any[]>();
        public addProject_type$ = this.addProject_type.asObservable();

        private myProjectListData = new Subject<any>();
        public myProjectListData$ = this.myProjectListData.asObservable();

        private logManageData = new Subject<any>();
        public logManageData$ = this.logManageData.asObservable();

        private countData = new Subject<any>();
        public countData$ = this.countData.asObservable()

        private orgData = new Subject<any>();
        public orgData$ = this.orgData.asObservable();

        private staffData = new Subject<any>();
        public staffData$ = this.staffData.asObservable()

        private roleData = new Subject<any>();
        public roleData$ = this.roleData.asObservable();
        private addRole = new Subject<any>();
        public addRole$ = this.addRole.asObservable();
        private delRole = new Subject<any>();
        public delRole$ = this.delRole.asObservable();
        private updataRole = new Subject<any>();
        public updataRole$ = this.updataRole.asObservable()

        private allAuthorityData = new Subject<any>();
        public allAuthorityData$ = this.allAuthorityData.asObservable();
        private addAuthority = new Subject<any>();
        public addAuthority$ = this.addAuthority.asObservable();
        private delAuthority = new Subject<any>();
        public delAuthority$ = this.delAuthority.asObservable();
        private updataAuthority = new Subject<any>();
        public updataAuthority$ = this.updataAuthority.asObservable();

        private userListData = new Subject<any>();
        public userListData$ = this.userListData.asObservable();

        private findOperation = new Subject<any>();
        public findOperation$ = this.findOperation.asObservable();

        private reviseAuthority = new Subject<any>();
        public reviseAuthority$ = this.reviseAuthority.asObservable();

        private setRoleAuthority = new Subject<any>();
        public setRoleAuthority$ = this.setRoleAuthority.asObservable();

        //时间提醒
        private setTimeReminderData = new Subject<any>();
        public setTimeReminderData$ = this.setTimeReminderData.asObservable();

        //搜索收件人
        private setSelectEmployee = new Subject<any>();
        public setSelectEmployee$ = this.setSelectEmployee.asObservable();

        //发送消息
        private setSendMessage = new Subject<any>();
        public setSendMessage$ = this.setSendMessage.asObservable();

        //获取用户头像
        private getHeadImage = new Subject<any>();
        public getHeadImage$ = this.getHeadImage.asObservable();

        //跟进状态切换
        private doNextStatus = new Subject<any>();
        public doNextStatus$ = this.doNextStatus.asObservable();

        //跟进状态名称
        private doGetStatus = new Subject<any>();
        public doGetStatus$ = this.doGetStatus.asObservable();

        //获取历史消息
        private doGetDataList = new Subject<any>();
        public doGetDataList$ = this.doGetDataList.asObservable(); 

        //获取管理组织架构
        private doGetOrgStructure = new Subject<any>();
        public doGetOrgStructure$ = this.doGetOrgStructure.asObservable(); 

        public myProjectEvent$ : EventEmitter<'MyprojectComponent'>;
        public editModalEvent$ : EventEmitter<any>;
        public addProjectEvent$ : EventEmitter<any>;

        constructor(private router : Router,  private globalFunction : GlobalFunction,
          private storageService : StorageService, private sessionService : SessionService ) {
                this.editModalEvent$ = new EventEmitter();
                this.myProjectEvent$ = new EventEmitter();
                this.addProjectEvent$ = new EventEmitter();
        }

        ngOnDestroy() {
          this.subject.unsubscribe();
        }


/*
      服务器返回数据协议统一格式
      {￼
          "code": 0,
          "message": "",
          "content": {￼
              "expireTime": 1513183117602,
              "accessToken": "739d227126cf4f9084fe27bd0bae6dfb",
              "corpUuid": "a8c58297436f433787725a94f780a3c9",
              "appUuid": "ICEZZXT0-C725-4567-83E2-A839C785A808",
              "serviceUuid": ""
          }
      }

      解析拿到 code  0成功  -1失败  实际数据内容在content

*/

public push (serviceName : string, data : any){

    console.log('PushService->push()执行的第一步');

    console.log('Global.REGISTER_SERVICE=>' + serviceName);
    console.log(data);

    if (data == null) {

      console.log("后台返回数据异，程序不能继续处理!");

      return;
    }

    let type : number = data.type;

    // 返回协议中生成与否标识 0 成功  非0则为异常或其它失败
    let code : number = data.code;

    let message : any = "";

    if (code != Global.SUCCESS) {

      message = data.message;

      // 如果是ice错误返回则直接弹窗
      if (type === Global.PROTOCOL_TYPE_ICE) {

        console.log("ICE异常：" + message);
          // 弹窗

        } else {

          // 如果非ice协议 返回message 是对象类型，需要进行判空处理
          if (!isNull(message)) {

            let show : boolean = message.show;
            if (show) {

              // 需要弹窗
              let info : string = message.info;

              console.log("后台返回数据异：" + info);

              // 弹窗


            }
          }

        }

        // 后台数据异常，程序返回
        return;
    }

    // 到这里数据已经安全，但content 需要每一个功能模块自行判空处理
   let content : any = data.content;

    switch (serviceName) {

        /*


          "code": 0,
          "message": "success",
    "content": {￼
        "accountUuid": "ecfcf0a3-627b-4a1d-b0c2-2efa36c6cc6b",
        "corpId": "a8c58297436f433787725a94f780a3c9",
        "createTs": "2017-10-13 15:45:30",
        "dr": 0,
        "email": "",
        "jobType": "",
        "jobUuid": "",
        "landline": "",
        "mobile": "",
        "name": "杨永强",
        "orgName": "",
        "orgUuid": "",
        "password": "",
        "salaryLevel": "",
        "sex": 1,
        "status": 0,
        "updateTs": "2017-11-29 16:14:02",
        "username": "yangyongqiang001",
        "job": [ ]

          处理登录，成功从content拿用户信息并本地存储
        */

        case Global.SERVICE_NAME_LOGIN : {
            console.log(data);
            this.router.navigate(['/indexpage/addproject'])
            let accountUuid : string = content.accountUuid;
            console.log(accountUuid)
            let corpId : string = content.corpId;
            let name : string = content.name;
            let username : string = content.username;
            let orgUuid : string = content.orgUuid;

            let authority : any[]= content.userResult.authority;
            // for (let i = 0; i < authority.length; i++){
            //   if(authority[i].operate == '功能设置'){
            //     this.sessionService.setValue(Global.FUNCTION_SET,authority[i].status);
            //     console.log(this.sessionService.getValue(Global.FUNCTION_SET));
            //   }else if(authority[i].operate == '首页'){
            //     this.sessionService.setValue(Global.INDEX,authority[i].status)
            //   }else if(authority[i].operate == '新增项目'){
            //     //console.log(this.sessionService.getValue(Global.GROUP_MANNAGE));
            //     this.sessionService.setValue(Global.ADD_PROJECT,authority[i].status)
            //     console.log(this.sessionService.getValue(Global.ADD_PROJECT))
            //   }else if(authority[i].operate == '我的项目列表'){
            //     this.sessionService.setValue(Global.MY_PROJECT_LIST,authority[i].status)
            //   }else if(authority[i].operate == '信息池'){
            //     this.sessionService.setValue(Global.INFORMATION_POOL,authority[i].status)
            //     console.log(this.sessionService.getValue(Global.INFORMATION_POOL))
            //   }else if(authority[i].operate == '项目督导'){
            //     this.sessionService.setValue(Global.PROJECT_SUPERVISION,authority[i].status);
            //   }else if(authority[i].operate == '文件柜'){
            //     this.sessionService.setValue(Global.FILE_CABINETS,authority[i].status);
            //   }else if(authority[i].operate == '统计分析'){
            //     this.sessionService.setValue(Global.COUNT_ANALY,authority[i].status)
            //   }else if(authority[i].operate == '分组管理'){
            //     this.sessionService.setValue(Global.GROUP_MANNAGE,authority[i].status)
            //   }else if(authority[i].operate == '日报管理'){
            //     this.sessionService.setValue(Global.DAYILY_MANAGE,authority[i].status);
            //   }
            // }

            for (let i = 0; i < authority.length; i++){
              if(authority[i].operate == '功能设置'){
                this.storageService.setValue(Global.FUNCTION_SET,authority[i].status);
                console.log(this.storageService.getValue(Global.FUNCTION_SET));
              }else if(authority[i].operate == '首页'){
                this.storageService.setValue(Global.INDEX,authority[i].status)
              }else if(authority[i].operate == '新增项目'){
                //console.log(this.sessionService.getValue(Global.GROUP_MANNAGE));
                this.storageService.setValue(Global.ADD_PROJECT,authority[i].status)
                console.log(this.storageService.getValue(Global.ADD_PROJECT))
              }else if(authority[i].operate == '我的项目列表'){
                this.storageService.setValue(Global.MY_PROJECT_LIST,authority[i].status)
              }else if(authority[i].operate == '信息池'){
                this.storageService.setValue(Global.INFORMATION_POOL,authority[i].status)
                console.log(this.storageService.getValue(Global.INFORMATION_POOL))
              }else if(authority[i].operate == '项目督导'){
                this.storageService.setValue(Global.PROJECT_SUPERVISION,authority[i].status);
              }else if(authority[i].operate == '文件柜'){
                this.storageService.setValue(Global.FILE_CABINETS,authority[i].status);
              }else if(authority[i].operate == '统计分析'){
                this.storageService.setValue(Global.COUNT_ANALY,authority[i].status)
              }else if(authority[i].operate == '分组管理'){
                this.storageService.setValue(Global.GROUP_MANNAGE,authority[i].status)
              }else if(authority[i].operate == '日报管理'){
                this.storageService.setValue(Global.DAYILY_MANAGE,authority[i].status);
              }
            }

            this.storageService.setValue(Global.USER_LOGIN_KEY, true);
            this.storageService.setValue(Global.USER_ACCOUNTID_KEY, accountUuid);
            this.storageService.setValue(Global.USER_CORPID_KEY, corpId);
            this.storageService.setValue(Global.name, name);
            this.storageService.setValue(Global.USER_USERNAME_KEY, username);
            this.storageService.setValue(Global.USER_ORGUID_KRY, orgUuid);
            this.subject.next(data);
            this.sendLoginData(data);
                console.log(data);

            // 数据保存成功路由到首页
        }
        break;

        // 新建成功 由路到“我的项目”页，并传数据
        case  Global.SERVICE_NAME_ADD_ITEM : {

          // 这里需要转场，转场时就传数据，不需要使用 事件通来刷数据
          // 跳转到 "myproject" 参数为data 实际数据为content内容
          //this.router.navigate(['myproject', content], {queryParams : {data : content}});\
          console.log(content)
          content = JSON.parse(content)
          if(content == 1){
            this.router.navigate(['/indexpage/myproject']);
          }
          this.addProjectEvent$.emit(content);
        }

        break;

        // 拿到项目列表数据 需要刷新“我的项目”页
        case Global.SERVICE_NAME_ITEM_LIST :
        {
          // 点“我的项目” 时是请示当前页面，显示面页项目列表，不走转场需要进行事件通知刷新本页面
          this.myProjectEvent$.emit(content);
        }
        break;

        case Global.COOPERATION_TYPE : {
          content = JSON.parse(content);
          this.sendQueryCooperation_type(content);
        }
        break;

        case Global.DETELE_COOPERATION_TYPE : {
          content = JSON.parse(content);
          this.sendDelCooperation_type(content);
         // this.subject.next(content);
        }

        break;

        case Global.UPDATA_COOPERATION_TYPE : {
          content = JSON.parse(content);
          console.log(content);
          //this.subject.next(content);
          this.sendUpdataCooperation_type(content)
        }
        break;

        case Global.ADD_COOPERATION_TYPE : {
          content = JSON.parse(content);
          console.log(content);
          //this.subject.next(content);
          this.sendAddCooperation_type(content);
        }
        break;

        case Global.NEGOTIATE_TYPE : {
          content = JSON.parse(content);
          this.sendQueryNegotiate_type(content);
        }
        break;

        case Global.ADD_NEGOTIATE_TYPE : {
          content = JSON.parse(content);
          console.log(content);
          //this.subject.next(content);
          this.sendAddNegotiate_type(content);
        }
        break;

        case Global.DETELE_NEGOTIATE_TYPE : {
          content = JSON.parse(content);
          this.sendDelNegotiate_type(content)
        }
        break;

        case Global.UPDATA_NEGOTIATE_TYPE : {
          content = JSON.parse(content);
          this.sendUpdataNegotiate_type(content);
        }
        break;

        case Global.PROJECT_TYPE : {
          content = JSON.parse(content);
          console.log(1);
          this.sendQueryProject_type(content);
        }
        break;

        case Global.ADD_PROJECT_TYPE : {
          content = JSON.parse(content);
          this.sendAddProject_type(content);
        }
        break;

        case Global.UPDATA_PROJECT_TYPE : {
          content = JSON.parse(content);
          this.sendUpdataProject_type(content);
        }
        break;

        case Global.DELEYTE_PROJECT_TYPE : {
          content = JSON.parse(content);
          this.sendDelProject_type(content);
        }
        break;

        case Global.MYPROJECT_LIST : {
          content = JSON.parse(content);
          this.sendMyProjectListData(content);
        }
        break;

        case Global.QUERY_LINKPRO : {
          content = JSON.parse(content);
          //this.subject.next(content);
          this.sendQueryLinkProjectData(content);
        }

        break;

        case Global.QUERY_PROJECTPEO : {
          //content = JSON.parse(content);
          //this.subject.next(content);
          this.sendQueryLinkPeoData(content);
        }

        break;

        case Global.QUERY_CITY : {
          //content = JSON.parse(content);
          //this.subject.next(content);\
          this.sendQueryCityData(content);
          this.sendQueryCity(content)
        }

        break;

        case Global.PROJECT_FILTER_TYPE : {
          content = JSON.parse(content);
          //this.subject.next(content);
          this.sendProjectFilterType(content);
        }

        break;

        case Global.LOG_MANAGE : {
          content = JSON.parse(content);
          //this.subject.next(content);
          this.sendLogManageData(content);
        }

        break;

        case Global.COUNT_ANALYSIS : {
          content = JSON.parse(content);
          //this.subject.next(content);
          this.sendCountData(content);
        }

        break;

        case Global.ORG_CHAT : {
          content = JSON.parse(content);
          //this.subject.next(content);
          this.sendOrgData(content);
        }

        break;

        case Global.STAFF_DATA : {
          content = JSON.parse(content);
          //this.subject.next(content);
          this.sendStaffData(content);
        }

        break;

        case Global.GET_ROLE : {
          content = JSON.parse(content);
          //this.subject.next(content);
          this.sendRoleData(content);
        }

        break;

        case Global.ADD_ROLE : {
          content = JSON.parse(content);
          //this.subject.next(content);
          this.sendAddRoleData(content);
        }

        break;

        case Global.DEL_ROLE : {
          content = JSON.parse(content);
          //this.subject.next(content);
          this.sendDelRoleData(content);
        }

        break;

        case Global.UPD_ROLE : {
          content = JSON.parse(content);
          //this.subject.next(content);
          this.sendUpdataRoleData(content);
        }

        break;

        case Global.GET_ALL_AUTHORITY : {
          content = JSON.parse(content);
          //this.subject.next(content);
          this.sendAllAuthorityData(content);
        }

        break;

        case Global.ADD_AUTHORITY : {
          content = JSON.parse(content);
          //this.subject.next(content);
          this.sendAddAuthorityData(content);
        }

        break;

        case Global.DEL_AUTHORITY : {
          content = JSON.parse(content);
          //this.subject.next(content);
          this.sendDelAuthorityData(content);
        }

        break;

        case Global.UPD_AUTHORITY : {
          content = JSON.parse(content);
          //this.subject.next(content);
          this.sendUpdataAuthorityData(content);
        }

        break;

        case Global.QUERY_USERDATA : {
          content = JSON.parse(content);
          //this.subject.next(content);
          this.sendUserListData(content);
        }

        break;

        case Global.FIND_OPERATION : {
          content = JSON.parse(content);
          //this.subject.next(content);
          this.sendFindOperation(content);
        }

        break;

        case Global.REVISE_AUTHORITY : {
          content = JSON.parse(content);
          //this.subject.next(content);
          this.sendReviseAuthority(content);
        }

        break;

        case Global.SET_ROLE_AUTHORITY : {
          content = JSON.parse(content);
          //this.subject.next(content);
          this.sendSetRoleAuthority(content);
        }

        break;

        //时间提醒表单数据回调
        case Global.SETTIME_REMINDER : {
          // content = JSON.parse(content);
          this.sendTimeReminderData(data);
        }

        break;

        //搜索收件人
        case Global.SELECT_EMPLOYEE : {
          content = JSON.parse(content);
          this.sendSelectEmployee(content);
        }

        break;
        //no.1 注册身份，使用itemId 这样可能进行分组广播回包信息 server
        /**
        {
              "code": "0",
              "type": "1",
              "message": "success",
              "content": {
                  "itemId": "1"
              }
          }
        */
        case Global.WEB_CLIENT_SERVICE_NAME_VISIT: {

            console.log("WEB_CLIENT_SERVICE_NAME_VISIT 执行成功...");
            if(data.message==Global.WEB_CLIENT_SERVICE_NAME_SAVE_DATA){
              this.sendSendMessage(content);
            }

        }
        break;

        //no.2 离开访问 server
        /**
        {
              "code": "0",
              "type": "1",
              "message": "success",
              "content": {
                  "itemId": "1"
              }
          }
        */
        case Global.WEB_CLIENT_SERVICE_NAME_EXIT: {

          console.log("WEB_CLIENT_SERVICE_NAME_EXIT 执行成功...");

        }
        break;

        //no.3 关闭连接 server
        /**
        {
              "code": "0",
              "type": "1",
              "message": "success",
              "content": {
                  "itemId": "1"
              }
          }
        */
        case Global.WEB_CLIENT_SERVICE_NAME_CLOSE: {
          
        }
        break;

        // no.4.0 保存一条纯文本信息 server
        /**
        {
              "code": "0",
              "type": "1",
              "message": "success",
              "content": {
                  "itemId": "1",
                  "userId": "1",
                  "accountUuid" : "akasdfklasfdkljasfjasfdkljafsd",
                  "type": "1",
                  "date" : "2018-01-21 10:30:30",
                  "message": "aaklsfakl;sfad;kldsafk;lasf;klafk;lasf"
              }
          }
        */
        case Global.WEB_CLIENT_SERVICE_NAME_SAVE_DATA: {
          this.sendSendMessage(content);
            // 解包后的date 和 message 可以刷到跟进主页，消息是广播的，其它关注人或跟进人 在线的话同时可以刷到
        }
        break;

        //no.5 返回数据列表 server
        /**
        {
              "code": "0",
              "type": "1",
              "message": "success",
              "content": [{
                  "itemId": "1",
                  "userId": "1",
                  "accountUuid" : "akasdfklasfdkljasfjasfdkljafsd",
                  "type": "2",
                  "date" : "2018-01-21 10:30:30",
                  "message": "c:\xxxx\xxxx\xxxx.xxx"
              },
              {
                  "itemId": "1",
                  "userId": "2",
                  "accountUuid" : "akasdfklasfdkljasfjasfdkljafsd",
                  "type": "2",
                  "date" : "2018-01-21 10:30:30",
                  "message": "c:\xxxx\xxxx\xxxx.xxx"
              },
              {
                  "itemId": "1",
                  "userId": "3",
                  "accountUuid" : "akasdfklasfdkljasfjasfdkljafsd",
                  "type": "2",
                  "date" : "2018-01-21 10:30:30",
                  "message": "c:\xxxx\xxxx\xxxx.xxx"
              }]
          }
        */
        case Global.WEB_CLIENT_SERVICE_NAME_GET_DATA_LIST: {
          this.sendGetDataList(content);
        }
        break;

        //获取用户头像
        case Global.GET_HEADIMAGE: {
          // content= JSON.parse(content);
          //this.subject.next(content);
          this.sendGetHeadImage(content);
        }
        break;
        
        //注销登录用户
        case Global.GET_LOGOUT: {
          console.log(data);
          this.router.navigate(['/login']);
        }
        break;
        
        //跟进状态切换
        case Global.DO_NEXTSTATUS: {
          console.log(data);
          this.sendDoNextStatus(content);
        }
        break;

        //获取项目进度名称
        case Global.GET_STAGES: {
          console.log(data);
          this.sendGetStatus(content);
        }
        break;

         //获取管理组织架构
        case Global.SERVICE_NAME_GETORGSTRUCTURE: {
          console.log(data);
          this.sendGetOrgStructure(content);
        }
        break;

        default :
        {
                console.log('----接口填写错误-----');
        }

        break;
        }
                console.log('----end-----');
}



        getData(){
                return this.subject.asObservable();
        }

        sendLoginData(data){
          this.login.next(data);
        }

        sendQueryLinkPeoData(data){
          this.queryLinkPeo.next(data)
        }

        sendQueryLinkProjectData(data){
          this.queryLinkProject.next(data)
        }

        sendQueryCityData(data){
          this.queryCity.next(data)
        }

        sendQueryCity(data){
          this.queryCitydata.next(data)
        }

        sendProjectFilterType(data){
          this.queryProjectFilterType.next(data)
        }

        sendQueryCooperation_type(data){
          this.queryCooperation_type.next(data);
        }
        sendUpdataCooperation_type(data){
          this.updataCooperation_type.next(data);
        }
        sendDelCooperation_type(data){
          this.delCooperation_type.next(data);
        }
        sendAddCooperation_type(data){
          this.addCooperation_type.next(data);
        }


        sendQueryNegotiate_type(data){
          this.queryNegotiate_type.next(data);
        }
        sendUpdataNegotiate_type(data){
          this.updataNegotiate_type.next(data);
        }
        sendDelNegotiate_type(data){
          this.delNegotiate_type.next(data);
        }
        sendAddNegotiate_type(data){
          this.addNegotiate_type.next(data);
        }


        sendQueryProject_type(data){
          this.queryProject_type.next(data);
        }
        sendUpdataProject_type(data){
          this.updataProject_type.next(data);
        }
        sendDelProject_type(data){
          this.delProject_type.next(data);
        }
        sendAddProject_type(data){
          this.addProject_type.next(data);
        }

        sendMyProjectListData(data){
          this.myProjectListData.next(data);
        }

        sendLogManageData(data){
          this.logManageData.next(data);
        }

        sendCountData(data){
          this.countData.next(data);
        }

        sendOrgData(data){
          this.orgData.next(data);
        }

        sendStaffData(data){
          this.staffData.next(data);
        }

        sendRoleData(data){
          this.roleData.next(data);
        }
        sendAddRoleData(data){
          this.addRole.next(data);
        }
        sendDelRoleData(data){
          this.delRole.next(data);
        }
        sendUpdataRoleData(data){
          this.updataRole.next(data)
        }

        sendAllAuthorityData(data){
          this.allAuthorityData.next(data);
        }
        sendAddAuthorityData(data){
          this.addAuthority.next(data);
        }
        sendDelAuthorityData(data){
          this.delAuthority.next(data);
        }
        sendUpdataAuthorityData(data){
          this.updataAuthority.next(data);
        }

        sendUserListData(data){
          this.userListData.next(data);
        }

        sendFindOperation(data){
          this.findOperation.next(data);
        }

        sendReviseAuthority(data){
          this.reviseAuthority.next(data);
        }

        sendSetRoleAuthority(data){
          this.setRoleAuthority.next(data);
        }

        //时间提醒
        sendTimeReminderData(data){
          this.setTimeReminderData.next(data);
        }

        //搜索收件人
        sendSelectEmployee(data){
          this.setSelectEmployee.next(data);
        }

        // 发送消息
        sendSendMessage(data){
          this.setSendMessage.next(data);
        }
        
        //获取头像
        sendGetHeadImage(data){
          this.getHeadImage.next(data);
        }

        //跟进状态切换
        sendDoNextStatus(data){
          this.doNextStatus.next(data);
        }

        //获取项目进度名称
        sendGetStatus(data){
          this.doGetStatus.next(data);
        }

        //获取历史信息
        sendGetDataList(data){
          this.doGetDataList.next(data);
        }

        //获取管理组织架构
        sendGetOrgStructure(data){
          this.doGetOrgStructure.next(data);
        }

}


