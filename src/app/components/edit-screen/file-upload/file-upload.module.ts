import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropZoneDirective } from './drop-zone.directive';
import { FileSizePipe } from './file-size.pipe';
import { FileUploadComponent, ImageEditComponentSheet } from './file-upload.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  imports: [
    CommonModule,
    ImageCropperModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatIconModule
  ],
  exports: [
    FileUploadComponent
  ],
  declarations: [
    DropZoneDirective,
    FileSizePipe,
    FileUploadComponent,
    ImageEditComponentSheet
  ],
  entryComponents: [ImageEditComponentSheet],
})
export class FileUploadModule { }
