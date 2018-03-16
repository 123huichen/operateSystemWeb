import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-manage',
  templateUrl: './add-manage.component.html',
  styleUrls: ['./add-manage.component.css']
})
export class AddManageComponent implements OnInit {

  @Input() manageData : any;
  @Input() updataManage : any;
  @Output() sure = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  public manageName : string;
  constructor() { }

  ngOnInit() {
    this.showUpdataManage()
  }

  showUpdataManage(){
    console.log(this.updataManage)
    if(this.updataManage != null){
      if(this.updataManage.type == 'role'){
        this.manageName = this.updataManage.data.role_name
      }else if(this.updataManage.type == 'module'){
        this.manageName = this.updataManage.data.operate
      }
    }
    
  }

  sureData(){
    console.log(this.manageName)
    let data = this.manageName
    this.sure.emit(data);
  }

  cancelData(){
    let data = 0;
    this.cancel.emit(data);
  }
}
