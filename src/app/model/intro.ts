export interface Intro {
    title: string;
    description: string;
    image: string;
    timestamp: Date;
    size: number;
    
}

export interface IntroId extends Intro {
    id: string;
}