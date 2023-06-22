import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { EditDataService } from '../../../core/edit-data/edit-data.service';
import { of } from 'rxjs';
import { PostFirebaseService, PostId } from 'src/app/core/firebase/post.service';


@Component({
  selector: 'app-posts-edit',
  templateUrl: './posts-edit.component.html',
  styleUrls: ['./posts-edit.component.css']
})
export class PostsEditComponent implements OnInit {

  @ViewChild(FileUploadComponent, {static: true}) fileUpload: FileUploadComponent;

  postForm: FormGroup;
  loading = false;

  folderName = "postImage";
  fileName = "post_image";
  titleDropdown = "Upload Image";
  subtitleDropdown = "Select a photo to upload...";
  imageTitleDropdown = "Preview of the header";
  imageSubtitleDropdown = "Image that show the preview of the header";
  url: string = "nothing";

  id: string;

  postFormTemplate = {
    title: ['', Validators.required],
    title_en: ['', Validators.required],
    description: ['', Validators.required],
    description_en: ['', Validators.required],
    link: ['', Validators.required],
    internalLink: [''],
    loaded: [false],
    date: [new Date, Validators.required],
    image: ''
  }

  constructor(private tfs: PostFirebaseService, private fb: FormBuilder, private editData: EditDataService, public snackBar: MatSnackBar) { }


  ngOnInit() {
    this.postForm = this.fb.group(this.postFormTemplate);

    this.editData.currentPost.subscribe((entry: PostId) => {
      if (entry != null) {
        this.id = entry.id;
        this.postForm.get('title').patchValue(entry.title);
        this.postForm.get('description').patchValue(entry.description);
        this.postForm.get('title_en').patchValue(entry.title_en);
        this.postForm.get('description_en').patchValue(entry.description_en);
        this.postForm.get('link').patchValue(entry.link);
        this.postForm.get('internalLink').patchValue(entry.internalLink);
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
    this.postForm = this.fb.group(this.postFormTemplate);
    this.id = null;
    this.editData.editPostSource(null);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Ok", {
      duration: 2000,
    });
  }




}
