import { Injectable } from '@angular/core';

import { Global } from './Global'; //调用后台地址常量

@Injectable()

export class SessionService {


    constructor(){}

    public setValue(key: string, value: any) : void {
        if (value == null || value == 'undefine') {
          value = '';
        }
        sessionStorage.setItem(key, value);
      }
    
      public getValue(key: string): any {
        let value : any = sessionStorage.getItem(key);
        return value;
      }
    
      public remove(key: string) : void {
        sessionStorage.removeItem(key);
      }
    
      public  clear() : void {
        sessionStorage.clear();
      }
}