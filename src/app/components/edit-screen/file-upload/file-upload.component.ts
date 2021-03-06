import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild, Inject } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { tap ,  finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ImageSharingService } from './image-sharing.service'
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';



@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor { //ControlValueAccesor framework to forms
  // https://angularfirebase.com/lessons/firebase-storage-with-angularfire-dropzone-file-uploader/
  // Main task 
  task: AngularFireUploadTask;
  @Input() folder: string = "test";
  @Input() filename: string = "name_upload";
  @Input() title: string = "Upload File";
  @Input() subtitle: string = "Choose a file to upload";
  @Input() imageTitle: string = "Imagen de avatar";
  @Input() imageSubtitle: string = "Imagen que se mostrará en el avatar del perfil";
  @Input() widthCrop: number = 100;
  @Input() heightCrop: number = 100;
  @Input() avatarImage = true;
  // Progress monitoring
  percentage: Observable<number>;
  snapshot: Observable<any>;

  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;
  url: string = '';

  constructor(private storage: AngularFireStorage, private db: AngularFirestore, 
    private imageSharing: ImageSharingService, private bottomSheet: MatBottomSheet) {
    imageSharing.imageSelected.subscribe(
      (image: any) => this.startUpload(image)
    )
  }

  // function to store the registerOnChange method
  propagateChange = (_: any) => { };

  //Called when you instantiate a new FormControl (Value given this case empty string)
  writeValue(obj: any): void {
    if (obj !== undefined) {
      this.url = obj;
    }
  }

  // Called each time you want to change the property binded, in this case with the value of the url, assign the funcition to propagate change
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  // Called when there's a new touch event (not necessary here)
  registerOnTouched(fn: any): void {

  }

  //To set the property disabled when the form is disabled
  setDisabledState(isDisabled: boolean): void {
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }


  fileChangeListener(event: FileList) {
    const file = event.item(0)
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }
    this.imageSharing.image = file;
    this.bottomSheet.open(ImageEditComponentSheet, {
      data: {
        width: this.widthCrop,
        height: this.heightCrop
      }
    })
  }


  startUpload(image: any) {

    // The storage path
    const path = `${this.folder}/${new Date().getTime()}_${this.filename}`;


    // Totally optional metadata
    const customMetadata = { 
      app: 'Lucferbux Image',
      cacheControl: 'public, max-age=15552000',
      contentType: 'image/jpeg', 
      "Cache-Control": 'public, max-age=15552000' 
    };

    // The main task
    this.task = this.storage.upload(path, image, { customMetadata })

    

    const ref = this.storage.ref(path);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = ref.getDownloadURL();
        this.downloadURL.subscribe(url => {
          this.propagateChange(url);
        });
       } 
      )
    )
    .subscribe()
    // The file's download URL  

  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  resetData() {
    this.downloadURL = null;
    this.percentage = null;
    this.snapshot = null;
  }

}

import { ImageCroppedEvent } from 'ngx-image-cropper';
@Component({
  selector: 'app-image-edit-sheet',
  templateUrl: './image-edit.component-sheet.html',
  styleUrls: ['./file-upload.component.scss']
})
export class ImageEditComponentSheet {
  croppedImage: any;
  image: any;
  cropperReady = false;
  file: "base64";


  constructor(public bottomSheetRef: MatBottomSheetRef<ImageEditComponentSheet>, private sharingImage: ImageSharingService, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.image = this.sharingImage.image;
  }

 
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.b64toBlob(event.base64);
  }

  b64toBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
}

  imageLoaded() {
    this.cropperReady = true;
  }
  imageLoadFailed() {

  }

  uploadTrimmedImage() {
    this.sharingImage.imageSelected.emit(this.croppedImage);
    this.bottomSheetRef.dismiss();
  }
}