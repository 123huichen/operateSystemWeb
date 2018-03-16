import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ 
    name: 'objstr' 
})

export class ObjstrPipe implements PipeTransform{
    transform(value, args:string[]) : any {
        let keys : string= "";
        for (let key in value) {
            keys = "[" + JSON.stringify(value) + "]";
        }
        return keys;
    }
}
