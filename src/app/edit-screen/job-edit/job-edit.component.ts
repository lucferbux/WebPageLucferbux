import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirebaseService } from '../../firebase.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { EditDataService } from '../../routing-elements/edit-data.service';
import { JobId, Job } from '../../model/jobs';
import { of } from 'rxjs';

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
  titleDropdown = "Subir Avatar"
  subtitleDropdown = "Elige una foto para subir..."

  id: string;

  constructor(private tfs: FirebaseService, private fb: FormBuilder, private editData: EditDataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.jobForm = this.fb.group({
      name: ['', Validators.required],
      cols: [1, [Validators.required, Validators.min(1)]],
      rows: [1, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      avatar: ['', Validators.required],
      loaded: [''],
      job: ['', Validators.required],
      importance: [0, [Validators.required, Validators.min(1)]]
    })

    this.editData.currentJob.subscribe((entry: JobId) => {
      if (entry != null) {
        this.id = entry.id;
        var { id, ...entryEdit } = entry;
        this.jobForm.setValue(entryEdit);
        this.fileUpload.downloadURL = of(entryEdit.avatar);
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
    this.jobForm = this.fb.group({
      name: ['', Validators.required],
      cols: [1, [Validators.required, Validators.min(1)]],
      rows: [1, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      avatar: ['', Validators.required],
      job: ['', Validators.required],
      importance: [0, [Validators.required, Validators.min(1)]]
    })
    this.id = null;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Ok", {
      duration: 2000,
    });
  }


}




