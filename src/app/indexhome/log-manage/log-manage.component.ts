import { Component, OnInit } from '@angular/core';
import { InterfaceService } from '../../services/InterfaceService';
import { Global } from '../../services/Global'; 
import { PushService } from '../../services/PushService';
import { StorageService } from '../../services/StorageService';


@Component({
  selector: 'app-log-manage',
  templateUrl: './log-manage.component.html',
  styleUrls: ['./log-manage.component.css']
})
export class LogManageComponent implements OnInit {


  public logManageList : any;
  public pageContent : any = {};//分页内容
  constructor(private interfaceService : InterfaceService, private pushService : PushService, private storageService : StorageService) { }

  ngOnInit() {
    this.getLogManageData()
  }


  getLogManageData(){
    console.log(1)
    this.interfaceService.doQueryLog(this.storageService.getValue(Global.USER_USERNAME_KEY),1);
    this.pushService.logManageData$.subscribe((data)=>{
      this.logManageList = data.list;
      this.pageContent.pageSize = data.pageSize;
      this.pageContent.totalNum = data.totalRecord;
      this.pageContent.curPage = data.currentPage;
      this.pageContent.totalPage = data.totalPage;
      console.log(this.logManageList);
    })
  }

  //点击分页按钮加载当前页码数据
  getPageData($event){
    console.log($event);
    this.interfaceService.doQueryLog(this.storageService.getValue(Global.USER_USERNAME_KEY),$event);
  }


}
