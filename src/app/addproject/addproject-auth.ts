import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SessionService } from '../services/SessionService';
import { Global } from '../services/Global';
@Injectable()
export class AddprojectAuth implements CanActivate {

  constructor(private router: Router, private sessionService : SessionService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const token = this.sessionService.getValue(Global.ADD_PROJECT);
    if (token) {
      return Observable.of(true);
    } else {
      //this.router.navigateByUrl('/indexpage');
      console.log('你没有权限访问')
      return Observable.of(false);
    }
  }
}