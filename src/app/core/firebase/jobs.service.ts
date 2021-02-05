import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobsFirebaseService {

    jobCollection: AngularFirestoreCollection<Job>; //Given collection in the backend firestore ddbb
    job: Observable<Job[]>; //Object observable who will store the data
   
    constructor(private afs: AngularFirestore) {
      this.jobCollection = this.afs.collection('team', ref => {
        return ref.orderBy('importance')
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
    
}

export interface Job {
    name: string;
    name_en: string;
    description: string;
    description_en: string;
    avatar: string;
    loaded: boolean;
    job: string;
    job_en: string;
    icon: string;
    importance: number;
}

export interface JobId extends Job {
    id: string;
}