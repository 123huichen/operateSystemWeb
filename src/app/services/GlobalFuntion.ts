/**
 * Created by zhao on 2017/1/16.
 * 地址常量
 */
import { ReflectiveInjector, Inject, Injectable, forwardRef, EventEmitter} from "@angular/core";
  import { StorageService } from './StorageService';


@Injectable()
export class GlobalFunction {

    public globalFunction$ : EventEmitter<any> =  new EventEmitter();

    constructor () {  //, @Inject (forwardRef (() => HttpService)) public httpService: HttpService

     // this.globalFunction$.subscribe(data=> this.closeLoad(data));
   }

    private loading : any = null;

    private initData() : void {
    }
}
