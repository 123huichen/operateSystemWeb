import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { InterfaceService } from '../services/InterfaceService';
import { Global } from '../services/Global'; 
import { PushService } from '../services/PushService';
@Component({
  selector : 'app-edit-modal',
  template :
   `
  <div class="modal" id="editModal">  
  <div class="modal-dialog">    
    <div class="modal-content">      
      <form class="form-horizontal">    
        <div class="modal-body">     
          <div class="form-group">    
            <label for="inputUsername" class="col-sm-2 control-label">标题</label>    
            <div class="col-sm-10">    
              <input name='title' id="inputUsername" type="text" class="form-control list-inline" [(ngModel)] = 'title'/>    
            </div>    
          </div>    
          <div class="form-group">    
            <label for="inputBirthday" class="col-sm-2 control-label">说明</label>    
            <div class="col-sm-10">    
              <!-- <input id="inputBirthday" type="text" class="form-control list-inline" placeholder="Birthday"/>     -->
              <textarea name="desc" id="" cols="30" rows="10" class="form-control" [(ngModel)] = 'comment'></textarea>
            </div>    
          </div>    
        </div>    
      </form>    
      <div class="modal-footer">    
        <button class="btn btn-success" [attr.data-dismiss]='modal' type="submit" (click) = 'UpdataDate(this.name,this.comment)'>保存</button>       
        <button class="btn btn-danger" data-dismiss="modal" (click) = 'EmitDestyoy()'>取消</button>    
      </div>    
    </div>    
  </div>    
</div>  
  `
})
export class EditModalComponent implements OnInit {


// @Input() id : number;
// @Input() title : string;
@Input() queryData : any;
@Input() typeData : any;
@Output() updata = new EventEmitter<any>();
@Output() destroyData = new EventEmitter<boolean>();

//@Output() Adddata = new EventEmitter<any>();

id : number;
comment : string;
title : string;
modal : string;
destroyComp : boolean = false;
successData : any;

  constructor( private interfaceService : InterfaceService, private pushService : PushService, private changeRef : ChangeDetectorRef) { 
      console.log(this.queryData);
  }

  ngOnInit() {
    this.JudgeType();
  }


  JudgeType(){
      if(this.queryData != null){
          switch(this.queryData.type){
            case 'cooperType' : {
                this.id = this.queryData.data.id;
                this.title = this.queryData.data.name;
                this.comment = this.queryData.data.comment;
            }
            break;

            case 'projectType' : {
                this.id = this.queryData.data.projectType_id;
                this.title = this.queryData.data.projectType_name;
                this.comment = this.queryData.data.projectType_Comment;
            }
            break;

            case 'ngeoType' : {
                this.id = this.queryData.data.conversationId;
                this.title = this.queryData.data.conversationTitle;
                this.comment = this.queryData.data.conversationComment;
            }
            break;

            default :
            {
                    console.log('----接口填写错误-----');
            }
    
            break;
            }
                    console.log('----end-----');
          }else{
              console.log('子组件没有接受到数据')
          }
    }


  EmitDestyoy(){
      this.destroyData.emit(this.destroyComp);
  }

  // UpdataCooperationType(id,name,comment){
  //   this.interfaceService.doUpdataCooperationType(id,name,comment)
  // }


  // UpdatayProjectType(id,name,comment){
  //   this.interfaceService.doUpdataProjectType(id,name,comment)
  // }


  // UpdataNegotiateType(id,name,comment){
  //   this.interfaceService.doUpdataNegotiateType(id,name,comment)
  // }


  // AddCooperationType(name,comment){
  //   this.interfaceService.doAddCooperationType(name,comment)
  // }

  // AddProjectType(name,comment){
  //   this.interfaceService.doAddProjectType(name,comment)
  // }

  // AddNegotiateType(name,comment){
  //   this.interfaceService.doAddNegotiateType(name,comment)
  // }

  // QueryCooperationType(){
  //   this.interfaceService.doQueryCooperationType();
  // }

  // QueryProjectType(){
  //   this.interfaceService.doQueryProjectType();
  // }

  // QueryNegotiateType(){
  //   this.interfaceService.doQueryNegotiateType();
  // }

  UpdataDate(){
    if(this.queryData == null ){
        this.AddManageData()
    }else{
        //this.destroyData.emit(this.destroyComp);
    switch(this.queryData.type){
      
        case 'cooperType' : {
            // this.queryData.data.id = this.id;
            // this.queryData.data.name = this.title;
            // this.queryData.data.comment = this.comment;
            // this.queryData.destroyData = this.destroyData;
            let data = {'title' : this.title, 'id' : this.id, 'comment' : this.comment};
            this.updata.emit(data);
            this.modal = 'modal';
            this.queryData = null;
        }
        break;

        case 'projectType' : {
          let data = {'title' : this.title, 'id' : this.id, 'comment' : this.comment};
          this.updata.emit(data);
          this.modal = 'modal';
          this.queryData = null;
        }
        break;

        case 'ngeoType' : {
          let data = {'title' : this.title, 'id' : this.id, 'comment' : this.comment};
          this.updata.emit(data);
          this.modal = 'modal';
          this.queryData = null;
        }
        break;

        default :
        {
                console.log('----接口填写错误-----');
        }

        break;
        }
        console.log('----end-----');
    }
    
  }

  AddManageData(){
    switch(this.typeData){
        case 'cooperType' : {
          let data = {'title' : this.title, 'comment' : this.comment }
          this.updata.emit(data);
            // this.AddCooperationType(this.title,this.comment)
            //   this.pushService.addCooperation_type$.subscribe((data)=>{
            //     console.log(data);
            //     this.successData = data;
            //     this.QueryCooperationType();
            //   })
            this.modal = 'modal';
        }
        break;

        case 'projectType' : {
          let data = {'title' : this.title, 'comment' : this.comment }
          this.updata.emit(data);
            // this.AddProjectType(this.title,this.comment)
            // this.pushService.addProject_type$.subscribe((data)=>{
            //   console.log(data);
            //   this.successData = data;
            //     this.QueryProjectType();
            // })
            this.modal = 'modal';
        }
        break;

        case 'ngeoType' : {
          let data = {'title' : this.title, 'comment' : this.comment }
          this.updata.emit(data);
            // this.AddNegotiateType(this.title,this.comment);
            // this.pushService.addNegotiate_type$.subscribe((data)=>{
            //   console.log(data);
            //   this.successData = data;
            //     this.QueryNegotiateType();
            // })
            this.modal = 'modal';
        }
        break;

        default :
        {
                console.log('----接口填写错误-----');
        }

        break;
        }
                console.log('----end-----');
  }


}
