export interface ApiFilm {
    name: string;
    img:string,
    summary: string
}

export interface ApiFilms {
    [id:string]: ApiFilm
}

export interface Film extends ApiFilm {
    [id:string]
}