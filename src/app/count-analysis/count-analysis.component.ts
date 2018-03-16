import { Component, OnInit } from '@angular/core';
import { InterfaceService } from '../services/InterfaceService';
import { Global } from '../services/Global'; 
import { PushService } from '../services/PushService';
import { StorageService } from '../services/StorageService';

@Component({
  selector: 'app-count-analysis',
  templateUrl: './count-analysis.component.html',
  styleUrls: ['./count-analysis.component.css']
})
export class CountAnalysisComponent implements OnInit {

  public countData : any;
  constructor( private interfaceService : InterfaceService,
    private pushService : PushService, private storageService : StorageService) { }
    
  ngOnInit() {
    this.getCountData()
  }

  getCountData(){
    this.interfaceService.doCountData(Global.USER_ACCOUNTID_KEY,1);
    this.pushService.countData$.subscribe((data)=>{
      this.countData = data;
      console.log(this.countData)
    })
  }

}
