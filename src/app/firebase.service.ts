import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { Intro, IntroId } from './model/intro';
import { Team, TeamId } from './model/team';
import { Project, ProjectId } from './model/project';
import { Patent, PatentId } from './model/patent';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  teamCollection: AngularFirestoreCollection<Team>; //Given collection in the backend firestore ddbb
  team: Observable<Team[]>; //Object observable who will store the data
  introCollection: AngularFirestoreCollection<Intro>;
  intro: Observable<Intro[]>;
  projectCollection: AngularFirestoreCollection<Project>; //Given collection in the backend firestore ddbb
  project: Observable<Project[]>; //Object observable who will store the data
  patentCollection: AngularFirestoreCollection<Patent>;
  patent: Observable<Patent[]>;


  constructor(private afs: AngularFirestore) {
    this.teamCollection = this.afs.collection('team', ref => {
      return ref.orderBy('importance')
    })

    this.introCollection = this.afs.collection('intro', ref => {
      return ref.orderBy('timestamp', 'desc')
    })

    this.projectCollection = this.afs.collection('project', ref =>  {
      return ref.orderBy('date', 'desc')
    })

    this.patentCollection = this.afs.collection('patent', ref => {
      return ref.orderBy('date', 'desc')
    })
  }

  // TEAM DATA
  retreiveTeam() {
    return this.team = this.teamCollection.snapshotChanges().pipe(
      map(teamMembers => teamMembers.map(a => {
        const data = a.payload.doc.data() as Team;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  addTeamMember(team: Team) {
    this.teamCollection.add(team);
  }

  updateTeamMember(team: TeamId) {
    const newValue: Team = team;
    this.teamCollection.doc(team.id).update(newValue);
  } 

  removeTeamEntry(team: TeamId) {
    this.teamCollection.doc(team.id).delete();
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
    retreivePatent() {
      return this.patent = this.patentCollection.snapshotChanges().pipe(
        map(patentEntries => patentEntries.map(a => {
          const data = a.payload.doc.data() as Patent;
          const id = a.payload.doc.id;
          return {id, ...data};
        }))
      );
    }

    addPatentEntry(patent: Patent) {
      this.patentCollection.add(patent);
    }

    updatePatentEntry(patent: PatentId) {
      const newValue: Patent = patent;
      this.patentCollection.doc(patent.id).update(newValue);
    }

    removePatentEntry(patent: PatentId) {
      this.patentCollection.doc(patent.id).delete();
    }


}
