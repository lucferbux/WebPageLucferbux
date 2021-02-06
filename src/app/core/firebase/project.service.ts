import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class ProjectFirebaseService {


    projectCollection: AngularFirestoreCollection<Project>; //Given collection in the backend firestore ddbb
    project: Observable<Project[]>; //Object observable who will store the data


    constructor(private afs: AngularFirestore) {
        this.projectCollection = this.afs.collection('project', ref => {
            return ref.orderBy('date', 'desc')
        })
    }
    retreiveProject() {
        return this.project = this.projectCollection.snapshotChanges().pipe(
            map(projectEntries => projectEntries.map(a => {
                const data = a.payload.doc.data() as Project;
                if (data.version == null) {
                    data.version = "";
                }
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }

    addProjectEntry(project: Project) {
        return this.projectCollection.add(project);
    }

    updateProjectEntry(project: ProjectId) {
        const newValue: Project = project;
        this.projectCollection.doc(project.id).update(newValue);
    }

    removeProjectEntry(project: ProjectId) {
        this.projectCollection.doc(project.id).delete();
    }


}


export interface Project {
    title: string;
    title_en: string
    description: string;
    description_en: string;
    date: firestore.Timestamp;
    featured: boolean;
    version: string;
    tags: string;
    link: string;
}

export interface ProjectId extends Project {
    id: string;
}