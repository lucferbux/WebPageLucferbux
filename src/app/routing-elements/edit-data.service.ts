import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JobId } from '../model/jobs'
import { IntroId } from '../model/intro'
import { ProjectId } from '../model/project'
import { PostId } from '../model/post'

@Injectable({
  providedIn: 'root'
})
export class EditDataService {
  //Send information to edit to page of edit
  job: JobId;
  intro: IntroId;
  project: ProjectId;
  post: PostId;

  private introSource = new BehaviorSubject(this.intro);
  currentIntro = this.introSource.asObservable();

  private jobSource = new BehaviorSubject(this.job);
  currentJob = this.jobSource.asObservable();

  private projectSource = new BehaviorSubject(this.project);
  currentProject = this.projectSource.asObservable();

  private postSource = new BehaviorSubject(this.post);
  currentPost = this.postSource.asObservable();  

  constructor() { }

  editIntroSource( entry: IntroId) {
    this.introSource.next(entry);
  }

  editJobSource(job: JobId) {
    this.jobSource.next(job);
  }

  editProjectSource(project: ProjectId) {
    this.projectSource.next(project);
  }

  editPostSource(post: PostId) {
    this.postSource.next(post);
  }
}
