import { firestore } from 'firebase';

export interface Patent {
    title: string;
    description: string;
    link: string;
    image: string;
    date: firestore.Timestamp;
}

export interface PatentId extends Patent {
    id: string;
}