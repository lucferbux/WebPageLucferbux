export interface Blog {
    title: string;
    description: string;
    link: string;
    date: Date;
}

export interface BlogId extends Blog {
    id: string;
}