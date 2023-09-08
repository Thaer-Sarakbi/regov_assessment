export type Movie = {
    id: string,
    poster_path: string,
    title: string,
    overview: string,
    vote_average: number,
    vote_count: number,
    backdrop_path: string,
    release_date: string
}

export type User = {
    username: string
}

export type Review = {
    id: string,
    author_details: {
        avatar_path: string,
        rating: number
    },
    author: string,
    content: string
}