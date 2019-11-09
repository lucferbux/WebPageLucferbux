import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirestoreSettingsToken} from '@angular/fire/firestore';
import { CoreModule } from './core/core.module'
import { ImageCropperModule } from 'ngx-image-cropper';
import { HttpClientModule } from '@angular/common/http';



export const firebaseConfig = environment.firebaseConfig; // Added for importing firebase configuration

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavLucferbuxComponent } from './nav-lucferbux/nav-lucferbux.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IntroductionDashboardComponent } from './routing-elements/introduction-dashboard/introduction-dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { JobsDashboardComponent } from './routing-elements/jobs-dashboard/jobs-dashboard.component';
import { environment } from '../environments/environment';
import { EditScreenComponent } from './edit-screen/edit-screen.component';
import { JobEditComponent } from './edit-screen/job-edit/job-edit.component';
import { DropZoneDirective } from './edit-screen/file-upload/drop-zone.directive';
import { FileUploadComponent, ImageEditComponentSheet } from './edit-screen/file-upload/file-upload.component';
import { FileSizePipe } from './edit-screen/file-upload/file-size.pipe';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { ProjectDashboardComponent } from './routing-elements/projects-dashboard/projects-dashboard.component';
import { PostsTableComponent } from './routing-elements/posts-table/posts-table.component';
import { IntroEditComponent} from './edit-screen/intro-edit/intro-edit.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ProjectsEditComponent } from './edit-screen/projects-edit/projects-edit.component';
import { PostsEditComponent } from './edit-screen/posts-edit/posts-edit.component';
import {CdkDetailRowDirective} from './cdk-detail-row.directive';



@NgModule({
  declarations: [
    AppComponent,
    NavLucferbuxComponent,
    IntroductionDashboardComponent,
    JobsDashboardComponent,
    ProjectDashboardComponent,
    EditScreenComponent,
    JobEditComponent,
    DropZoneDirective,
    FileUploadComponent,
    FileSizePipe,
    LoginScreenComponent,
    PostsTableComponent,
    PostsTableComponent,
    CdkDetailRowDirective,
    IntroEditComponent,
    ImageEditComponentSheet,
    PostsEditComponent,
    ProjectsEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ImageCropperModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    CoreModule, 
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }],
  entryComponents: [IntroEditComponent, ImageEditComponentSheet],
  bootstrap: [AppComponent]
})
export class AppModule { }
