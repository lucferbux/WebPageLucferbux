import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IntroId } from '../firebase/intro.service';
import { JobId } from '../firebase/jobs.service';
import { ProjectId } from '../firebase/project.service';
import { PostId } from '../firebase/post.service';

@Injectable({
  providedIn: 'root'
})
export class EditDataService {
  //Send information to edit to page of edit
  job: JobId = null;
  intro: IntroId = null;
  project: ProjectId = null;
  post: PostId = null;

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
