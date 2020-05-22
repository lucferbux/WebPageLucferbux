import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { EditDataService } from '../../../core/edit-data/edit-data.service';
import { of } from 'rxjs';
import { JobsFirebaseService, JobId } from 'src/app/core/firebase/jobs.service';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {

  @ViewChild(FileUploadComponent, {static: true}) fileUpload: FileUploadComponent;

  jobForm: FormGroup
  loading = false;

  folderName = "avatar"
  fileName = "job_avatar"
  titleDropdown = "Upload Avatar"
  subtitleDropdown = "Elige una foto para subir..."

  id: string;

  jobFormTemplate = {
    name: ['', Validators.required],
    name_en: ['', Validators.required],
    description: ['', Validators.required],
    description_en: ['', Validators.required],
    avatar: ['', Validators.required],
    loaded: [false],
    job: ['', Validators.required],
    job_en: ['', Validators.required],
    importance: [0, [Validators.required, Validators.min(1)]]
  }

  constructor(private tfs: JobsFirebaseService, private fb: FormBuilder, private editData: EditDataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.jobForm = this.fb.group(this.jobFormTemplate);

    this.editData.currentJob.subscribe((entry: JobId) => {
      if (entry != null) {
        this.id = entry.id;
        const name_en = entry.name_en ? entry.name_en : "";
        const description_en = entry.description_en ? entry.description_en : "";
        const job_en = entry.job_en ? entry.job_en : "";
        var { id, ...entryEdit } = entry;
        const entryEditEn = {name_en, description_en, job_en, ...entryEdit}
        this.jobForm.setValue(entryEditEn);
        this.fileUpload.downloadURL = of(entryEditEn.avatar);
      }

    })
  }

  async submitHandlerJob() {

    this.loading = true;
    const formValue = this.jobForm.value;
    try {
      if (this.id != null) {
        var id: string = this.id;
        var customEntry: JobId = { id, ...formValue };
        customEntry.loaded = false;
        await this.tfs.updateJobMember(customEntry);
      } else {
        await this.tfs.addJobMember(formValue);
      }
      this.resetForm();
      this.openSnackBar("Campo actualizado correctamente")
      setTimeout(() => { this.loading = false; }, 1000)

    } catch (err) {
      console.log(err)
      this.loading = false;
    }

  }

  resetForm() {
    this.jobForm.reset();
    this.fileUpload.resetData();
    this.jobForm = this.fb.group(this.jobFormTemplate)
    this.id = null;
    this.editData.editJobSource(null);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Ok", {
      duration: 2000,
    });
  }


}




