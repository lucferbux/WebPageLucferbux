export interface Patent {
    title: string;
    description: string;
    author: string;
    image: string;
    date: Date;
}

export interface PatentId extends Patent {
    id: string;
}