import { Component , Inject, forwardRef, OnInit, ComponentFactory, ComponentRef, ComponentFactoryResolver, ViewChild, ViewContainerRef, transition, Pipe } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router,  ActivatedRoute, Params} from '@angular/router';

import { PushService } from '../services/PushService';
import { InterfaceService } from '../services/InterfaceService';
import { StorageService } from '../services/StorageService';
import { Global } from '../services/Global';

import { WebClient } from '../services/WebClient';
import { DomSanitizer } from '@angular/platform-browser'

import { ToolMenuComponent } from '../public-component/tool-menu/tool-menu.component';
import { isNull } from 'util';
import { concat } from 'rxjs/operators/concat';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { connectableObservableDescriptor } from 'rxjs/observable/ConnectableObservable';


let self : any;

@Component({
  selector: 'app-myproject',
  templateUrl: './myproject.component.html',
  styleUrls: ['./myproject.component.css']
})
export class MyprojectComponent implements OnInit { 
  @ViewChild('toolmenu' ,{read : ViewContainerRef}) Tool : ViewContainerRef
  private data : any = null;
  public selectIndex : number;
  public toolIndex : number;//控制工具的显示
  public pageContent : any = {};//分页内容
  public fuzzy : string; //关键字搜索的值
  public ifshow : boolean = false;//控制工具的显示
  public filterData : any;//过滤类型数据
  public sendInfo : any;//发送的数据
  public ifshowFollowUp : boolean = false;//跟进工具栏显示
  public toolIndexFollowUp : number;//跟进工具栏显示
  public remindTime : Date ;//提醒时间
  public timer;//定时器
  public reminderTimeEmail ;//时间提醒邮箱
  public reminderTimeDate;//时间提醒提醒时间
  public reminderTimeEmailInfo;//时间提醒提醒内容
  public submitted : boolean = true;//时间提醒表单提交
  public blockRecipients : boolean = false;//收件人或者收件人列表
  public listRecipientsData : any = [];//收件人数据列表
  public messageListSelf : any = [] ;//已发消息集合
  public messageList : any = [];//他人的消息

  
  public newsDataList : any =[];//发送消息集合
  public pubcliAccountUuid ;//全局的accountUuid
  public pubcliItemId ;//全局的itemId
  public publicStage ;//全局stage
  public getDataListChanges;//获取数据 订阅取消
  public publicPageindex : number = 1;//全局页码 请求历史消息
  public publicImg;//全部图片 实现图片预览
  public statusChanges = null;//取消订阅临时接受字段

  public emailstatusChanges;//时间提醒订阅取消
  public unsDonextStatus;//跟进状态切换订阅取消
  public OAdataList : boolean = false;//收件人列表结构块
  public tempAccountUuid; //操作的accountUuid
  public tempItemId ; //操作的itemId
  public projectListdata : any;//项目列表数据
  public filter ;//过滤数据
  public componentRef : ComponentRef<ToolMenuComponent>
  private iconPath : string = '../../assets/image/touxiang.jpg';
  private errorImg : string = '../../assets/image/touxiang.jpg';
  private filePDF : string = '../../assets/image/fileBlock.png';
  private fileTxt : string = '../../assets/image/fileTxt.png';
  private fileWar : string = '../../assets/image/fileWar.png';
  private fileDocx : string = '../../assets/image/fileDocx.png';
  private fileXlsx : string = '../../assets/image/fileXlsx.jpg';
  public projectDate : any = {accountUuid:'', itemId:'', itemProgressId:''};//跟进状态切换数据
  public informationVisit : any = {firstVisit:'',alignVisit:'',threeVisit:'',fulfilVisit:''};//拜访信息
  constructor( private interfaceService : InterfaceService, public webClient : WebClient, public datePipe : DatePipe, public domSanitizer:DomSanitizer,
    @Inject (forwardRef (() => PushService)) public pushService: PushService, private storageService : StorageService, private comFacRef : ComponentFactoryResolver) {

        //this.pushService.myProjectEvent$.subscribe(data => this.showData(data));

        // 这里获取路由参数
        //this.data = this.routerInfo.queryParams['data'];

  //   // 拿到数据进行刷新
  //   this.updateData(this.data);
      self = this;
      this.pubcliAccountUuid = this.storageService.getValue(Global.USER_ACCOUNTID_KEY);
  }

  ngOnInit() {
    this.doMyprojectList();
    // this.getFilterData();
    this.initWebSocket();
    this.getStasus();
    // this.timer = setInterval(()=>{
    //   this.getNewDate()//检测变化
    // },1000);
    // this.createDB();
  }

  /**
   * 首次进来初始化webSocket
   * initWebSocket
   */
  public initWebSocket() {
    this.webClient.doConnectToServer();
  }

  /** 
   * 获取跟进项目列表
   * doMyprojectList
  */
  doMyprojectList(){
    this.interfaceService.doQueryMyprojectList(this.storageService.getValue(Global.USER_ACCOUNTID_KEY), 1, null,null,1);
    this.pushService.myProjectListData$.subscribe((data) => {
      if (data != null) {
        //"{pageSize:20,totalNum:100,curPage:1,totalPage:2}"
        console.log(data);
        this.projectListdata = data.list;
        this.pageContent.pageSize = data.pageSize;
        this.pageContent.totalNum = data.totalRecord;
        this.pageContent.curPage = data.currentPage;
        this.pageContent.totalPage = data.totalPage
        console.log(this.projectListdata);
      }
    })
  }


  getIndex(index){
    this.selectIndex = index;
    console.log(index);
    console.log(this.selectIndex);
  }

  //获取过滤的数据
  getFilterData(){
    this.interfaceService.doQueryNegotiateType();
    this.pushService.queryNegotiate_type$.subscribe((data)=>{
      this.filterData = data;
      console.log("获取数据");
      console.log(this.filterData)
    })
  }

  //点击分页按钮加载当前页码数据
  getPageData($event){
    console.log($event);
    this.interfaceService.doQueryMyprojectList(this.storageService.getValue(Global.USER_ACCOUNTID_KEY),$event,null,null,1);
  }

  //搜索查询
  searchCode(val){
    this.interfaceService.doQueryMyprojectList(this.storageService.getValue(Global.USER_ACCOUNTID_KEY),1,val,null,1);
  }

  filterSearch(val){
    this.interfaceService.doQueryMyprojectList(this.storageService.getValue(Global.USER_ACCOUNTID_KEY),1,null,val,1);
  }
  //工具菜单的显示
  clickToolMenu(i){
    if(this.ifshow){
      this.toolIndex = -1;
      this.ifshow = false;
    }else{
      this.toolIndex = i;
      this.ifshow = true;
    }
  }

  /**
   * 发送消息
   * messageSend
   */
 public messageSend (itemId, userId,eventObj,stage) {
   let accountUuid = this.storageService.getValue(Global.USER_ACCOUNTID_KEY);
    let sendInfo = eventObj.toElement.parentNode.parentElement.children[0].innerText;//发送的文本字段
    eventObj.toElement.parentNode.parentElement.children[0].innerText = '';//文本清空
    if(sendInfo==undefined||sendInfo==''||sendInfo==null){
      return;
    }
    this.interfaceService.sendText(itemId, userId, accountUuid, sendInfo ,stage);    
  }

  /**
   * 跟进结构块展示
   * upFollow
   */
  public upFollow (accountUuid,itemId,event,i,stage) {
    this.pubcliItemId = itemId;
    this.tempAccountUuid = accountUuid;
    this.tempItemId = itemId;
    this.publicStage = stage;
    if(this.ifshowFollowUp){
      this.ifshowFollowUp = false;
      this.toolIndexFollowUp = -1;
      this.interfaceService.doExit(itemId);
      console.log("执行doExit"+itemId);
    } else {
      this.ifshowFollowUp = true;
      this.toolIndexFollowUp = i;
      this.interfaceService.doVisit(itemId);
      console.log("执行doVisit"+itemId);
      if(this.statusChanges==null){
        this.getMessage();
        console.log("执行订阅");        
      }
      // this.showUser(accountUuid,itemId,stage);
      // this.pushService.doGetDataList$.subscribe((data) => {
      //   console.log("执行visit后的效果"+data);
      //   this.interfaceService.doGetDataList(itemId,stage,accountUuid);
      // });
    }
  }


  /**
   * 获取当前时间
   * getNewDate
   */
  public getNewDate() {
    this.remindTime = new Date();
  }

  /**
   * 时间提醒弹框
   * reminderTime
   */
  public reminderTime () {
    this.submitted = false;
    this.OAdataList = false;
    this.blockRecipients = false;
  }

  /**
   * 时间提醒弹框取消
   * reminderTimeHide
   */
  public reminderTimeHide() {
    this.submitted = true;
    this.reminderTimeDate = '';
  }

  /**
   * 时间提醒表单提交
   * onSubmit
   */
  public onSubmit() {
    this.submitted = true;
    this.reminderTimeDate = this.datePipe.transform(this.reminderTimeDate,'yyyy-MM-dd HH:mm:ss');
    console.log("这个时间数据是否合理"+this.reminderTimeDate);
    if(this.tempAccountUuid==undefined||this.tempAccountUuid==null||this.tempAccountUuid==''||this.tempItemId==undefined||this.tempItemId==null||this.tempItemId==''){
      return;
    }
    let tempEmailList = encodeURI(this.reminderTimeEmail);
    this.interfaceService.doSetTimeReminder(this.tempAccountUuid,this.tempItemId, tempEmailList, this.reminderTimeDate, this.reminderTimeEmailInfo);
    this.emailstatusChanges = this.pushService.setTimeReminderData$.subscribe((data) => {
      if (data != null) {
        console.log(data);
      }
      this.emailstatusChanges.unsubscribe();
      this.reminderTimeDate = '';
    });
  }

  /**
   * 搜索OA收件人
   * OAsearchFor
   */
  public OAsearchFor(oaList) {
    if(oaList.value==null||oaList.value==''||oaList.value==undefined){
      console.log("空数据");
      return;
    }
    this.interfaceService.doSelectEmployee(this.storageService.getValue(Global.USER_ACCOUNTID_KEY),oaList.value);
    this.pushService.setSelectEmployee$.subscribe((data) => {
      if (data != null) {
        console.log(data);
        this.listRecipientsData = data;
        this.OAdataList = true;
      }
    });
  }

  /**
   * 选中收件人
   */
  public recipientsChecked(oaList) {
    if(this.reminderTimeEmail!=null||this.reminderTimeEmail!=undefined||this.reminderTimeEmail!=""){
      this.blockRecipients = true;
    }
    console.log("输出收件人"+this.reminderTimeEmail);
  }
  
/**
 * getFilePath
 * 判断是否有文件数据改变
 * itemId 项目Id
 * userId 用户ID
 */
  public getFilePath(itemId,userId,event,stage){  
    let accountUuid = this.storageService.getValue(Global.USER_ACCOUNTID_KEY);
    let file = event.target.files[0];
    let fileName = file.name;//文件名readAsBinaryString
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(event){
      self.interfaceService.sendFile(itemId, userId, accountUuid, this.result, fileName, stage);
    }
    event.target.value = '';
  };  

  /**
   * doNextStatus
   * 跟进状态切换
   * accountUuid 用户Id
   * itemId 项目Id
   * itemProgressId 项目状态Id
   */
  public doNextStatus() {
    let accountUuid = this.storageService.getValue(Global.USER_ACCOUNTID_KEY);
    let itemId = this.projectDate.itemId;
    let itemProgressId = this.projectDate.itemProgressId;
   
    if(accountUuid==''||accountUuid==null||accountUuid==undefined){
      return;
    }
    if(itemId==''||itemId==null||itemId==undefined){
      return;
    }
    if(itemProgressId==''||itemProgressId==null||itemProgressId==undefined){
      return;
    }
    this.interfaceService.doNextStatus(accountUuid, itemId, itemProgressId);
    this.unsDonextStatus = this.pushService.doNextStatus$.subscribe((data) => {
      self.pubcliAccountUuid = accountUuid;
      self.publicStage = itemId;
      if (data != null) {
        console.log("跟进状态切换返回的"+data);
      }
      this.doMyprojectList();
      this.unsDonextStatus.unsubscribe();
    });
  }

  /**
   * getProjectDate
   * 获取项目的信息
   * accountUuid 用户Id
   * itemId 项目Id
   * itemProgressId 项目状态Id
   */
  public getProjectDate(accountUuid, itemId, itemProgressId) {
    this.projectDate.accountUuid = accountUuid;
    this.projectDate.itemId = itemId;
    this.projectDate.itemProgressId = itemProgressId;
  }

  /**
   * getStasus
   * 获得项目字段
   */
  public getStasus() {
    this.interfaceService.getStages();
    this.pushService.doGetStatus$.subscribe((data) => {
      if (data != null) {
        console.log(data);
        let tempDate = JSON.parse(data);
        this.filterData = tempDate;
        this.informationVisit.firstVisit = tempDate[0].progressName;
        this.informationVisit.alignVisit = tempDate[1].progressName;
        this.informationVisit.threeVisit = tempDate[2].progressName;
        this.informationVisit.fulfilVisit = tempDate[3].progressName;
      }
    });
  }

/** 
 * 获取所有的数据
*/
  public indexDB = window.indexedDB;
  public curDb = null;

  public createDB(){
    //open创建或打开一个数据库,返回request对象
    var req = this.indexDB.open("myIndex",3);//第二个参数为版本，版本只能打开最新版本
    console.log(req);
    //当数据打开失败时调用
    req.onerror = function(){
    }
    //当数据打开成功时调用
    req.onsuccess = function(){
        //在成功后对象的result属性为本次申请的结果
        self.curDb = req.result;//curDb为数据库对象，用来操作数据表，维护数据表
        console.log(self.curDb);
    }
    req.onupgradeneeded = function(){
        //创建表的结构
        var db = req.result;
        console.log(db)
        db.createObjectStore("sys_user",{
            autoIncrement:"user_id",//指明当前数据id自增长（indexdb）
        })
    }
  }

  //添加用户
  public insertUser(user){
    // ObjectStore对象可以完成数据的插入
    // 获取ObjectStore需要的DB对象
    // 用到事务对象
    //获取数据的事务控制
    var tran = this.curDb.transaction(["sys_user"],"readwrite");
    //通过事务控制对象获取数据表对象
    var objectStore = tran.objectStore("sys_user");
    var addRequest = objectStore.add(user); 
    addRequest.onsuccess = function(){
      console.log("创建用户成功");
    }
  }

    //显示所有数据
  public showUser(accountUuid,itemId,stage){
    // let accountUuid = Global.USER_ACCOUNTID_KEY;
    var tran = this.curDb.transaction(["sys_user"],"readwrite");
    //通过事务控制对象获取数据表对象
    var objectStore = tran.objectStore("sys_user");
    var request = objectStore.getAll();
    request.onsuccess = function(event){
      var tempdata = event.currentTarget.result;//indexDB 存储数据
      self.messageListSelf = [];
      let fileType = 0;//临时文件类型
      for (let index = 0; index < tempdata.length; index++) {
        if(tempdata[index].accountUuid==accountUuid&&tempdata[index].itemId==itemId&&tempdata[index].stage==stage){
          let tempFileType = self.interceptFileName(tempdata[index].fileName);//文件名
          
          switch (tempFileType) {
            case 'jpg':
              fileType = 1;
              break;

            case 'gif':
              fileType = 1;
              break;

            case 'ppt':
              fileType = 2;
              break;

            case 'wps':
              fileType = 2;
              break;

            case 'xlsx':
              fileType = 6;

              break;
            case 'docx':
              fileType = 2;
              break;

            case 'txt':
              fileType = 3;
              break;

            case 'rar':
              fileType = 4;
              break;

            case 'pdf':
              fileType = 5;
              break;

            default:
              fileType = 0;
              break;
          }
          self.messageListSelf.push({
            message: tempdata[index].message, 
            time: tempdata[index].date, 
            type: tempdata[index].type, 
            fileName: tempdata[index].fileName, 
            iconPath: tempdata[index].iconPath, 
            itemId: tempdata[index].itemId, 
            stage: tempdata[index].stage, 
            userId: tempdata[index].userId, 
            accountUuid: tempdata[index].accountUuid,
            name: tempdata[index].name,
            fileType: fileType
          });
        } else if(tempdata[index].accountUuid!=accountUuid&&tempdata[index].itemId==itemId&&tempdata[index].stage==stage){
        // } else {
          let tempFileType = self.interceptFileName(tempdata[index].fileName);//文件名
          switch (tempFileType) {
            case 'jpg':
              fileType = 1;
              break;

            case 'gif':
              fileType = 1;
              break;

            case 'ppt':
              fileType = 2;
              break;

            case 'wps':
              fileType = 2;
              break;

            case 'doc':
              fileType = 2;
              break;

            case 'txt':
              fileType = 3;
              break;

            case 'rar':
              fileType = 4;
              break;

            case 'pdf':
              fileType = 5;
              break;

            case 'xlsx':
              fileType = 6;
              break;

            default:
              fileType = 0;
              break;
          }
          self.messageList.push({
            message: tempdata[index].message, 
            time: tempdata[index].date, 
            type: tempdata[index].type, 
            fileName: tempdata[index].fileName, 
            iconPath: tempdata[index].iconPath, 
            itemId: tempdata[index].itemId, 
            stage: tempdata[index].stage, 
            userId: tempdata[index].userId, 
            accountUuid: tempdata[index].accountUuid,
            name: tempdata[index].name,
            fileType: fileType
          });
        }
      }
    }
  }

    //显示数据数量
  public showCount(){
    var tran = this.curDb.transaction(["sys_user"],"readwrite");
    //通过事务控制对象获取数据表对象
    var objectStore = tran.objectStore("sys_user");
    var reque = objectStore.count();//数据库访问方法
    reque.onsuccess = function(event){
      var count = event.target.result;
      console.log("获取所有数据数量"+count);
      console.log(count);
    }
  }

  public delDB(){
    this.indexDB.deleteDatabase("myIndex");
  } 
  

  /**
   * 截取文件后缀名
   * interceptFileName
   * 
   * 文件名
   * fileName
   */
  public interceptFileName(fileName) : string {
    let suffix = '无';
    if(fileName==''||fileName==null||fileName==undefined){
      return;
    }
    let index1 = fileName.lastIndexOf(".");
    let index2 = fileName.length;
    suffix = fileName.substring(index1+1,index2);//后缀名
    return suffix;
  }


  public getMessage(){
    this.statusChanges = this.pushService.setSendMessage$.subscribe((data) => {
      console.log("响应数据添加");
      if (data != null) {
        let tempFileType = self.interceptFileName(data.fileName);
        let fileType;
        switch (tempFileType) {
          case 'jpg':
            fileType = 1;
            break;

          case 'gif':
            fileType = 1;
            break;

          case 'png':
            fileType = 1;
            break;

          case 'ppt':
            fileType = 2;
            break;

          case 'wps':
            fileType = 2;
            break;

          case 'xlsx':
            fileType = 6;

            break;
          case 'docx':
            fileType = 2;
            break;

          case 'txt':
            fileType = 3;
            break;

          case 'rar':
            fileType = 4;
            break;

          case 'pdf':
            fileType = 5;
            break;

          default:
            fileType = 0;
            break;
        }
        self.newsDataList.push({
          message: data.message, 
          date: data.date, 
          type: data.type, 
          fileName: data.fileName, 
          iconPath: data.iconPath, 
          itemId: data.itemId, 
          stage: data.stage, 
          userId: data.userId, 
          accountUuid: data.accountUuid,
          name: data.name,
          fileType: fileType
        });
      }
      // this.statusChanges.unsubscribe();
      // console.log('取消订阅');
    });
  }

  //按阶段获取历史信息
  public getDataList(itemId,stage,pageIndex) {
    this.publicPageindex = 1;
    this.newsDataList = [];//历史消息置空
    this.publicStage = stage;
    this.pubcliItemId = itemId;
    let accountUuid = this.storageService.getValue(Global.USER_ACCOUNTID_KEY);
    this.interfaceService.doGetDataList(itemId,stage,accountUuid,pageIndex);
    this.getDataListChanges = this.pushService.doGetDataList$.subscribe((data) => {
      for (let index = 0; index < data.length; index++) {
        let tempFileType = self.interceptFileName(data[index].path);
        let fileType;
        switch (tempFileType) {
          case 'jpg':
            fileType = 1;
            break;

          case 'gif':
            fileType = 1;
            break;

          case 'png':
            fileType = 1;
            break;

          case 'ppt':
            fileType = 2;
            break;

          case 'wps':
            fileType = 2;
            break;

          case 'xlsx':
            fileType = 6;

            break;
          case 'docx':
            fileType = 2;
            break;

          case 'txt':
            fileType = 3;
            break;

          case 'rar':
            fileType = 4;
            break;

          case 'pdf':
            fileType = 5;
            break;

          default:
            fileType = 0;
            break;
        }
        self.newsDataList.push({
          message: data[index].message, 
          date: data[index].createTime, 
          type: data[index].type, 
          fileName: data[index].path, 
          iconPath: data[index].iconPath, 
          itemId: self.pubcliItemId, 
          stage: self.publicStage, 
          userId: data[index].userId, 
          accountUuid: data[index].accountUuid,
          name: data[index].name,
          fileType: fileType
        });
      }
      this.getDataListChanges.unsubscribe();
    });
  }



  public onScroll(event){
    let divHeight = event.target.clientHeight;//div可视区域的高度
    let wholeHeight = event.target.scrollHeight;//滚动的高度，$(this)指代jQuery对象，而$(this)[0]指代的是dom节点
    let scrollTop =event.target.scrollTop;//滚动条的高度，即滚动条的当前位置到div顶部的距离
    if(scrollTop+divHeight==wholeHeight){
      console.log('到底部了');
      this.publicPageindex = this.publicPageindex+1;
      this.interfaceService.doGetDataList(this.pubcliItemId,this.publicStage,this.pubcliAccountUuid,this.publicPageindex);
      this.getDataListChanges = this.pushService.doGetDataList$.subscribe((data) => {
        for (let index = 0; index < data.length; index++) {
          let tempFileType = self.interceptFileName(data[index].path);
          let fileType;
          switch (tempFileType) {
            case 'jpg':
              fileType = 1;
              break;
  
            case 'gif':
              fileType = 1;
              break;
  
            case 'png':
              fileType = 1;
              break;
  
            case 'ppt':
              fileType = 2;
              break;
  
            case 'wps':
              fileType = 2;
              break;
  
            case 'xlsx':
              fileType = 6;
  
              break;
            case 'docx':
              fileType = 2;
              break;
  
            case 'txt':
              fileType = 3;
              break;
  
            case 'rar':
              fileType = 4;
              break;
  
            case 'pdf':
              fileType = 5;
              break;
  
            default:
              fileType = 0;
              break;
          }
          self.newsDataList.push({
            message: data[index].message, 
            date: data[index].createTime, 
            type: data[index].type, 
            fileName: data[index].path, 
            iconPath: data[index].iconPath, 
            itemId: self.pubcliItemId, 
            stage: self.publicStage, 
            userId: data[index].userId, 
            accountUuid: data[index].accountUuid,
            name: data[index].name,
            fileType: fileType
          });
        }
        this.getDataListChanges.unsubscribe();
      });
    }
    if(scrollTop==0){
      console.log('我到顶部了');
    }
  }

  /**
   * 预览图片
   * name
   */
  public getImgSrc(imgSrc) {
    if(imgSrc==null||imgSrc==undefined||imgSrc==''){
      return;
    }
    this.publicImg = imgSrc;
  }
}
