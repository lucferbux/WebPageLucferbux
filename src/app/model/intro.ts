export interface Intro {
    title: string;
    description: string;
    link: string;
    image: string;
    timestamp: Date;
    cols: number;
    rows: number;
}

export interface IntroId extends Intro {
    id: string;
}