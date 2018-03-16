import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-del-alter',
  templateUrl: './del-alter.component.html',
  styleUrls: ['./del-alter.component.css']
})
export class DelAlterComponent implements OnInit {

  @Output() sure = new  EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {

  }

  sureData(){
    let data = 1;
    this.sure.emit(data);
  }

  cancelData(){
    let data = 0;
    this.cancel.emit(data);
  }


}
