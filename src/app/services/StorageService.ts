/**
 * Created by zhao on 2017/1/16.
 * 验证
 */



import { Injectable } from '@angular/core';

import { Global } from './Global'; //调用后台地址常量



import { Observable } from 'rxjs/Observable';

import { Subject } from 'rxjs/Subject';


//let SQLite = require("nativescript-sqlite");

@Injectable()
export class StorageService {

  private isBrowser : boolean = false;

  private browserDatabase : any = null;
  // private sqliteObject: SQLiteObject = null;
  // private sqlite: SQLite = null;

  private  sqlite : any = null;


  private subject = null;



  constructor() {

    // this.subject = new Subject<any>();

    // this.test(true);

  }

//    private test(open: boolean) {
//      if (open == true)
//      {

//      }
//    }

//    public getSubject() {

//      return this.subject;
//    }

//    public initDatabase(isBrowser: boolean = false) {
//       this.isBrowser = isBrowser;
//       this.openDB();


//   }

//    private openDB() : Boolean {

//       if (this.isBrowser == true) {

//           return this.openBrowserDB();
//        }
//       else {

//         return this.openSQLiteDB();
//       }

//    }


//    private openBrowserDB() : boolean {

//       let ok : boolean = false;

//       this.browserDatabase = (<any>window).openDatabase(Global.DB_NAME, '1.0', 'database', 5 * 1024 * 1024);

//       if (this.browserDatabase != null) {

//         ok = true;

//         this.initData();
//       }


//       return ok;
//    }

//    private openSQLiteDB() : boolean {
//       let ok : boolean = false;



//       this.initData();

//      return ok;
//    }

//   //  private closeDB() : boolean {

//   //     let ok : boolean = false;
//   //     if(this.sqlite != null) {

//   //       this.sqlite.close().then((data)=>{
//   //         console.log('closeDB info :', data);

//   //         ok = true;
//   //       }, (error)=>{
//   //         console.log('closeDB error :',error);
//   //       });
//   //     }

//   //     return ok;
//   //  }


//    private initData() : void {

//       // 创建课程表
//       // let course : string = "CREATE TABLE IF NOT EXISTS course (id INTEGER PRIMARY KEY AUTOINCREMENT, courseName VARCHAR(255), courseID VARCHAR(4), courseURL VARCHAR(200), coursePictureName REAL, courseType VARCHAR(4), chapterNumber VARCHAR(10), studyNumber INTEGER, insuranceClassID VARCHAR(4))";
//       // this.create(course);


//       //  let i : string = "INSERT INTO companyCategory(name, memo) VALUES('我加进去的数据都是大神多所多', '大声道撒多所多所多所多 info')";
//       //  this.insert(i);
//       // this.insert(i);
//       // this.insert(i);
//       // this.insert(i);
//       // this.insert(i);

//       // let q : string = "SELECT * FROM companyCategory";
//       // let data : any = this.query(q);
//       // console.log('Data:', data);

//       // 建立其他表
//    }



//    public create(sql : string) : boolean {

//      return this.runSQL(sql);
//    }

//    public update (sql : string) : boolean {

//      return this.runSQL(sql);
//    }

//    public insert (sql : string) : boolean {

//      return this.runSQL(sql);
//    }

//    public delete (sql: string) : boolean {

//      return this.runSQL(sql);
//    }

//    public runSQL(sql : string) : boolean {

//       if (this.isBrowser == true) {
//         return this.runBrowserSQL(sql);
//       }
//       else {
//         return this.runSQLiteSQL(sql);
//       }
//   }


//   private runBrowserSQL(sql : string) : boolean {

//     let ok = false;

//     if (this.browserDatabase != null) {

//       this.browserDatabase.transaction(function (tx) {

//         tx.executeSql(sql);
//       ok = true;

//       });
//    }

//     return ok;
//   }

//  private runSQLiteSQL(sql : string) : boolean {

//       let ok = false;

//       (new SQLite(Global.DB_NAME)).then(db => {
//         db.execSQL(sql).then(id => {

//         }, error => {
//             console.log("SQLite  ERROR", error);
//         });
//     }, error => {
//         console.log("OPEN DB ERROR", error);
//     });

//       return ok;
//  }

//   public query(sql : string) : any {

//       if (this.isBrowser == true) {
//         return this.browserQuery(sql);
//       }
//       else {
//         return this.sqliteQuery(sql);
//       }
//   }


//   private browserQuery(sql : string) : any {

//     let dataList : any[] = [];
//     let tThis = this;
//     if (this.browserDatabase != null) {

//       this.browserDatabase.transaction(function (tx) {

//       tx.executeSql(sql, [], function(tx, result) {

//         let len = result.rows.length;    console.log('data len:' + len);
//         for (let i = 0; i < len; i ++) {

//           let data = result.rows.item(i); //  console.log('data item:', data);

//           dataList.push(data);
//         };

//         tThis.subject.next({ any: dataList });
//       });
//     });

//   }
// }



//   private sqliteQuery (sql : string) : any {
//     let result : any[] = [];

//     let ok = false;

//           (new SQLite(Global.DB_NAME)).then(db => {
//             db.execSQL(sql).then(id => {

//               result = db;

//             }, error => {
//                 console.log("CREATE TABLE ERROR", error);
//             });
//         }, error => {
//             console.log("OPEN DB ERROR", error);
//         });

//     return result;
//   }


// 这是一个校验方法
  public setValue(key: string, value: any) : void {
    if (value == null || value == 'undefine') {
      value = '';
    }
    localStorage.setItem(key, value);
  }

  public getValue(key: string): any {
    let value : any = localStorage.getItem(key);
    return value;
  }

  public remove(key: string) : void {
    localStorage.removeItem(key);
  }

  public clear() : void {
    sessionStorage.clear();
  }

// // 判断是否登录
//   // public isLogin() : boolean {
//   //   let isOk = false;
//   //   let ok = this.getValue(Global.LOGIN);
//   //   if (ok == Global.OK)
//   //   {
//   //       isOk = true;
//   //   }
//   //    return isOk;
//   // }

// //是否退出登录
//   public isLogout () : boolean {
//     let isOk = false;
//     let ok = this.getValue(Global.LOGOUT);
//     if (ok == Global.OK)
//     {
//       isOk = true;
//     }
//     return isOk;
//   }

// // 登录
//   public doLogin(name : string, pwd : string) : void {
//     this.setValue(Global.USER, name);
//     this.setValue(Global.PWD, pwd);
//     this.setValue(Global.LOGIN, Global.OK);
//     this.setValue(Global.LOGOUT, Global.NO);
//   }

//   public doLogout() {
//     this.setValue(Global.LOGIN, Global.NO);
//     this.setValue(Global.LOGOUT, Global.OK);
//   }


//   public getUser() : string {

//     return this.getValue(Global.USER);

//   }

//   public getPwd() : string {

//     return this.getValue(Global.PWD);

//   }

//   //获得验证码
//   public getCode( phone : string ) : boolean{

//     return false;

//   }


//   //是否登录
//   public isApplyLogin() : boolean {

//     let isOK = false;

//     let ok = this.getValue(Global.APPLY_LOGIN);

//     if (ok == Global.OK) {

//       isOK = true;

//     }

//     return isOK;
//   }

//   public doApplyLogin(phone : string, code : string ) : void{

//      this.setValue(Global.PHONE, phone);

//      this.setValue(Global.CODE, code);

//      this.setValue(Global.APPLY_LOGIN, Global.OK);
//   }

}
