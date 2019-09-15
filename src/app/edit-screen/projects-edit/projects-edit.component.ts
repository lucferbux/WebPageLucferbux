import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../firebase.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { EditDataService } from '../../routing-elements/edit-data.service';
import { ProjectId, Project } from '../../model/project';



@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    //{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    //{provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class ProjectsEditComponent implements OnInit {

  projectForm: FormGroup;
  loading = false;

  id: string;

  constructor(private tfs: FirebaseService, private fb: FormBuilder, private editData: EditDataService, public snackBar: MatSnackBar, private adapter: DateAdapter<any>) { }


  ngOnInit() {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      link: ['', Validators.required],
      version: [''],
      date: [new Date, Validators.required],
    })

    this.editData.currentProject.subscribe((entry: ProjectId) => {
      
      if (entry != null) {
        this.id = entry.id;
        this.projectForm.get('title').patchValue(entry.title);
        this.projectForm.get('description').patchValue(entry.description);
        this.projectForm.get('link').patchValue(entry.link);
        this.projectForm.get('version').patchValue(entry.version);
        const test = new Date((new Date(entry.date.seconds * 1000).getTime() - 3888000000));
        this.projectForm.get('date').patchValue(test);
      }
    })
  }

  async submitHandleProject() {

    this.loading = true;
    const formValue = this.projectForm.value;
    try {
      if (this.id != null) {
        var id: string = this.id;
        var customEntry: ProjectId = { id, ...formValue };
        await this.tfs.updateProjectEntry(customEntry);
      } else {
        await this.tfs.addProjectEntry(formValue);
      }
      this.resetForm();
      this.openSnackBar("Proyecto creado correctamente")
      setTimeout(() => { this.loading = false; }, 1000)

    } catch (err) {
      console.log(err)
      this.loading = false;
    }

  }

  resetForm() {
    this.projectForm.reset();
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      link: ['', Validators.required],
      version: [''],
      date: [new Date, Validators.required],
    })
    this.id = null;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Ok", {
      duration: 2000,
    });
  }




}
