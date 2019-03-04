export interface Patent {
    title: string;
    description: string;
    link: string;
    image: string;
    date: Date;
}

export interface PatentId extends Patent {
    id: string;
}