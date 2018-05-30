export interface Talk {
    title: string;
    description: string;
    date: Date;
    link: string;
}

export interface TalkId extends Talk {
    id: string;
}