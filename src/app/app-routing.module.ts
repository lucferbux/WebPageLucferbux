import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IntroductionDashboardComponent} from "./components/routing-elements/introduction-dashboard/introduction-dashboard.component";
import { JobsDashboardComponent } from './components/routing-elements/jobs-dashboard/jobs-dashboard.component';
import { EditScreenComponent } from './components/edit-screen/edit-screen.component';
import { JobEditComponent } from './components/edit-screen/job-edit/job-edit.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { AuthGuard } from './core/auth/auth.guard';
import { ProjectDashboardComponent } from './components/routing-elements/projects-dashboard/projects-dashboard.component';
import { PostsTableComponent } from './components/routing-elements/posts-table/posts-table.component';
import { IntroEditComponent } from './components/edit-screen/intro-edit/intro-edit.component';
import { ProjectsEditComponent } from './components/edit-screen/projects-edit/projects-edit.component';
import { PostsEditComponent } from './components/edit-screen/posts-edit/posts-edit.component';
import { LandingPageComponent } from './components/routing-elements/landing-page/landing-page.component';
import { PostDashboardComponent } from './components/routing-elements/post-dashboard/post-dashboard.component';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: LandingPageComponent},
    {path: 'news', component: IntroductionDashboardComponent},
    {path: 'aboutme', component: JobsDashboardComponent},
    {path: 'projects', component: ProjectDashboardComponent},
    {path: 'posts', component: PostDashboardComponent},
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
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})

export class AppRoutingModule {
    
}
