import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirebaseService } from '../../firebase.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { EditDataService } from '../../routing-elements/edit-data.service';
import { TeamId, Team } from '../../model/team';
import { of } from 'rxjs';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {

  @ViewChild(FileUploadComponent, {static: true}) fileUpload: FileUploadComponent;

  teamForm: FormGroup
  loading = false;

  folderName = "avatar"
  fileName = "team_avatar"
  titleDropdown = "Subir Avatar"
  subtitleDropdown = "Elige una foto para subir..."

  id: string;

  constructor(private tfs: FirebaseService, private fb: FormBuilder, private editData: EditDataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      cols: [1, [Validators.required, Validators.min(1)]],
      rows: [1, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      avatar: ['', Validators.required],
      job: ['', Validators.required],
      importance: [0, [Validators.required, Validators.min(1)]]
    })

    this.editData.currentTeam.subscribe((entry: TeamId) => {
      if (entry != null) {
        this.id = entry.id;
        var { id, ...entryEdit } = entry;
        this.teamForm.setValue(entryEdit);
        this.fileUpload.downloadURL = of(entryEdit.avatar);
      }

    })
  }

  async submitHandlerTeam() {

    this.loading = true;
    const formValue = this.teamForm.value;
    try {
      if (this.id != null) {
        var id: string = this.id;
        var customEntry: TeamId = { id, ...formValue };
        await this.tfs.updateTeamMember(customEntry);
      } else {
        await this.tfs.addTeamMember(formValue);
      }
      this.resetForm();
      this.openSnackBar("Usuario creado correctamente")
      setTimeout(() => { this.loading = false; }, 1000)

    } catch (err) {
      console.log(err)
      this.loading = false;
    }

  }

  resetForm() {
    this.teamForm.reset();
    this.fileUpload.resetData();
    this.teamForm = this.fb.group({
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




