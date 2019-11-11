export interface Job {
    name: string;
    cols: number;
    rows: number;
    description: string;
    avatar: string;
    loaded: boolean;
    job: string;
    importance: number;
}

export interface JobId extends Job {
    id: string;
}