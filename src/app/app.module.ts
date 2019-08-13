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

import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IntroductionDashboardComponent } from './routing-elements/introduction-dashboard/introduction-dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { TeamDashboardComponent } from './routing-elements/team-dashboard/team-dashboard.component';
import { environment } from '../environments/environment';
import { EditScreenComponent } from './edit-screen/edit-screen.component';
import { TeamEditComponent } from './edit-screen/team-edit/team-edit.component';
import { DropZoneDirective } from './edit-screen/file-upload/drop-zone.directive';
import { FileUploadComponent, ImageEditComponentSheet } from './edit-screen/file-upload/file-upload.component';
import { FileSizePipe } from './edit-screen/file-upload/file-size.pipe';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { ProjectsTableComponent } from './routing-elements/projects-table/projects-table.component';
import { PatentsTableComponent } from './routing-elements/patents-table/patents-table.component';
import { DisseminationTableComponent } from './routing-elements/dissemination-table/dissemination-table.component';
import { DisseminationPageComponent } from './routing-elements/dissemination-page/dissemination-page.component';
import { IntroEditComponent} from './edit-screen/intro-edit/intro-edit.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ProjectsEditComponent } from './edit-screen/projects-edit/projects-edit.component';
import { PatentsEditComponent } from './edit-screen/patents-edit/patents-edit.component';
import { InstaPipeComponent } from './insta-pipe/insta-pipe.component';




@NgModule({
  declarations: [
    AppComponent,
    NavLucferbuxComponent,
    IntroductionDashboardComponent,
    TeamDashboardComponent,
    EditScreenComponent,
    TeamEditComponent,
    DropZoneDirective,
    FileUploadComponent,
    FileSizePipe,
    LoginScreenComponent,
    ProjectsTableComponent,
    PatentsTableComponent,
    DisseminationTableComponent,
    DisseminationPageComponent,
    //ImageCropperComponent,
    IntroEditComponent,
    ImageEditComponentSheet,
    ProjectsEditComponent,
    PatentsEditComponent,
    InstaPipeComponent
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
