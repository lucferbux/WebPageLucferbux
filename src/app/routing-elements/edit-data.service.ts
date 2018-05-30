import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TeamId } from '../model/team'
import { IntroId } from '../model/intro'
import { ProjectId } from '../model/project'
import { PatentId } from '../model/patent'

@Injectable({
  providedIn: 'root'
})
export class EditDataService {
  //Send information to edit to page of edit
  team: TeamId;
  intro: IntroId;
  project: ProjectId;
  patent: PatentId;

  private introSource = new BehaviorSubject(this.intro);
  currentIntro = this.introSource.asObservable();

  private teamSource = new BehaviorSubject(this.team);
  currentTeam = this.teamSource.asObservable();

  private projectSource = new BehaviorSubject(this.project);
  currentProject = this.projectSource.asObservable();

  private patentSource = new BehaviorSubject(this.patent);
  currentPatent = this.patentSource.asObservable();  

  constructor() { }

  editIntroSource( entry: IntroId) {
    this.introSource.next(entry);
  }

  editTeamSource(team: TeamId) {
    this.teamSource.next(team);
  }

  editProjectSource(project: ProjectId) {
    this.projectSource.next(project);
  }

  editPatentSource(patent: PatentId) {
    this.patentSource.next(patent);
  }
}
