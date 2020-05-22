import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditDataService } from '../../../core/edit-data/edit-data.service';
import { ProjectFirebaseService, ProjectId } from 'src/app/core/firebase/project.service';



@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.css']
})
export class ProjectsEditComponent implements OnInit {

  projectForm: FormGroup;
  loading = false;

  id: string;

  projectFormTemplate = {
    title: ['', Validators.required],
    title_en: ['', Validators.required],
    description: ['', Validators.required],
    description_en: ['', Validators.required],
    link: ['', Validators.required],
    version: [''],
    date: [new Date, Validators.required],
  }

  constructor(private tfs: ProjectFirebaseService, private fb: FormBuilder, private editData: EditDataService, public snackBar: MatSnackBar) { }


  ngOnInit() {
    this.projectForm = this.fb.group(this.projectFormTemplate);

    this.editData.currentProject.subscribe((entry: ProjectId) => {
      
      if (entry != null) {
        this.id = entry.id;
        this.projectForm.get('title').patchValue(entry.title);
        this.projectForm.get('description').patchValue(entry.description);
        this.projectForm.get('title_en').patchValue(entry.title_en);
        this.projectForm.get('description_en').patchValue(entry.description_en);
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
    this.projectForm = this.fb.group(this.projectFormTemplate);
    this.id = null;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Ok", {
      duration: 2000,
    });
  }




}
