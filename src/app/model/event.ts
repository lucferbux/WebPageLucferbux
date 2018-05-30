export interface Event {
    title: string;
    description: string;
    date: Date;
    link: string;
}

export interface EventId extends Event {
    id: string;
}