import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { of } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { EditDataService } from '../../../core/edit-data/edit-data.service';
import { IntroId, IntroFirebaseService } from 'src/app/core/firebase/intro.service';


@Component({
  selector: 'app-intro-edit',
  templateUrl: './intro-edit.component.html',
  styleUrls: ['./intro-edit.component.css']
})
export class IntroEditComponent implements OnInit {
  @ViewChild(FileUploadComponent, {static: true}) fileUpload: FileUploadComponent;
  

  introForm: FormGroup;
  loading = false;

  folderName = "introImage";
  fileName = "intro_image";
  titleDropdown = "Upload Image";
  subtitleDropdown = "Choose a photo to upload...";
  imageTitleDropdown = "Header Image";
  imageSubtitleDropdown = "Image shown in the header of the article";
  url: string = "nothing";

  id: string;

  introFormTemplate = {
    title: ['', Validators.required],
    title_en: ['', Validators.required],
    description: ['', Validators.required],
    description_en: ['', Validators.required],
    url: [''],
    loaded: [false],
    timestamp: new Date(),
    image: ''//['', Validators.required]
  }


  constructor(private tfs: IntroFirebaseService, private fb: FormBuilder, private editData: EditDataService, public snackBar: MatSnackBar) {

   }

  ngOnInit() {
    this.introForm = this.fb.group(this.introFormTemplate);

    this.editData.currentIntro.subscribe((entry: IntroId) => {
      if(entry != null){
        this.id = entry.id;
        const title_en = entry.title_en ? entry.title_en : "";
        const description_en = entry.description_en ? entry.description_en : "";
        var { id, ...entryEdit } = entry;
        const entryEditEn = {title_en, description_en, ...entryEdit}
        this.introForm.setValue(entryEditEn);
        this.fileUpload.downloadURL =  of(entryEditEn.image);
      }
        
    })

  }

  async submitHandlerIntro() {

    this.loading = true;
    const formValue = this.introForm.value;
    try {
      if (this.id != null) {
        var id: string = this.id;
        var customEntry: IntroId = { id, ...formValue };
        customEntry.loaded = false;
        await this.tfs.updateIntroEntry(customEntry);
      } else {
        await this.tfs.addIntroEntry(formValue);
      }
      this.resetForm();
      
      this.openSnackBar("Entrada actualizada correctamente");
      setTimeout(() => { this.loading = false; }, 1000);

    } catch (err) {
      console.log(err)
      this.loading = false;
    }

  }

  resetForm() {
    this.introForm.reset();
      this.fileUpload.resetData();
      this.introForm = this.fb.group(this.introFormTemplate)
      this.id = null;
      this.editData.editIntroSource(null);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Ok", {
      duration: 2000,
    });
  }


}

