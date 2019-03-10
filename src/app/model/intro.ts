export interface Intro {
    title: string;
    description: string;
    image: string;
    timestamp: Date;
    cols: number;
    rows: number;
    
}

export interface IntroId extends Intro {
    id: string;
}