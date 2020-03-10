export const getMovies = (movies) =>{
    return {type: 'GET_MOVIES', movies: movies}
}

export const addGenre = (genre) => {
    return {type: 'ADD_GENRE', genre: genre }
}

export const addLikedMovie = (movie) => {
    return {type: 'ADD_LIKED_MOVIE', payload: movie}
}

export const addFavMovie = (movie) =>{
    return {type: 'ADD_FAV_MOVIE', payload: movie}
}

