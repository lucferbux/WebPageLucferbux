import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IntroFirebaseService {

  introCollection: AngularFirestoreCollection<Intro>;
  intro: Observable<Intro[]>;

  constructor(private afs: AngularFirestore) {
    this.introCollection = this.afs.collection('intro', ref => {
      return ref.orderBy('timestamp', 'desc')
    })
  }

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
}

export interface Intro {
    title: string;
    title_en: string;
    description: string;
    description_en: string;
    url: string;
    image: string;
    timestamp: Date;
    loaded: boolean;
}

export interface IntroId extends Intro {
    id: string;
}