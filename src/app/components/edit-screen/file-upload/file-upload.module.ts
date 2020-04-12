import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropZoneDirective } from './drop-zone.directive';
import { FileSizePipe } from './file-size.pipe';
import { FileUploadComponent, ImageEditComponentSheet } from './file-upload.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatCardModule, MatDividerModule, MatProgressBarModule, MatIconModule } from '@angular/material';



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
