/**
 * Created by zhao on 2017/1/16.
 * 地址常量
 */


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

export class Global {

    // static MAX_PAGE: Number =  5;
    // static OK : string = "ok";
    // static NO : string = "no";

    // static SUCCESSED : string = "successed";
    // static FAILED : string = "failed";

    // static USER : string = "user";
    // static PWD : string = "pwd";
    // static LOGIN : string = "login";
    // static LOGOUT : string = "logout";

    // static APPLY_LOGIN : string = 'applyLogin' ;        // 短信登录
    // static PHONE : string = 'phone';                    // 手机号码
    // static CODE : string = 'code';                      // 验证码

    // static JSON_CODE : string = 'jsonCode';             // 返回登录时的jsonCode

    // static OPENID : string = 'openId';                  // 获得微信用户的openID
    // static USERID : string = 'userId';                  // 获得微信的userID
    // static NICKNAME : string = 'nickname';              // 获得微信用户的姓名
    // static HEAD_IMG_URL : string = 'headimgurl';        // 获得微信用户的头像
    // static SEX : string = 'sex';                        // 获得微信用户的性别



    //http://weixin.51pxh.com/#/jump/
    // static SERVICE_ROOT : string = "http://139.199.10.132/oauth/";
    // static TEST_SERVICE_ROOT : string = "http://192.168.2.121:8080/oauth/";
    // static TEST2_SERVICE_ROOT : string = "http://192.168.2.106:8080/oauth/";
    // static TEST3_SERVICE_ROOT : string = "http://139.199.10.132:80/";

    // 定义常量key
    static USER_LOGIN_KEY : string = "login";

    static USER_ACCOUNTID_KEY : string = "accountUuid";

    static USER_CORPID_KEY : string = "corpId";

    static USER_NAME_KEY : string = "name";

    static USER_USERNAME_KEY : string = "username";

    static USER_ORGUID_KRY : string = 'orguid';



    // 协议类型标识 0 ice协议 1为本地协议
    static PROTOCOL_TYPE_ICE : number = 0;
    static PROTOCOL_TYPE_CUSTOMER : number = 1;

    static COOPERATION_TYPE : string = 'queryAllCooperationType';
    static ADD_COOPERATION_TYPE : string = 'addCooperationType';
    static DETELE_COOPERATION_TYPE : string = 'delCooperationType';
    static UPDATA_COOPERATION_TYPE : string = 'updateCooperationType';

    static PROJECT_TYPE : string = 'findAllProjectType';
    static ADD_PROJECT_TYPE : string = 'addProjectType';
    static DELEYTE_PROJECT_TYPE : string = 'delProjectType';
    static UPDATA_PROJECT_TYPE : string = 'updateProjectType';

    static NEGOTIATE_TYPE : string = 'queryAllConversationType';
    static ADD_NEGOTIATE_TYPE : string = 'addConversationType';
    static DETELE_NEGOTIATE_TYPE : string = 'delConversationType';
    static UPDATA_NEGOTIATE_TYPE : string = 'updateConversationType';

    static COUNT_ANALYSIS : string = 'countItemArea';
    static LOG_MANAGE : string = 'findLogByPage';
    static PROJECT_FILTER_TYPE : string = 'findAllProjectProgress';
    static MYPROJECT_LIST : string = 'findAllItemInfoByPage';
    static QUERY_LINKPRO : string = 'findAllLikeItemInfo';
    static QUERY_PROJECTPEO : string = 'doSearchUser';
    static QUERY_CITY : string = 'doRegioms';


    static ORG_CHAT : string = 'getOrgStructure';

    static STAFF_DATA : string = 'getOrgStructureUsers';

    static GET_ROLE : string = 'getRole';
    static ADD_ROLE : string = 'addRole';
    static DEL_ROLE : string = 'delRole';
    static UPD_ROLE : string = 'updateRole';

    static GET_ALL_AUTHORITY : string = 'getAllAuthority';
    static ADD_AUTHORITY : string = 'addAuthority';
    static DEL_AUTHORITY : string = 'delAuthority';
    static UPD_AUTHORITY : string = 'updateAuthority';

    static QUERY_USERDATA : string = 'showUsers'; //获取导入过来的用户

    static FIND_OPERATION : string = 'findOperation';//获取功能模块下增、删、改、查、操作

    static REVISE_AUTHORITY : string = 'reviseAuthority';//设置用户角色

    static  SET_ROLE_AUTHORITY : string = 'setRoleAuthority';//设置角色功能模块权限

    static ADD_USER_AUTHORITY : string = 'addUsers';

    static SERVICE_NAME_LOGIN : string = 'Login';

    static SERVICE_NAME_ADD_ITEM : string = "addItemInfo";

    static SERVICE_NAME_ITEM_LIST : string = "getItemList";


    static WEB_CLIENT_SERVICE_NAME_VISIT : string = "visit";
    static WEB_CLIENT_SERVICE_NAME_EXIT : string = "exit";
    static WEB_CLIENT_SERVICE_NAME_CLOSE : string = "close";

    static WEB_CLIENT_SERVICE_NAME_SAVE_DATA : string = "saveData";
    static WEB_CLIENT_SERVICE_NAME_GET_DATA_LIST : string = "getDataList";

    static SERVICE_NAME_GETORGSTRUCTURE : string = "getOrgStructure";//获取管理组织架构

    // static SERVICE_ROOT : string = "http://market.backyard.test.colourlife.com/";

    // static WEBSOCKET_SERVER_ROOT : string = "ws://ws.market.backyard.test.colourlife.com/";

    static SERVICE_ROOT : string = "http://45.76.212.90:8090/";
    static WEBSOCKET_SERVER_ROOT : string = "ws:45.76.212.90:8899";


    // static SERVICE_ROOT : string = "http://192.168.0.109:8080/";
    // static WEBSOCKET_SERVER_ROOT : string = "ws:192.168.0.109:8899";

    // 示例调用
    // static SMS_SERVICE : string = "sendSMSCode.do";


    // static DB_NAME : string = 'chestnut.sqlite';

    static SUCCESS = 0;       // 成功
    static FAILD = -1;         // 失败
    static LOGIN_FAILD = 501;   // 登陆错误
    static SMSCODE_ERROR = 502; // 短信验证码输入错误
    static DISABLED = 503;      // 短信验证码失效
    static FREQUENTLY = 504;    // 短信验证码频繁发送
    static NOTCOURSEORWORK = 505; // 课程不存在
    static EXISTSFILES = 506;
    static FIRSTPAGETOOL_ERROR = 507;   // 保存首页预置栏信息失败
    static QUESTIONOPTIONS_ERROR = 508; // 保存题目选项失败
    static QUESTIONUPDATE_ERROR = 509;  // 修改题目失败
    static QUESTIONDELETE_ERROR = 601;  // 删除题目失败
    static WORKTEMPLATEDELETE_ERROR = 602;  // 删除模板失败
    static WORKTEMPLATEUPDATE_ERROR = 603;  // 修改模板失败
    static USERINFO_NOT = 601;              // 用户信息不完善
    static RECOMMEND_ERROR = 602;           // 推荐失败
    static VOTE_ERROR = 603;                // 投票失败
    static  EXISTENCE = 603;                // 轮播图重复设置
    static  MOBILENUMBER_OCCUPY = 604;      // 号码已经被注册
    static  MOBILENUMBER_ERR = 605;         // 号码格式不正确
    static  MOBILENUMBER_DISCREPANCY = 606; // 号码与注册号码不符

    /////////////////////////////////权限管理路由守卫//////////////////////////////////////////

    static INDEX : string = 'index';
    static FUNCTION_SET : string = 'funciotnSet';
    static ADD_PROJECT : string = 'addProject';
    static MY_PROJECT_LIST : string = 'myProjectList';
    static INFORMATION_POOL : string = 'informationPool';
    static PROJECT_SUPERVISION : string = 'projectSupervision';
    static FILE_CABINETS : string = 'fileCabinets';
    static COUNT_ANALY : string = 'countAnaly';
    static GROUP_MANNAGE : string = 'groupManage';
    static DAYILY_MANAGE : string = 'dayilyManage';




    ////////////////////////////////////////////////////////////////////////////////////////////

    static SETTIME_REMINDER : string = 'setTimeReminder';//时间提醒

    static SELECT_EMPLOYEE : string = "doUserSearchKey";//搜索收件人

    static GET_HEADIMAGE : string = "getHeadImage";//获取用户头像

    static GET_LOGOUT : string = "Logout";//登录注销

    static DO_NEXTSTATUS : string = "doNextStatus";//项目状态跟进切换

    static GET_STAGES : string = "doGetStages";//获取项目名称

    //测添加
    static TEXT_INFO_SENDINFO : string = 'textInfoSendinfo';




	////////////////////////////////////// 协议键///////////////////////////////////////
	 static  PROTOCOL_TYPE_KEY : string = "type";
	 static  PROTOCOL_CODE_KEY : string = "code";
	 static  PROTOCOL_MESSAGE_KEY : string = "message";
	 static  PROTOCOL_CONTENT_KEY : string = "content";

	 static  PROTOCOL_MESSAGE_SHOW_KEY : string = "show";
	 static  PROTOCOL_MESSAGE_INFO_KEY : string = "info";

	static  PROTOCOL_TYPE_ICE_VALUE : string = "0";
    static  PROTOCOL_TYPE_CUSTOMER_VALUE : string = "1";

    constructor () {

    }

    private  initData() {
    }


    private initError () : void {
    }
}
