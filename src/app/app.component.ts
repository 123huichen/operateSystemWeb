import { Component } from '@angular/core';
import { SessionService } from './services/SessionService';
import { StorageService } from './services/StorageService';
import { Global } from './services/Global';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  istrue : boolean = true;
  
  constructor(private sessionService : SessionService, private storageService : StorageService){
    this.getifshow();
  }

  getifshow(){
    // this.sessionService.setValue(Global.INDEX,false);
    // this.sessionService.setValue(Global.FUNCTION_SET,false);
    // this.sessionService.setValue(Global.ADD_PROJECT,false);
    // this.sessionService.setValue(Global.MY_PROJECT_LIST,false);
    // this.sessionService.setValue(Global.INFORMATION_POOL,false);
    // this.sessionService.setValue(Global.PROJECT_SUPERVISION,false);
    // this.sessionService.setValue(Global.FILE_CABINETS,false);
    // this.sessionService.setValue(Global.COUNT_ANALY,false);
    // this.sessionService.setValue(Global.GROUP_MANNAGE,false);
    // this.sessionService.setValue(Global.DAYILY_MANAGE,false);

    // this.storageService.setValue(Global.INDEX,false);
    // this.storageService.setValue(Global.FUNCTION_SET,false);
    // this.storageService.setValue(Global.ADD_PROJECT,false);
    // this.storageService.setValue(Global.MY_PROJECT_LIST,false);
    // this.storageService.setValue(Global.INFORMATION_POOL,false);
    // this.storageService.setValue(Global.PROJECT_SUPERVISION,false);
    // this.storageService.setValue(Global.FILE_CABINETS,false);
    // this.storageService.setValue(Global.COUNT_ANALY,false);
    // this.storageService.setValue(Global.GROUP_MANNAGE,false);
    // this.storageService.setValue(Global.DAYILY_MANAGE,false);
  }


}
