import { Component, OnInit } from '@angular/core';
import { InterfaceService } from '../services/InterfaceService';
import { Global } from '../services/Global'; 
import { PushService } from '../services/PushService';
import { StorageService } from '../services/StorageService';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/subscription';
import { FormControl,FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

// 动态添加组件类型的接口
// interface FormItemOption {
//   type: string;
//   label: string;
//   name: string;
//   placeholder?: string;
//   options?: string[]
// }
declare var $ : any;
let self : any;
@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})


export class AddprojectComponent implements OnInit {

  
  public itemUnmarked : number = 1;
  public addProject : FormGroup;
  public cooperationMethod : any[] = []; //合作方式
  public nowCooperation : string = '';//当前选择的合作方式
  public placeHolder : string = '请输入项目名称'; //项目或公司名称的placeholder属性
  public addInformation : Information[];//信息联系人的数组
  public queryLinkProData : any[];// 查询后的关联项目
  public listData : any[] = [];//这是选好的关联项目列表
  public listDataShow : boolean = false;//是否显示查询后的数据
  public listID : any = '';//关联项目的ID
  public listName : any = '';//关联项目的名字
  public queryProjectPeoData : any[];//查询后的关注人列表
  public queryProjectPeoDataShow : boolean = false;//是否显示查询后的数据
  public projectPeoData : any[] = [];//这是选好的关注人
  public projectPeoID : any = '';//关注人的ID
  public projectPeoName : any = '';//关注人的name
  public provincialList : any[] = [];//省级集合数据
  public cityList : any[] = [];//市级集合数据
  public DistrictList : any[] = []//区级集合数据
  public provincialList$ : Subscription; // 订阅的实例用来取消订阅
  public cityList$ : Subscription;
  public managementOrganizationStructure : any[] =[];//获取管理组织架构
  public managementData : boolean = false; //管理组织架构显示
  public ifshow : boolean = false;//控制工具的显示
  public ztreeName : string; //组织架构数据绑定
  public publicOrgUuid;//公共orgUuid 
  // config : FormItemOption[] = [
  //   {
  //     type: 'input',
  //     label: 'Full name',
  //     name: 'name',
  //     placeholder: 'Enter your name'
  //   },{
  //     type: 'input',
  //     label: 'NEW NAME',
  //     name: 'name',
  //     placeholder: 'Enter your name AGREE'
  //   }
  // ]
  
  constructor(private router : Router, private fb : FormBuilder, private interfaceService : InterfaceService,
     private pushService : PushService, private storageService : StorageService) { }

  ngOnInit() {
    console.log(this.addInformation);
    self = this;
    this.createForm();
    this.GetProvincialList();
    this.getCooperationType();
    //this.getOrgStructure();
  }

  
  ngOnChanges() {
    this.setAddresses(this.addInformation);
    
  }

  // 返回一个Formarray
  get secretLairs(): FormArray {
    return this.addProject.get('secretLairs') as FormArray;
  };

  // 设置可动态添加的数组
  setAddresses(addresses: Information[]) {
    const addressFGs = addresses.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(addressFGs);
    this.addProject.setControl('secretLairs', addressFormArray);
  }

  //创建响应式表单 适合处理比较复杂的数据
  createForm(){
    this.addProject = this.fb.group({
      userId : [this.storageService.getValue(Global.USER_ACCOUNTID_KEY), Validators.required],
      itemUnmarked : ['1', Validators.required],
      cooperationMethod : ['', Validators.required],
      colourHourse : [''],
      colourCar : [''],
      projectName : ['', Validators.required ],
      address : ['', Validators.required ],
      projectLocationSheng : ['', Validators.required ],
      projectLocationShi : ['', Validators.required ],
      projectLocationQu : ['', Validators.required ],
      projectArea : ['', Validators.required ],
      orgUuid : ['', Validators.required ],
      projectPartn : ['', Validators.required ],
      secretLairs : this.fb.array([this.createRole()]),
      projectPeople : [''],
      projectPeopleID : ['', Validators.required ],
      projectPeopleName : ['', Validators.required ],
      assocProject : ['',],
      assocProjectId : ['',],
      assocProjectName : [''],
      projectDescription : [''],
      orgStructure : ['',Validators.required]
    })
  }

  //这是表单的提交方法
  onSubmit(){
    console.log()
    console.log(this.addProject.value);
    let data = this.addProject.value;
    data.secretLairs = encodeURI(JSON.stringify(data.secretLairs));
    // this.projectPeoID = this.projectPeoID.slice(0,this.projectPeoID.length-1);
    // this.projectPeoName = this.projectPeoName.slice(0,this.projectPeoName.length-1);
    // this.addProject.patchValue({
    //   projectPeople : '',
    //   projectPeopleID : encodeURI(this.projectPeoID),
    //   projectPeopleName : encodeURI(this.projectPeoName)
    // })
    // this.listID = this.listID.slice(0,this.listID.length-1);
    // this.addProject.patchValue({
    //   assocProject : this.listID,
    //   assocProjectName : ''
    // });
    //let data = JSON.stringify(this.addProject.value);
    //let datalist = {"ItemInfo" : data, "userId" : 1, "itemUnmarked" : this.itemUnmarked}
    //this.interfaceService.doAddProject(data,1,this.itemUnmarked);
    this.interfaceService.doAddProject(data.userId, this.storageService.getValue(Global.name), data.itemUnmarked, data.cooperationMethod, data.projectName, data.colourHourse, data.address, data.projectLocationSheng, data.projectLocationShi, data.projectLocationQu, data.projectArea, data.projectPartn, data.secretLairs, data.projectPeopleID, data.projectPeopleName, data.assocProjectId, data.assocProjectName, data.projectDescription,data.orgUuid);
    this.pushService.addProjectEvent$.subscribe((data)=>{
      console.log(data);
      if(data == 1){
        
      }
    })
  }

  //这里主要是返回一个Formgroup对象  因为Formarray里面只支持这个对象 如果用普通对象会报错
  createRole() :  FormGroup {
    return this.fb.group({
      informationPeople : '',
      informationPhone : ''
    });
  }

  //点击动态添加信息联系人的方法
  clickAddInformation(){
    this.secretLairs.push(this.createRole())
  }

  //点击删除信息联系人的方法
  clickRemoveInformation(index){
    if(this.secretLairs.length > 1){
      this.secretLairs.removeAt(index);
    }
  }

  //关联项目查询
  LinkProject(val){
    console.log(val)
    if(val == ""){
      this.queryLinkProData = [];
      this.listDataShow = false;
    }else{
      this.interfaceService.doQueryLinkPro(val);
      console.log(val);
      this.pushService.queryLinkProject$.subscribe( (data) =>{
        if(data != null){
          console.log(data)
          this.queryLinkProData = data;
          this.listDataShow = true;
          console.log(this.queryLinkProData)
        }
      })
    }
  }

  //项目关注人查询
  ProjectPeople(val){
    console.log(val)
    if(val == ""){
      this.queryProjectPeoData = [];
      this.queryProjectPeoDataShow = false;
    }else{
      this.interfaceService.doQueryProjectPeo(this.storageService.getValue(Global.USER_ACCOUNTID_KEY),val);
      console.log(val);
      this.pushService.queryLinkPeo$.subscribe((data) =>{
          if(data != null){
            // this.provincialList$.unsubscribe();
            // //this.cityList$.unsubscribe();
            console.log(data);
            this.queryProjectPeoData = data;
            this.queryProjectPeoDataShow = true;
            console.log(this.queryProjectPeoData)
          }
        })
    }
  }

  /**
   * 点击拿到列表项的项目ID
   * @param index 数组的下标
   */
  getLinkProDataID(index : number){
    this.listID += this.queryLinkProData[index].itemId + '$'; 
    this.listName += this.queryLinkProData[index].itemName + '$'
    this.listData.push(this.queryLinkProData[index].itemName);
    this.addProject.patchValue({
      assocProject : '',
      assocProjectName : encodeURIComponent(this.listName),
      assocProjectId : encodeURIComponent(this.listID)
    });
    this.listDataShow = false;
    this.queryLinkProData = [];
  }

  /**
   * 点击拿到关注人的accountUuid 和名字
   * @param index 数组下标
   */
  getLinkPeople(index){
    this.projectPeoID += this.queryProjectPeoData[index].accountUuid + '$';
    this.projectPeoName += this.queryProjectPeoData[index].name + '$';
    //this.projectPeoID = this.projectPeoID.slice(0,this.projectPeoID.length-1);
    //this.projectPeoName = this.projectPeoName.slice(0,this.projectPeoName.length-1);
    this.projectPeoData.push(this.queryProjectPeoData[index].name);
    this.addProject.patchValue({
      projectPeople : '',
      projectPeopleID : encodeURIComponent(this.projectPeoID),
      projectPeopleName : encodeURIComponent(this.projectPeoName)
    })
    this.queryProjectPeoDataShow = false;
    this.queryProjectPeoData = [];
  }

  //点击删除关联项目item
  DelListData(index){
    this.listData.splice(index,1);
    let listIDArr = this.listID.split("$");
    let listNameArr = this.listName.split("$");
    listNameArr.splice(index,1);
    listIDArr.splice(index,1);
    if(listIDArr.length > 1){
      this.listID = listIDArr.join("$");
      this.listName = listNameArr.join("$");
    }else{
      this.listID = listIDArr.join("");
      this.listName = listNameArr.join("");
    }
    this.addProject.patchValue({
      assocProjectId : this.listID,
      assocProjectName : this.listName
    })
  }

  DelProjectPeoData(index){
    this.projectPeoData.splice(index,1);
    let projectPeoIDArr = this.projectPeoID.split("$");
    let projectPeoNameArr = this.projectPeoName.split("$");
    if(projectPeoIDArr.length > 1){
      this.projectPeoID = projectPeoIDArr.join("$");
      this.projectPeoName = projectPeoNameArr.join("$");
    }else{
      this.projectPeoID = projectPeoIDArr.join("");
      this.projectPeoName = projectPeoNameArr.join("");
    }
    this.addProject.patchValue({
      projectPeopleID : this.projectPeoID,
      projectPeopleName : this.projectPeoName
    })
  }

  //获得省级集合数据
  GetProvincialList(){
    this.interfaceService.doQueryCity(this.storageService.getValue(Global.USER_ACCOUNTID_KEY),1);
    this.provincialList$ = this.pushService.queryCity$.take(1).subscribe( (data)=>{
      this.provincialList = data;
      console.log(this.provincialList);
    })
  }

  //省市区的onchange联动
  OnChangeProvincial(val){
    for( let i = 0; i < this.provincialList.length; i++){
      if(this.provincialList[i].name == val){
        let id = this.provincialList[i].id;
        this.interfaceService.doQueryCity(this.storageService.getValue(Global.USER_ACCOUNTID_KEY),id);
        this.cityList$ = this.pushService.queryCity$.subscribe( (data)=>{
          this.provincialList$.unsubscribe();
          this.cityList = data;
          console.log(this.cityList)
        })
      }
    }
  }

  OnChangeCity(val){
    this.cityList$.unsubscribe();
    for( let i = 0; i < this.cityList.length; i++){
      if(this.cityList[i].name == val){
        let id = this.cityList[i].id;
        this.interfaceService.doQueryCity(this.storageService.getValue(Global.USER_ACCOUNTID_KEY),id);
        this.pushService.queryCity$.subscribe( (data)=>{
          this.DistrictList = data;
          console.log(this.cityList)
        })
      }
    }
  }

  //获得合作方式
  getCooperationType(){
    this.interfaceService.doQueryCooperationType();
    this.pushService.queryCooperation_type$.subscribe((data)=>{
      this.cooperationMethod = data;
    })
  }

  cooperationOnchange(){
    this.nowCooperation = this.addProject.get('cooperationMethod').value;
    console.log(this.nowCooperation);
    if(this.nowCooperation == '收购' || this.nowCooperation == '小股合作'){
      this.placeHolder = '请输入公司名称';
    }else {
      this.placeHolder = '请输入项目名称';
    }
  }
  

  /**
   * getOrgStructure
   * 获取管理组织架构
   */
  public getOrgStructure() {
    // let accountUuid = this.storageService.getValue(Global.USER_ACCOUNTID_KEY);
    // this.interfaceService.getOrgStructure(accountUuid,0);
    // this.pushService.doGetOrgStructure$.subscribe((data)=>{
    //   console.log("获取管理组织架构数据");
    //   console.log(data);
    //   this.managementOrganizationStructure = data;
    // });
    if (this.managementData) {
      //console.log("aaaaa");
      this.managementData = false;
    } else {
      this.managementData = true;
    }
    this.getZtreeData();
  }
  
  //管理组织架构树形列表
  getZtreeData(){
    //let ztreeUrl = Global.SERVICE_ROOT + Global.ORG_CHAT + '?accountUuid='+this.storageService.getValue(Global.USER_ACCOUNTID_KEY);
    let accountUuid = this.storageService.getValue(Global.USER_ACCOUNTID_KEY);//this指向问题
    let setting = {
			view: {
				selectedMulti: false,
				showIcon :false
			},
			async: {
				enable: true,
				url: Global.SERVICE_ROOT + Global.SERVICE_NAME_GETORGSTRUCTURE +'?accountUuid=' + accountUuid,//通过getTree接口获取树状数据
				autoParam: ['orgUuid'],
        type : 'get',
        //dataFilter: ajaxDataFilter
			},
			edit: {
				enable: true,
				showRemoveBtn: false,
				showRenameBtn: false
			},
			data: {
				keep: {
					parent:true,
					leaf:true
				},
				simpleData: {
					enable: true,
					idKey: "orgUuid",
					pIdKey: "parentId",
					rootPId: 0
				},
			},
			callback: {
				onClick: zTreeOnClick,
				//onExpand: zTreeOnExpand
			}
    };
    
    //用于捕获节点被点击的事件回调函数
    function zTreeOnClick(event, treeId, treeNode, clickFlag){
      self.zTreeClick(event, treeId, treeNode, clickFlag);
    }
    
    let zNodes = [];
    console.log($('#ztreeManagementData'))
    $.fn.zTree.init($('#ztreeManagementData'), setting, zNodes);
  }

  //zTree树点击执行事件
  public zTreeClick(event, treeId, treeNode, clickFlag){
    console.log(event);
    this.publicOrgUuid = treeNode.orgUuid;
    this.ztreeName = treeNode.name;
    this.managementData = false;
    console.log(this.ztreeName);
  }

} 




export class Information {
  informationPeople : '';
  informationPhone : '';
}

