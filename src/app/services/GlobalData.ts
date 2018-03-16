
import { ReflectiveInjector, Inject, Injectable, forwardRef } from "@angular/core" ;



@Injectable()
 export class GlobalData{

    private companyList : any[] = [];

    private data : any = {};

    constructor () {

        this.initData();
    }

    private initData() : void {

    }

    public getData() : any {

        return this.data;
    }


 }
