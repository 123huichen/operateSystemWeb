/**
 * Created by zhao on 2017/1/16.
 */

import { ReflectiveInjector, Inject, Injectable, forwardRef, EventEmitter } from "@angular/core";
import { Http, BaseRequestOptions, Headers, RequestOptions, RequestMethod, Request, Response } from '@angular/http';

import { PushService } from './PushService';
import { GlobalFunction } from './GlobalFuntion';

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


@Injectable()
export class HttpService
{

  private error: string;
  private dataList : any;


  constructor(private http : Http, @Inject (forwardRef (() => PushService))
   public pushService : PushService, @Inject (forwardRef (() => GlobalFunction))  public globalFunction : GlobalFunction) {

  }


  private recvData(point : any, name: string, data : any) : void {

    // this.globalFunction.globalFunction$.emit();

    point.doDispatch(name, data);

    //let status : any = {}; status.ok = 1;

  }

  private doDispatch(name : string , data : any) {

    if (JSON.stringify(data) == "{}"){  //判断是否为空处理

      // this.globalFunction.showAlert('后台数据为空');

      return;
    }

      this.pushService.push(name, data);
  }

  public doGetRequest (name : string, list : any[]) : any {

    let urlPath : string = this.getRequestPath(name, list);
    this.doGet(urlPath, name);
  }

  private getRequestPath (name : string, list : any[]) : any {

    let path : string = "";
    let url : string = Global.SERVICE_ROOT + name;
    let c = 0; let len = list.length;

    if(list.length == 0){
      path = url
    }else{
      for ( let data of list) {
        c ++;
        let key : string = data.key;
        let value : string = data.value;
        path += key;
        path += "=";
        path += value;
        if (c < len) {
          path += "&";
        }
      }
      path = url + "?" + path;
    }
    console.log('Path:' + path);
    return path;

  }


  public doPostRequest(name : string, data : any) : any {

    let path : string = "";
    let url : string = Global.SERVICE_ROOT + name;

    this.doPost(url, name, data);
  }


  private handleError (error: Response | any) {

    console.log("Request error:" + error);

    this.globalFunction.globalFunction$.emit();

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';

      const err = body.error || JSON.stringify(body);

      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;


    } else {

      errMsg = error.message ? error.message : error.toString();

    }

    console.error(errMsg);

    return Observable.throw(errMsg);

  }


  private doGet(url: string, name : string) : void {

    let setHeaders = new Headers({'method' : 'Get', 'Content-Type' : 'application/json;charset=utf-8'});
    let options = new RequestOptions({headers: setHeaders});
    this.http.request(url, options)
             .map(response => response.json())
             .catch(this.handleError)
             .subscribe(data => {
              // this.globalFunction.globalFunction$.emit();

               setTimeout(() => {
                   this.recvData(this, name, data);
                }, 700);
              },

              error =>  this.error = <any>error);
  }


  private doPost(url: string, name: string, body : any) : any {

    // 成功了 body 本来就是json了  这里不需要再次解析
    let jsonBody = JSON.stringify(body);
   //let jsonBody = body;

    console.log("doPost Request body:" + jsonBody);

    // application/x-www-form-urlencoded
    //let setHeaders = new Headers({'method':'Post', 'body':'ItemInfo:', 'Content-Type': 'application/json;charset=utf-8'});

     let setHeaders = new Headers({'method' : 'POST', 'body' : jsonBody, 'Content-Type' : 'application/json;charset=utf-8'});

    let options = new RequestOptions({headers: setHeaders});

    this.http.request(url, options)
             .map(response => response.json())
             .catch(this.handleError)
             .subscribe(data => {

              //this.globalFunction.globalFunction$.emit();

              setTimeout(() => {
                  this.recvData(this, name, data);
               }, 700);
             },

             error =>  this.error = <any>error);
    }
  }
