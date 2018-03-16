import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InterfaceService } from '../services/InterfaceService';

import { ActivatedRoute, Router } from '@angular/router';
import { PushService } from '../services/PushService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submit : boolean = false;
  userName : string
  passWord : string
  logindate : any;
  @Output() ifshow = new EventEmitter<boolean>();
  constructor( private pushService : PushService, private interfaceService : InterfaceService, private route : ActivatedRoute, private router : Router ) { }

  ngOnInit() {
    // window['history'].pushState('forward', '', 'modules'); //在初始化阶段必须得有这两行控制
    // window['history'].forward();
  }


  onSubmit(){
    this.submit = true;
    console.log(this.submit);
    this.interfaceService.doLogin(this.userName, this.passWord);
    // this.pushService.getData().subscribe( (data)=>{
    //   console.log(data);
    //   if(data.code == 0){
    //     this.router.navigate(['/indexpage/addproject'])
    //   }
    // })
  }

  postifshow(t){
    this.ifshow.emit(t)
  }



  goIndexpage(){

    // //this.pushService.getData().subscribe(data => this.logindate = data);
    // this.pushService.getData().subscribe( (data)=>{
    //   console.log(data);
    //   if(data){
    //     this.router.navigate(['/indexpage/addproject'])
    //   }
    // })
    // //this.router.navigate(['/indexpage'])

  }

}

