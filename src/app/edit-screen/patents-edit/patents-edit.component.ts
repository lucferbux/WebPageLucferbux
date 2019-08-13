import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirebaseService } from '../../firebase.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { EditDataService } from '../../routing-elements/edit-data.service';
import { PatentId } from '../../model/patent';
import { of } from 'rxjs';


@Component({
  selector: 'app-patents-edit',
  templateUrl: './patents-edit.component.html',
  styleUrls: ['./patents-edit.component.css'],
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
export class PatentsEditComponent implements OnInit {

  @ViewChild(FileUploadComponent, {static: true}) fileUpload: FileUploadComponent;

  patentForm: FormGroup;
  loading = false;

  folderName = "patentImage";
  fileName = "patent_image";
  titleDropdown = "Subir Imagen";
  subtitleDropdown = "Elige una foto para subir...";
  imageTitleDropdown = "Preview de la cabecera";
  imageSubtitleDropdown = "Imagen que mostrará la preview de la cabecera";
  url: string = "nothing";

  id: string;

  constructor(private tfs: FirebaseService, private fb: FormBuilder, private editData: EditDataService, public snackBar: MatSnackBar, private adapter: DateAdapter<any>) { }


  ngOnInit() {
    this.patentForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      link: ['', Validators.required],
      date: [new Date, Validators.required],
      image: ''
    })

    this.editData.currentPatent.subscribe((entry: PatentId) => {
      if (entry != null) {
        this.id = entry.id;
        var { id, ...entryEdit } = entry;
        this.patentForm.setValue(entryEdit);
        this.fileUpload.downloadURL =  of(entryEdit.image);
      }

    })
  }

  async submitHandlerPatent() {

    this.loading = true;
    const formValue = this.patentForm.value;
    try {
      if (this.id != null) {
        var id: string = this.id;
        var customEntry: PatentId = { id, ...formValue };
        await this.tfs.updatePatentEntry(customEntry);
      } else {
        await this.tfs.addPatentEntry(formValue);
      }
      this.resetForm();
      this.openSnackBar("Articulo creado correctamente")
      setTimeout(() => { this.loading = false; }, 1000)

    } catch (err) {
      console.log(err)
      this.loading = false;
    }

  }

  resetForm() {
    this.patentForm.reset();
    this.patentForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      link: ['', Validators.required],
      date: [new Date, Validators.required],
      image: ''
    })
    this.id = null;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Ok", {
      duration: 2000,
    });
  }




}
