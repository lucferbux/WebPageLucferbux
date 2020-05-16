import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PostFirebaseService {

  postCollection: AngularFirestoreCollection<Post>;
  post: Observable<Post[]>;


  constructor(private afs: AngularFirestore) {
    this.postCollection = this.afs.collection('patent', ref => {
      return ref.orderBy('date', 'desc')
    })
  }
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


export interface Post {
    title: string;
    title_en: string;
    description: string;
    description_en: string;
    link: string;
    image: string;
    date: firestore.Timestamp;
    loaded: boolean;
}

export interface PostId extends Post {
    id: string;
}