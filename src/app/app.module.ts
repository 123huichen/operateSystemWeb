import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { IndexRoutingModule } from './indexRouting.module';

import { PagenotfoundComponent} from './pagenotfound/pagenotfound.component';
import { MyprojectComponent} from './myproject/myproject.component';
import { AddprojectComponent} from './addproject/addproject.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Global } from './services/Global';
import { HttpService } from './services/HttpService';
import { InterfaceService } from './services/InterfaceService';
import { PushService } from './services/PushService';
import { GlobalData } from './services/GlobalData';
import { Protocol } from './services/Protocol';
import { WebClient } from './services/WebClient';
import { GlobalFunction } from './services/GlobalFuntion';
import { StorageService } from './services/StorageService';
import { SessionService } from './services/SessionService';
import { LoginComponent } from './login/login.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { InformationPoolComponent } from './information-pool/information-pool.component';
import { ProjectSupervisionComponent } from './project-supervision/project-supervision.component';
import { FileCabinetsComponent } from './file-cabinets/file-cabinets.component';
import { CountAnalysisComponent } from './count-analysis/count-analysis.component';
import { GroupManageComponent } from './group-manage/group-manage.component';
import { DayilyManageComponent } from './dayily-manage/dayily-manage.component';
import { IndexhomeComponent } from './indexhome/indexhome.component';
import { PublicComponentComponent } from './public-component/public-component.component';
import { EditModalComponent } from './public-component/edit-modal.component';
import { PaginationComponent } from './public-component/pagination/pagination.component';

import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { FormButtonComponent } from './dynamic-form/containers/dynamic-form/components/form-button.component';
import { FormInputComponent } from './dynamic-form/containers/dynamic-form/components/form-input.component';
import { FormSelectComponent } from './dynamic-form/containers/dynamic-form/components/form-select.component';
import { TypeManageComponent } from './indexhome/type-manage/type-manage.component';
import { LogManageComponent } from './indexhome/log-manage/log-manage.component';
import { ToolMenuComponent } from './public-component/tool-menu/tool-menu.component';
import { DelAlterComponent } from './public-component/del-alter/del-alter.component';
import { PowerMannageComponent } from './indexhome/power-mannage/power-mannage.component';
import { SetPowerComponent } from './public-component/set-power/set-power.component';
import { ModuleManageComponent } from './indexhome/power-mannage/module-manage/module-manage.component';
import { RoleManageComponent } from './indexhome/power-mannage/role-manage/role-manage.component';
import { AddManageComponent } from './public-component/add-manage/add-manage.component';
import { SetAuthorityComponent } from './indexhome/power-mannage/set-authority/set-authority.component';

import { IndexhomeAuth } from './indexhome/indexhome-auth';
import { AddprojectAuth } from './addproject/addproject-auth';
import { ImportUserComponent } from './indexhome/power-mannage/import-user/import-user.component';
import { RoleAuthorityComponent } from './indexhome/power-mannage/role-authority/role-authority.component';
import { DatePipe } from '@angular/common';

//obj对象装换str
import { ObjstrPipe } from './objstr.pipe';
import { CalendarModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const appRoute : Routes = [
    { path : 'login', component : LoginComponent },
    { path : '', redirectTo: '/login', pathMatch: 'full'},
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    MyprojectComponent,
    AddprojectComponent,
    PagenotfoundComponent,
    LoginComponent,
    IndexPageComponent,
    InformationPoolComponent,
    ProjectSupervisionComponent,
    FileCabinetsComponent,
    CountAnalysisComponent,
    GroupManageComponent,
    DayilyManageComponent,
    IndexhomeComponent,
    PublicComponentComponent,
    EditModalComponent,
    PaginationComponent,
    TypeManageComponent,
    LogManageComponent,
    ToolMenuComponent,
    DelAlterComponent,
    PowerMannageComponent,
    SetPowerComponent,
    ModuleManageComponent,
    RoleManageComponent,
    AddManageComponent,
    SetAuthorityComponent,
    ImportUserComponent,
    RoleAuthorityComponent,
    ObjstrPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoute),
    IndexRoutingModule,
    DynamicFormModule,
    CalendarModule,
    BrowserAnimationsModule
  ],
  entryComponents : [
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    EditModalComponent,
    ToolMenuComponent,
    DelAlterComponent,
    SetPowerComponent,
    AddManageComponent,
    SetAuthorityComponent
  ],
  providers: [
    DatePipe,
    IndexhomeAuth,
    AddprojectAuth,
    SessionService,
    StorageService,
    GlobalFunction,
    GlobalData,
    PushService,
    InterfaceService,
    HttpService,Global,
    Protocol,
    WebClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
