import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirebaseService } from '../../firebase.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { EditDataService } from '../../routing-elements/edit-data.service';
import { PostId } from '../../model/post';
import { of } from 'rxjs';


@Component({
  selector: 'app-posts-edit',
  templateUrl: './posts-edit.component.html',
  styleUrls: ['./posts-edit.component.css'],
  providers: [
     // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    //{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    //{provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class PostsEditComponent implements OnInit {

  @ViewChild(FileUploadComponent, {static: true}) fileUpload: FileUploadComponent;

  postForm: FormGroup;
  loading = false;

  folderName = "postImage";
  fileName = "post_image";
  titleDropdown = "Subir Imagen";
  subtitleDropdown = "Elige una foto para subir...";
  imageTitleDropdown = "Preview de la cabecera";
  imageSubtitleDropdown = "Imagen que mostrará la preview de la cabecera";
  url: string = "nothing";

  id: string;

  constructor(private tfs: FirebaseService, private fb: FormBuilder, private editData: EditDataService, public snackBar: MatSnackBar, private adapter: DateAdapter<any>) { }


  ngOnInit() {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      link: ['', Validators.required],
      loaded: [false],
      date: [new Date, Validators.required],
      image: ''
    })

    this.editData.currentPost.subscribe((entry: PostId) => {
      if (entry != null) {
        this.id = entry.id;
        this.postForm.get('title').patchValue(entry.title);
        this.postForm.get('description').patchValue(entry.description);
        this.postForm.get('link').patchValue(entry.link);
        this.postForm.get('image').patchValue(entry.image);
        const test = new Date((new Date(entry.date.seconds * 1000).getTime() - 3888000000));
        this.postForm.get('date').patchValue(test);
        this.fileUpload.downloadURL =  of(entry.image);
      }

    })
  }

  async submitHandlerPost() {

    this.loading = true;
    const formValue = this.postForm.value;
    try {
      if (this.id != null) {
        var id: string = this.id;
        var customEntry: PostId = { id, ...formValue };
        customEntry.loaded = false;
        await this.tfs.updatePostEntry(customEntry);
      } else {
        await this.tfs.addPostEntry(formValue);
      }
      this.resetForm();
      this.openSnackBar("Articulo actualizado correctamente")
      setTimeout(() => { this.loading = false; }, 1000)

    } catch (err) {
      console.log(err)
      this.loading = false;
    }

  }

  resetForm() {
    this.postForm.reset();
    this.fileUpload.resetData();
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      link: ['', Validators.required],
      loaded: [false],
      date: [new Date, Validators.required],
      image: ''
    })
    this.id = null;
    this.editData.editPostSource(null);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Ok", {
      duration: 2000,
    });
  }




}
