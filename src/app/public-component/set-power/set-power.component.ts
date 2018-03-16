import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-set-power',
  templateUrl: './set-power.component.html',
  styleUrls: ['./set-power.component.css']
})
export class SetPowerComponent implements OnInit {


  @Input() roleData : any;
  @Input() authData : any;
  @Output() sure = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  public parentId : any;
  public childId : any = [];
  constructor() { }

  ngOnInit() {

  }

  sureData(){
    let data = { "role_id" : this.parentId };
    this.sure.emit(data);
  }

  cancelData(){
    let data = 0;
    this.cancel.emit(data);
  }

  parentChange($event){
    console.log($event.target.value);
    this.parentId = this.roleData[$event.target.value].role_id
  }

  childChange($event){
    this.childId.push({"id" : this.authData[$event.target.value].authority_id});
    console.log(this.childId);
  }


}
