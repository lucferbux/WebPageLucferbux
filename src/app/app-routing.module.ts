import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {IntroductionDashboardComponent} from "./routing-elements/introduction-dashboard/introduction-dashboard.component";
import { TeamDashboardComponent } from './routing-elements/team-dashboard/team-dashboard.component';
import { EditScreenComponent } from './edit-screen/edit-screen.component';
import { TeamEditComponent } from './edit-screen/team-edit/team-edit.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { AuthGuard } from './core/auth.guard';
import { ProjectsTableComponent } from './routing-elements/projects-table/projects-table.component';
import { PatentsTableComponent } from './routing-elements/patents-table/patents-table.component';
import { DisseminationTableComponent } from './routing-elements/dissemination-table/dissemination-table.component';
import { DisseminationPageComponent } from './routing-elements/dissemination-page/dissemination-page.component';
import { IntroEditComponent } from './edit-screen/intro-edit/intro-edit.component';
import { ProjectsEditComponent } from './edit-screen/projects-edit/projects-edit.component';
import { PatentsEditComponent } from './edit-screen/patents-edit/patents-edit.component';




const routes: Routes = [
    {path: '', redirectTo: 'introduction', pathMatch: 'full'},
    {path: 'introduction', component: IntroductionDashboardComponent},
    {path: 'team', component: TeamDashboardComponent},
    {path: 'projects', component: ProjectsTableComponent},
    {path: 'patents', component: PatentsTableComponent},
    //{path: 'media', component: DisseminationPageComponent},
    {path: 'login', component: LoginScreenComponent},
    {path: 'edit', component: EditScreenComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
        {path: 'team', component: TeamEditComponent},
        {path: 'introduction', component: IntroEditComponent},
        {path: 'projects', component: ProjectsEditComponent},
        {path: 'patents', component: PatentsEditComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
    
}
