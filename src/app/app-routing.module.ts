import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IntroductionDashboardComponent} from "./routing-elements/introduction-dashboard/introduction-dashboard.component";
import { JobsDashboardComponent } from './routing-elements/jobs-dashboard/jobs-dashboard.component';
import { EditScreenComponent } from './edit-screen/edit-screen.component';
import { JobEditComponent } from './edit-screen/job-edit/job-edit.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { AuthGuard } from './core/auth.guard';
import { ProjectDashboardComponent } from './routing-elements/projects-dashboard/projects-dashboard.component';
import { PostsTableComponent } from './routing-elements/posts-table/posts-table.component';
import { IntroEditComponent } from './edit-screen/intro-edit/intro-edit.component';
import { ProjectsEditComponent } from './edit-screen/projects-edit/projects-edit.component';
import { PostsEditComponent } from './edit-screen/posts-edit/posts-edit.component';

const routes: Routes = [
    {path: '', redirectTo: 'news', pathMatch: 'full'},
    {path: 'news', component: IntroductionDashboardComponent},
    {path: 'aboutme', component: JobsDashboardComponent},
    {path: 'projects', component: ProjectDashboardComponent},
    {path: 'posts', component: PostsTableComponent},
    {path: 'login', component: LoginScreenComponent},
    {path: 'edit', component: EditScreenComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
        {path: 'news', component: IntroEditComponent},
        {path: 'aboutme', component: JobEditComponent},
        {path: 'projects', component: ProjectsEditComponent},
        {path: 'posts', component: PostsEditComponent}
    ]},
    { path: '**', redirectTo: 'news', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
    
}
