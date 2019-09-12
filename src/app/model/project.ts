import { firestore } from 'firebase';

export interface Project {
    title: string;
    description: string;
    date: firestore.Timestamp;
    version: string;
    link: string;
}

export interface ProjectId extends Project {
    id: string;
}