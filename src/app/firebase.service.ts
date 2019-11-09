import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { Intro, IntroId } from './model/intro';
import { Job, JobId } from './model/jobs';
import { Project, ProjectId } from './model/project';
import { Post, PostId } from './model/post';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  jobCollection: AngularFirestoreCollection<Job>; //Given collection in the backend firestore ddbb
  job: Observable<Job[]>; //Object observable who will store the data
  introCollection: AngularFirestoreCollection<Intro>;
  intro: Observable<Intro[]>;
  projectCollection: AngularFirestoreCollection<Project>; //Given collection in the backend firestore ddbb
  project: Observable<Project[]>; //Object observable who will store the data
  postCollection: AngularFirestoreCollection<Post>;
  post: Observable<Post[]>;


  constructor(private afs: AngularFirestore) {
    this.jobCollection = this.afs.collection('team', ref => {
      return ref.orderBy('importance')
    })

    this.introCollection = this.afs.collection('intro', ref => {
      return ref.orderBy('timestamp', 'desc')
    })

    this.projectCollection = this.afs.collection('project', ref =>  {
      return ref.orderBy('date', 'desc')
    })

    this.postCollection = this.afs.collection('patent', ref => {
      return ref.orderBy('date', 'desc')
    })
  }

  // JOB DATA
  retreiveJob() {
    return this.job = this.jobCollection.snapshotChanges().pipe(
      map(jobMembers => jobMembers.map(a => {
        const data = a.payload.doc.data() as Job;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  addJobMember(job: Job) {
    this.jobCollection.add(job);
  }

  updateJobMember(job: JobId) {
    const newValue: Job = job;
    this.jobCollection.doc(job.id).update(newValue);
  } 

  removeJobEntry(job: JobId) {
    this.jobCollection.doc(job.id).delete();
  }

  // INTRO DATA
  retreiveIntro() {
    return this.intro = this.introCollection.snapshotChanges().pipe(
      map(introEntries => introEntries.map(a => {
        const data = a.payload.doc.data() as Intro;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  addIntroEntry(entry: Intro){
    return this.introCollection.add(entry);
  }

  updateIntroEntry(entry: IntroId) {
    const newValue: Intro = entry;
    this.introCollection.doc(entry.id).update(newValue);
  } 

  removeIntroEntry(entry: IntroId) {
    this.introCollection.doc(entry.id).delete();
  }


    // PROJECT DATA
    retreiveProject() {
      return this.project = this.projectCollection.snapshotChanges().pipe(
        map(projectEntries => projectEntries.map(a => {
          const data = a.payload.doc.data() as Project;
          if(data.version == null) {
            data.version = "";
          }
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
    }
  
    addProjectEntry(project: Project){
      return this.projectCollection.add(project);
    }
  
    updateProjectEntry(project: ProjectId) {
      const newValue: Project = project;
      this.projectCollection.doc(project.id).update(newValue);
    } 
  
    removeProjectEntry(project: ProjectId) {
      this.projectCollection.doc(project.id).delete();
    }

    // PATENT DATA
    retreivePost() {
      return this.post = this.postCollection.snapshotChanges().pipe(
        map(postEntries => postEntries.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return {id, ...data};
        }))
      );
    }

    addPostEntry(post: Post) {
      this.postCollection.add(post);
    }

    updatePostEntry(post: PostId) {
      const newValue: Post = post;
      this.postCollection.doc(post.id).update(newValue);
    }

    removePostEntry(post: PostId) {
      this.postCollection.doc(post.id).delete();
    }


}
