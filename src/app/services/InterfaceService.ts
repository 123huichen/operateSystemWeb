/**
 * Created by zhao on 2017/1/16.
 * 接口
 */

import {ReflectiveInjector, Inject, Injectable, forwardRef} from "@angular/core";

import { DatePipe } from '@angular/common';

import {Global} from './Global';

import {Protocol} from './Protocol';

import {WebClient} from './WebClient';

import {HttpService} from './HttpService';

import {StorageService} from './StorageService';

@Injectable()
export class InterfaceService {

    constructor(private datePipe : DatePipe, private  httpService : HttpService, private storageService : StorageService, private protocol : Protocol, private webClient : WebClient) {

  }

    //登陆
    public doLogin(username, password){
      let loginData = [
        {'key' : 'username',
          'value' : username
        },
       {
        'key' : 'password',
        'value' : password
       }
      ];

      this.httpService.doGetRequest(Global.SERVICE_NAME_LOGIN, loginData);
    }

    //表单提交
    public doAddProject(userId, userName, itemUnmarked, itemCooperation, itemName, flag, itemAddress, province, city, district, itemaArea, itemJoinArea, secretLairs, itemAttention, projectPeoName, itemRelevancy, relevanceItemName, itemExplain, orgUuid) {

      let data : any = [{
        'key' : 'userId',
        'value' : userId
      },{
        'key' : 'userName',
        'value' : userName
      },{
        'key' : 'itemUnmarked',
        'value' : itemUnmarked
      },{
        'key' : 'itemCooperation',
        'value' : itemCooperation
      },{
        'key' : 'itemName',
        'value' : itemName
      },{
        'key' : 'flag',
        'value' : flag
      },{
        'key' : 'itemAddress',
        'value' : itemAddress
      },{
        'key' : 'province',
        'value' : province
      },{
        'key' : 'city',
        'value' : city
      },{
        'key' : 'district',
        'value' : district
      },{
        'key' : 'itemaArea',
        'value' : itemaArea
      },{
        'key' : 'itemJoinArea',
        'value' : itemJoinArea
      },{
        'key' : 'secretLairs',
        'value' : secretLairs
      },{
        'key' : 'itemAttention',
        'value' : itemAttention
      },{
        'key' : 'projectPeoName',
        'value' : projectPeoName
      },{
        'key' : 'itemRelevancy',
        'value' : itemRelevancy
      },{
        'key' : 'relevanceItemName',
        'value' : relevanceItemName
      },{
        'key' : 'itemExplain',
        'value' : itemExplain
      },{
        'key' : 'orgUuid',
        'value' : orgUuid
      }];

      this.httpService.doGetRequest(Global.SERVICE_NAME_ADD_ITEM, data);

    }
    // public doAddProject(Body){
    //   this.httpService.doPostRequest(Global.SERVICE_NAME_ADD_ITEM)
    // }

    // public doAddProject(data){
    //   this.httpService.doPostRequest(Global.SERVICE_NAME_ADD_ITEM, data);
    // }

    public doGetItemList() {

     let accountUuid : string = this.storageService.getValue(Global.USER_ACCOUNTID_KEY);

      let data : any = [
        {
          "key" : Global.USER_ACCOUNTID_KEY,
          "value" : accountUuid
        }
      ];

      this.httpService.doGetRequest(Global.SERVICE_NAME_ITEM_LIST, data);
    }

    public doAddCooperationType(name, comment){
      let data = [{
        'key' : 'name',
        'value' : name
      },{
        'key' : 'comment',
        'value' : comment
      }];
      this.httpService.doGetRequest(Global.ADD_COOPERATION_TYPE, data);
    }
    public doUpdataCooperationType(id, name, comment){
      let data = [{
        'key' : 'id',
        'value' : id
      },{
        'key' : 'name',
        'value' : name
      },{
        'key' : 'comment',
        'value' : comment
      }];
      this.httpService.doGetRequest(Global.UPDATA_COOPERATION_TYPE,data);
    }
    public doDelCooperationType(id){
      let data = [{
        'key' : 'id',
        'value' : id
      }];
      this.httpService.doGetRequest(Global.DETELE_COOPERATION_TYPE,data);
    }
    public doQueryCooperationType(){
      let data = [];
      this.httpService.doGetRequest(Global.COOPERATION_TYPE,data);
    }

    public doAddProjectType(projectType_name,projectType_Comment){
      let data = [{
        'key' : 'projectType_name',
        'value' : projectType_name
      },{
        'key' : 'projectType_Comment',
        'value' : projectType_Comment
      }];
      this.httpService.doGetRequest(Global.ADD_PROJECT_TYPE,data);
    }
    public doUpdataProjectType(projectType_id,projectType_name,projectType_Comment){
      let data = [{
        'key' : 'projectType_id',
        'value' : projectType_id
      },{
        'key' : 'projectType_name',
        'value' : projectType_name
      },{
        'key' : 'projectType_Comment',
        'value' : projectType_Comment
      }];
      this.httpService.doGetRequest(Global.UPDATA_PROJECT_TYPE,data);
    }
    public doDelProjectType(projectType_id){
      let data = [{
        'key' : 'projectType_id',
        'value' : projectType_id
      }];
      this.httpService.doGetRequest(Global.DELEYTE_PROJECT_TYPE,data);
    }
    public doQueryProjectType(){
      let data = [];
      this.httpService.doGetRequest(Global.PROJECT_TYPE,data);
    }

    public doAddNegotiateType(conversationTitle,conversationComment){
      let data = [{
        'key' : 'conversationTitle',
        'value' : conversationTitle
      },{
        'key' : 'conversationComment',
        'value' : conversationComment
      }];
      this.httpService.doGetRequest(Global.ADD_NEGOTIATE_TYPE,data);
    }
    public doUpdataNegotiateType(conversationId,conversationTitle,conversationComment){
      let data = [{
        'key' : 'conversationId',
        'value' : conversationId
      },{
        'key' : 'conversationTitle',
        'value' : conversationTitle
      },{
        'key' : 'conversationComment',
        'value' : conversationComment
      }];
      this.httpService.doGetRequest(Global.UPDATA_NEGOTIATE_TYPE,data);
    }
    public doDelNegotiateType(conversationId){
      let data = [{
        'key' : 'conversationId',
        'value' : conversationId
      }];
      this.httpService.doGetRequest(Global.DETELE_NEGOTIATE_TYPE,data);
    }
    public doQueryNegotiateType(){
      let data = [];
      this.httpService.doGetRequest(Global.NEGOTIATE_TYPE,data);
    }

    public doQueryMyprojectList(userId,start,context,itemProgress,itemUnmarked){
      let data = [{
        'key' : 'userId',
        'value' : userId
      },{
        'key' : 'start',
        'value' : start
      },{
        'key' : 'context',
        'value' : context
      },{
        'key' : 'itemProgress',
        'value' : itemProgress
      },{
        'key' : 'itemUnmarked',
        'value' : itemUnmarked
      }];
      this.httpService.doGetRequest(Global.MYPROJECT_LIST,data);
    }

    //关联项目查询接口
    public doQueryLinkPro(itemName){
      let data = [{
        'key' : 'itemName',
        'value' : itemName
      }]
      this.httpService.doGetRequest(Global.QUERY_LINKPRO,data);
    }

    //关注人查询接口
    public doQueryProjectPeo(accountUuid,skey){
      let data = [{
        'key' : 'accountUuid',
        'value' : accountUuid
      },{
        'key' : 'skey',
        'value' : skey
      }]
      this.httpService.doGetRequest(Global.QUERY_PROJECTPEO,data);
    }

    //省市区查询接口
    public doQueryCity(accountUuid,pid){
      let data = [{
        'key' : 'accountUuid',
        'value' : accountUuid
      },{
        'key' : 'pid',
        'value' : pid
      }]
      this.httpService.doGetRequest(Global.QUERY_CITY,data);
    }

    //我的项目过滤查询
    public doProjectFilterType(){
      let data = [];
      this.httpService.doGetRequest(Global.PROJECT_FILTER_TYPE,data);
    }

    //日志查询
    public doQueryLog(userName,start){
      let data = [{
        'key' : 'userName',
        'value' : userName
      },{
        'key' : 'start',
        'value' : start
      }];
      this.httpService.doGetRequest(Global.LOG_MANAGE,data);
    }

    //统计分析
    public doCountData(userId,itemUnmarked){
      let data = [{
        'key' : 'userName',
        'value' : userId
      },{
        'key' : 'start',
        'value' : itemUnmarked
      }];
      this.httpService.doGetRequest(Global.COUNT_ANALYSIS,data);
    }

    //获取管理组织架构
    public doOrgChat(accountUuid,orgUuid){
      let data = [{
        'key' : 'accountUuid',
        'value' : accountUuid
      },{
        'key' : 'orgUuid',
        'value' : orgUuid
      }];
      this.httpService.doGetRequest(Global.ORG_CHAT,data);
    }

    //获取组织架构员工信息
    public doStaffData(accountUuid,orgUuid){
      let data = [{
        'key' : 'accountUuid',
        'value' : accountUuid
      },{
        'key' : 'orgUuid',
        'value' : orgUuid
      }];
      this.httpService.doGetRequest(Global.STAFF_DATA,data);
    }

    //获取管理员角色
    public doRoleData(){
      let data = [];
      this.httpService.doGetRequest(Global.GET_ROLE,data);
    }

    //新增管理员角色
    public doAddRole(role_name){
      let data = [{
        'key' : 'role_name',
        'value' : role_name
      }];
      this.httpService.doGetRequest(Global.ADD_ROLE,data);
    }

    public doDelRole(role_id){
      let data = [{
        'key' : 'role_id',
        'value' : role_id
      }];
      this.httpService.doGetRequest(Global.DEL_ROLE,data);
    }

    public doUpdataRole(role_id,role_name){
      let data = [{
        'key' : 'role_id',
        'value' : role_id
      },{
        'key' : 'role_name',
        'value' : role_name
      }];
      this.httpService.doGetRequest(Global.UPD_ROLE,data);
    }

    //新增管理员权限操作
    public doAddAuthority(operate){
      let data = [{
        'key' : 'operate',
        'value' : operate
      }];
      this.httpService.doGetRequest(Global.ADD_AUTHORITY,data);
    }

    //获取管理员权限操作
    public doAllAuthorityData(){
      let data = [];
      this.httpService.doGetRequest(Global.GET_ALL_AUTHORITY,data);
    }

    public doDelAuthority(authority_id){
      let data = [{
        'key' : 'authority_id',
        'value' : authority_id
      }];
      this.httpService.doGetRequest(Global.DEL_AUTHORITY,data)
    }

    public doUpdataAuthority(authority_id,operate){
      let data = [{
        'value' : authority_id
      },{
        'key' : 'operate',
        'value' : operate
      }];
      this.httpService.doGetRequest(Global.UPD_AUTHORITY,data);
    }

    //发送添加的用户权限
    public doAddUserAuthorith(users){

      let enUsers = encodeURI(users);

      let data = [{
        'key' : 'users',
        'value' : enUsers
      }];

      this.httpService.doGetRequest(Global.ADD_USER_AUTHORITY, data);
    }

    //获取导入过来的用户列表
    public doQueryUserData(corpId){
      let data = [{
        'key' : 'corpId',
        'value' : corpId
      }];
      this.httpService.doGetRequest(Global.QUERY_USERDATA,data);
    }

    //设置时间提醒
    public doSetTimeReminder(accountUuid, id, oaList, time, body){
      let data = [{
        'key' : 'accountUuid',
        'value' :accountUuid
      },{
        'key' : 'id',
        'value' : id
      },{
        'key' : 'oaList',
        'value' : oaList
      },{
        'key' : 'days',
        'value' : 0
      },{
        'key' : 'time',
        'value' : time
      },{
        'key' : 'body',
        'value' : body
      }];
      this.httpService.doGetRequest(Global.SETTIME_REMINDER,data);
      // this.httpService.doGetRequest(Global.SETTIME_REMINDER,data);
    }

    //搜索收件人
    public doSelectEmployee(accountUuid,keyword){
      let data = [{
        'key' : 'accountUuid',
        'value' : accountUuid
      },{
        'key' : 'keyword',
        'value' : keyword
      }];
      this.httpService.doGetRequest(Global.SELECT_EMPLOYEE, data);
    }

    //获取功能模块下增、删、改、查、操作
    public doFindOperationData(){
      let data = [];
      this.httpService.doGetRequest(Global.FIND_OPERATION, data);
    }

    //设置用户角色
    public doReviseAuthorityData(users){

      let enUsers = encodeURI(users);

      let data = [{
        'key' : 'users',
        'value' : enUsers
      }];

      this.httpService.doGetRequest(Global.REVISE_AUTHORITY, data);
    }

    //设置角色功能模块权限
    public doSetRoleAuthority(roles){
      let data = [{
        'key' : 'roles',
        'value' : roles
      }];
      this.httpService.doGetRequest(Global.SET_ROLE_AUTHORITY,data);
    }

    //////////////////////////////////Websocket接口////////////////////////////

    // no.1 注册身份，使用itemId 这样可能进行分组广播回包信息   client
    /**
    {
    "code": "0",
    "type": "1",
    "message": "visit",
    "content": {
        "itemId": "1"
     }
    */
    // 每次展开一个项目时调用 doInner 传项目id, 注册一次访问
    public doVisit(itemId : string) : void {

      let name : any = Global.WEB_CLIENT_SERVICE_NAME_VISIT;

      let protocol =  this.protocol.getProtocol(Global.SUCCESS, name, false, itemId);

      // 在PUSHSERVICE 处理包数据刷新或转场
      this.webClient.doSend(protocol, name);
    }

    //no.2 离开访问  client
    /**
    {
          "code": "0",
          "type": "1",
          "message": "exit",
          "content": {
              "itemId": "1"
          }
      }
    */
    // 每次合并一个项目时调用 doExit 传项目id 移除一次访问
    public doExit(itemId : string) : void {

      let name : any = Global.WEB_CLIENT_SERVICE_NAME_EXIT;

      let protocol =  this.protocol.getProtocol(Global.SUCCESS, name, false, itemId);

      // 在PUSHSERVICE 处理包数据刷新或转场
      this.webClient.doSend(protocol, name);
    }

    //no.3 关闭连接  client
    /**
    {
          "code": "0",
          "type": "1",
          "message": "close",
          "content": {

          }
      }
    */
    public doClose() : void {

      let name : any = Global.WEB_CLIENT_SERVICE_NAME_CLOSE;

      let protocol =  this.protocol.getProtocol(Global.SUCCESS, name, false, "");

      // 在PUSHSERVICE 处理包数据刷新或转场
      this.webClient.doSend(protocol, name);
    }




    // no.4.0 保存一条信息 client
    /**
     {
          "code": "0",
          "type": "1",
          "message": "saveData",
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

    //no.4.1 保存一条非文本信息 如果图片、文件只传路径即可以 server
    /**
    {
          "code": "0",
          "type": "1",
          "message": "success",
          "content": {
              "itemId": "1",
              "userId": "1",
              "accountUuid" : "akasdfklasfdkljasfjasfdkljafsd",
              "type": "2",
              "date" : "2018-01-21 10:30:30",
              "message": "htt://xxx.xxxx.xxx.xxx/xxxx/xxxx/xxxx.xxx"
          }
      }
    */
    public doSaveData(itemId : string, userId : string, accountUuid : string, type : string, date : any, stage : any, message : string , fileName : string) : void {

      let name : any = Global.WEB_CLIENT_SERVICE_NAME_SAVE_DATA;

      let data : any = {
          "itemId" : itemId,
          "userId" : userId,
          "type" : type,
          "accountUuid" : accountUuid,
          "date" : date,
          "message" : message,
          "fileName" : fileName,
          "stage" : stage
      };

      // let content = JSON.stringify(data);

      let protocol =  this.protocol.getProtocol(Global.SUCCESS, name, false, data);

      // 在PUSHSERVICE 处理包数据刷新或转场
      this.webClient.doSend(protocol, name);
    }

    // 发送一条文字信息
    public sendText(itemId : string, userId : string, accountUuid : string, message : string, stage : any) {

      let date = new Date();
      let dateString : string = this.datePipe.transform(date, "yyyy-MM-dd HH:mm:ss");

      this.doSaveData(itemId, userId, accountUuid, "1", dateString, stage, message,"");
    }

    // 发送一个文件
    public sendFile(itemId : string, userId : string, accountUuid : string, filePath : string, fileName : string, stage : any) {

      let date = new Date();
      let dateString : string = this.datePipe.transform(date, "yyyy-MM-dd HH:mm:ss");

      this.doSaveData(itemId, userId, accountUuid, "2", dateString, stage, filePath, fileName);
    }

    //no.5 返回数据列表 client
    /**
    {
          "code": "0",
          "type": "1",
          "message": "getDataList",
          "content": {
              "itemId": "1",					// 不能为空
              "date" : "",						// 可以为空
              "search":""						// 可以为空
          }
      }
    */
    public doGetDataList(itemId : string, stage : string, accountUuid : string,pageIndex : number) {

      let name : any = Global.WEB_CLIENT_SERVICE_NAME_GET_DATA_LIST;
      let data : any = {
        "itemId" : itemId,
        "accountUuid" : accountUuid,
        "stage" : stage,
        "pageIndex" : pageIndex,
      };
      let protocol =  this.protocol.getProtocol(Global.SUCCESS, name, false, data);

      // 在PUSHSERVICE 处理包数据刷新或转场
      this.webClient.doSend(protocol, name);
    }

    //注销
    public doLogOut(accountUuid){
      let data = [{
        'key' : 'accountUuid',
        'value' : accountUuid
      }];
      this.httpService.doGetRequest(Global.GET_LOGOUT,data);
    }

    /**
     * 获取用户头像
     * accountUuid 用户身份标识
     * oaName OA帐号
     */
    public doGetHeadImage(accountUuid, oaName) {
      let data = [{
        'key' : 'accountUuid',
        'value' : accountUuid
      },{
        'key' : 'oaName',
        'value' : oaName
      }];
      this.httpService.doGetRequest(Global.GET_HEADIMAGE,data);
    }

    /**
     * 跟进状态切换
     * accountUuid 用户身份标识
     * itemId 项目Id
     * itemProgressId 项目阶段Id
     */
    public doNextStatus(accountUuid, itemId, itemProgressId) {
      let data = [{
        'key' : 'accountUuid',
        'value' : accountUuid
      },{
        'key' : 'itemId',
        'value' : itemId
      },{
        'key' : 'itemProgressId',
        'value' : itemProgressId
      }];
      this.httpService.doGetRequest(Global.DO_NEXTSTATUS,data);
    }

    /** 
     * 获取项目ID
    */
    public getStages(){
      let data = [];
      this.httpService.doGetRequest(Global.GET_STAGES,data);
    }

    /**
     * getOrgStructure
     * 获取管理组织架构
     */
    public getOrgStructure(accountUuid,orgUuid){
      let data = [{
        'key':'accountUuid',
        'value':accountUuid
      },{
        'key':'orgUuid',
        'value':orgUuid
      }];
      this.httpService.doGetRequest(Global.SERVICE_NAME_GETORGSTRUCTURE,data);
    }
}


