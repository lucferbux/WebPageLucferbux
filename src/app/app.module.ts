import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SETTINGS } from '@angular/fire/firestore';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module'

import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavLucferbuxComponent } from './shared/nav-lucferbux/nav-lucferbux.component';
import { LayoutModule } from '@angular/cdk/layout';

import { FileUploadModule } from './components/edit-screen/file-upload/file-upload.module'

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IntroductionDashboardComponent } from './components/routing-elements/introduction-dashboard/introduction-dashboard.component';
import { LandingPageComponent } from './components/routing-elements/landing-page/landing-page.component';
import { AppRoutingModule } from './app-routing.module';
import { JobsDashboardComponent } from './components/routing-elements/jobs-dashboard/jobs-dashboard.component';

import { EditScreenComponent } from './components/edit-screen/edit-screen.component';
import { JobEditComponent } from './components/edit-screen/job-edit/job-edit.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { ProjectDashboardComponent } from './components/routing-elements/projects-dashboard/projects-dashboard.component';
import { PostsTableComponent } from './components/routing-elements/posts-table/posts-table.component';
import { IntroEditComponent} from './components/edit-screen/intro-edit/intro-edit.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ProjectsEditComponent } from './components/edit-screen/projects-edit/projects-edit.component';
import { PostsEditComponent } from './components/edit-screen/posts-edit/posts-edit.component';
import { FirestoreTranslator } from './core/internationalization/firebase-translator.pipe';
import { PostDashboardComponent } from './components/routing-elements/post-dashboard/post-dashboard.component';
import { SharedModule } from './shared/shared.module';
import { HttpClient } from '@angular/common/http';

export const firebaseConfig = environment.firebaseConfig; // Added for importing firebase configuration

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    NavLucferbuxComponent,
    IntroductionDashboardComponent,
    LandingPageComponent,
    JobsDashboardComponent,
    ProjectDashboardComponent,
    EditScreenComponent,
    JobEditComponent,
    LoginScreenComponent,
    PostsTableComponent,
    PostsTableComponent,
    PostDashboardComponent,
    IntroEditComponent,
    PostsEditComponent,
    ProjectsEditComponent,
    FirestoreTranslator
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    CoreModule, 
    SharedModule,
    FileUploadModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [{ provide: SETTINGS, useValue: {} }],
  entryComponents: [IntroEditComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
