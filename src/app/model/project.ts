export interface Project {
    title: string;
    description: string;
    date: Date;
    link: string;
}

export interface ProjectId extends Project {
    id: string;
}