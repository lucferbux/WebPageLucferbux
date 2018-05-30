export interface Team {
    name: string;
    cols: number;
    rows: number;
    description: string;
    avatar: string;
    job: string;
    importance: number;
}

export interface TeamId extends Team {
    id: string;
}