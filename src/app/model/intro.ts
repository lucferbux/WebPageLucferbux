export interface Intro {
    title: string;
    description: string;
    url: string;
    image: string;
    timestamp: Date;
    loaded: boolean;
}

export interface IntroId extends Intro {
    id: string;
}