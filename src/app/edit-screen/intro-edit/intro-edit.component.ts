import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { of } from 'rxjs';
import { FirebaseService } from '../../firebase.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { EditDataService } from '../../routing-elements/edit-data.service';
import { IntroId, Intro } from '../../model/intro';

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
  titleDropdown = "Subir Imagen";
  subtitleDropdown = "Elige una foto para subir...";
  imageTitleDropdown = "Imagen de cabecera";
  imageSubtitleDropdown = "Imagen que se mostrará en la cabecera de la entrada";
  url: string = "nothing";

  id: string;

  constructor(private tfs: FirebaseService, private fb: FormBuilder, private editData: EditDataService, public snackBar: MatSnackBar) {

   }

  ngOnInit() {
    this.introForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      url: [''],
      loaded: [false],
      timestamp: new Date(),
      image: ''//['', Validators.required]
    })

    this.editData.currentIntro.subscribe((entry: IntroId) => {
      if(entry != null){
        this.id = entry.id;
        var { id, ...entryEdit } = entry;
        this.introForm.setValue(entryEdit);
        this.fileUpload.downloadURL =  of(entryEdit.image);
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
      this.introForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        url: [''],
        loaded: [false],
        timestamp: new Date(),
        image: ''//['', Validators.required]
      })
      this.id = null;
      this.editData.editIntroSource(null);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Ok", {
      duration: 2000,
    });
  }


}

