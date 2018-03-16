/**
 * Created by zhao on 2017/1/16.
 */

import { ReflectiveInjector, Inject, Injectable, forwardRef, EventEmitter } from "@angular/core";
import { Http, BaseRequestOptions, Headers, RequestOptions, RequestMethod, Request, Response } from '@angular/http';

import { PushService } from './PushService';
import { InterfaceService } from './InterfaceService';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Global } from './Global';
//import { reverse } from "dns";
import { Window } from "selenium-webdriver";
import { from } from "rxjs/observable/from";

declare var MozWebSocket: {
  prototype: WebSocket;
  new (url: string): WebSocket;
  OPEN: number;
  CLOSING: number;
  CONNECTING: number;
  CLOSED: number;
};

let Socket : typeof WebSocket = WebSocket || MozWebSocket;

let self : any;

@Injectable()
export class WebClient
{

  private webSocket : WebSocket;

  private name : string;

  constructor(private http : Http,
              @Inject (forwardRef (() => PushService)) public pushService : PushService) {


          self = this;
  }


  public onOpen (event) : void {

    console.log("Websocket 初始化成功，并打开了服务器(" + Global.WEBSOCKET_SERVER_ROOT + ")连接，详细信息:" + event.data);

  }


  private onClose (event) : void {

    let info = "连接到Websocket服务器(" + Global.WEBSOCKET_SERVER_ROOT + ")已经关闭!";

    console.log(info);
  }

  private onError(event) : void {

    let data = event.data;

    let info = "Websocket 产生错误，详细信息:" + data;

    console.log(info);
  }

  private onMessage (event) : void {

    let data = event.data;
    console.log(event);

    if (typeof(data) == "string") {

      data = JSON.parse(data);

    }

    // 对接到转场
    self.pushService.push(self.name, data);
  }

  // 外部调用生成 WebClient对象后 调用该方法真正去连接服务器，成功后会有相应日志输出
  public doConnectToServer () {
    try {
      this.webSocket = new WebSocket(Global.WEBSOCKET_SERVER_ROOT);

      this.webSocket.onopen = this.onOpen;

      this.webSocket.onmessage = this.onMessage;

      this.webSocket.onclose = this.onClose;

      this.webSocket.onerror = this.onError;

    } catch (error) {
      console.log("执行错误");
    }
  }




  public doSend(protocol : string, name : string) : void {

    console.log("发送数据到服务器的接口名称:" + name);
    console.log("协议:" + protocol);

    this.name = name;

    this.webSocket.send(protocol);
  }

}
