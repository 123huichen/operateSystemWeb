/**
 * Created by zhao on 2017/1/16.
 * 地址常量
 */


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Global } from './Global';

export class Protocol {


    constructor () {

    }

    private  initData() {
    }


    private initError () : void {
    }


    // public getProtocol (content : any) : string {

    //   let code : any = Global.SUCCESS;

    //   let message : string = "success";

    //   let show : boolean = false;

    //   return this.getMyProtocol(code, message, show, content);
    // }

    // public getProtocol (code : any, message : string) : string {

    //   let show : boolean = false;

    //   if (code != Global.SUCCESS) {

    //      show = true;
    //   }

    //   let content : any = "";

    //   return this.getMyProtocol(code, message, show, content);
    // }

    // public getProtocol (code : any, message : string, show : boolean) : string {

    //   let content : any = "";

    //   return this.getMyProtocol(code, message, show, content);
    // }

    public getProtocol (code : any, message : string, show : boolean, content : any) : string {

      return this.getMyProtocol(code, message, show, content);
    }

    public getMyProtocol(code : any, message : string, show : boolean, content : any) : string {


      let protocolObject : any = {};

      protocolObject.type = Global.PROTOCOL_TYPE_CUSTOMER_VALUE;
      protocolObject.code = code;

      let messageObject : any = {};

      messageObject.info = message;
      messageObject.show = show;

      protocolObject.message = messageObject;

      protocolObject.content = content;

      let protocolString = JSON.stringify(protocolObject);

      return protocolString;
    }
}

