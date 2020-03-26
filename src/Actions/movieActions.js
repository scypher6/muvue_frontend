export const getMovies = (movies) =>{
    return {type: 'GET_MOVIES', movies: movies}
}

export const addGenre = (genre) => {
    return {type: 'ADD_GENRE', genre: genre }
}

export const addLike = (movie) => {
    return {type: 'ADD_LIKE', payload: movie}
}

export const removeLike = (movie) => {
    return {type: 'REMOVE_LIKE', payload: movie}
}

export const addFavMovie = (movie) =>{
    return {type: 'ADD_FAV_MOVIE', payload: movie}
}

export const removeFav = (movie) =>{
    return {type: 'REMOVE_FAV', payload: movie}
}

