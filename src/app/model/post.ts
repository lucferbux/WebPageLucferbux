import { firestore } from 'firebase';

export interface Post {
    title: string;
    description: string;
    link: string;
    image: string;
    date: firestore.Timestamp;
    loaded: boolean;
}

export interface PostId extends Post {
    id: string;
}