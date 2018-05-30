export interface Paper {
    title: string;
    description: string;
    date: Date;
    link: string;
}

export interface PaperId extends Paper {
    id: string;
}