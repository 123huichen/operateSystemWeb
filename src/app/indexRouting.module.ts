import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { IndexPageComponent } from './index-page/index-page.component';
import { AddprojectComponent} from './addproject/addproject.component';
import { MyprojectComponent } from './myproject/myproject.component';
import { InformationPoolComponent } from './information-pool/information-pool.component';
import { ProjectSupervisionComponent } from './project-supervision/project-supervision.component';
import { FileCabinetsComponent } from './file-cabinets/file-cabinets.component';
import { CountAnalysisComponent } from './count-analysis/count-analysis.component';
import { GroupManageComponent } from './group-manage/group-manage.component';
import { DayilyManageComponent } from './dayily-manage/dayily-manage.component';
import { IndexhomeComponent } from './indexhome/indexhome.component';
import { LogManageComponent } from './indexhome/log-manage/log-manage.component';
import { TypeManageComponent } from './indexhome/type-manage/type-manage.component';
import { PowerMannageComponent } from './indexhome/power-mannage/power-mannage.component';
import { ModuleManageComponent } from './indexhome/power-mannage/module-manage/module-manage.component';
import { RoleManageComponent } from './indexhome/power-mannage/role-manage/role-manage.component';
import { SetAuthorityComponent } from './indexhome/power-mannage/set-authority/set-authority.component';
import { ImportUserComponent } from './indexhome/power-mannage/import-user/import-user.component';
import { RoleAuthorityComponent } from './indexhome/power-mannage/role-authority/role-authority.component';



import { AddprojectAuth } from './addproject/addproject-auth';
import { IndexhomeAuth } from './indexhome/indexhome-auth';

const indexhomeChildRoute : Routes = [
    { path : 'logmanage', component : LogManageComponent },
    { path : 'typemanage', component : TypeManageComponent },
    { path : 'powermanage', component : PowerMannageComponent },
    { path : 'modulemanage', component : ModuleManageComponent },
    { path : 'rolemanage', component : RoleManageComponent },
    { path : 'setauthority', component : SetAuthorityComponent },
    { path : 'importuser', component : ImportUserComponent },
    { path : 'roleauthority', component : RoleAuthorityComponent }
]

const indexChildRoute : Routes = [
    { path : 'indexhome', component : IndexhomeComponent, children : indexhomeChildRoute, },
    { path : 'addproject', component : AddprojectComponent,},
    { path : 'myproject', component : MyprojectComponent },
    { path : 'information', component : InformationPoolComponent },
    { path : 'projectsup', component : ProjectSupervisionComponent },
    { path : 'file', component : FileCabinetsComponent },
    { path : 'count', component : CountAnalysisComponent },
    { path : 'group', component : GroupManageComponent },
    { path : 'dayily', component : DayilyManageComponent },
]



const indexRoute : Routes = [
    { path : 'indexpage', component : IndexPageComponent, children : indexChildRoute, },
]
@NgModule({
    declarations: [
    ],
    imports: [
      BrowserModule,
      FormsModule,
      RouterModule.forChild(indexRoute)
    ],
    exports : [RouterModule]
  })
  export class IndexRoutingModule { }
