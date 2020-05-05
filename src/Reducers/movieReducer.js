const initialState = {
    movies: [],
    genre: ''
  }
  
const movieReducer = ( state = initialState, action) => {
    
    let newGenre = '';
    switch(action.type){
        case 'GET_MOVIES':
            //  console.log(action.movies)
            newGenre = state.genre
            return { 
                    ...state,
                    movies: [...action.movies],
                    genre: newGenre
            }
        case 'ADD_GENRE':
            // console.log(action.movies)
            newGenre = action.genre

            return { 
                    ...state,
                    movies: [...state.movies, action.genre],
                    genre: newGenre
            }
        case 'ADD_LIKE':
            // map through all movies
            // find the movie id that matches
            // change the number of likes for that movie
            const movieArr = state.movies.map(movie => {
                // console.log(action.payload)
                if (movie.videoId === action.payload.movie.videoId){
                    return action.payload.movie
                }
                return movie
            })
            return {
                    ...state,
                    movies: movieArr,
                    genre: state.genre
            }
        case 'REMOVE_LIKE':
            const unlikeMovieArr = state.movies.map( movie => {
                // console.log(action.payload.videoId)
                if (movie.videoId !== action.payload.videoId)
                    return action.payload
                return movie
            })
            return {
                    ...state,
                    movies: unlikeMovieArr,
                    genre: state.genre
            }
        case 'ADD_FAV_MOVIE':
            // map through all movies
            const newMovieArr = state.movies.map(movie => {
                // console.log(movie)
                if (movie?.videoId === action.payload.movie?.videoId){
                    return action.payload.movie
                }
                return movie
            })
            return {
                    ...state,
                    movies: newMovieArr,
                    genre: state
            }
        case 'REMOVE_FAV':
            const unFavArray = state.movies.map(movie => {
                // console.log(movie)
                if (movie?.videoId !== action.payload.movie?.videoId){
                    return action.payload
                }
                return movie
            })
            return {
                    ...state,
                    movies: unFavArray,
                    genre: state
            }
            case 'ADD_REVIEW':
                const reviewArray = state.movies.map(movie => {
                    // console.log(movie)
                    if (movie?.videoId === action.payload.movie?.videoId){
                        return action.payload
                    }
                    return movie
                })
                return {
                        ...state,
                        movies: reviewArray,
                        genre: state
                }
            case 'REMOVE_REVIEW':
                const removedReviewArray = state.movies.map (movie => {
                    if (movie?.videoId === action.payload.movie?.videoId){
                        return action.payload
                    }
                    return movie
                })
                return {
                    ...state,
                    movies: removedReviewArray,
                    genre: state
                }
        default:
            return state;
    }
    
}



export default movieReducer;


