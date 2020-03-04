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
        case 'ADD_LIKED_MOVIE':
            // map through all movies
            const movieArr = state.movies.map(movie => {
                // console.log(action.payload)
                if (movie.videoId === action.payload.movie.videoId){
                    return action.payload.movie
                }
                return movie
            })
            // find the movie id that matches
            // change the number of likes for that movie
            return {
                    ...state,
                    movies: movieArr,
                    genre: state.genre
            }
        default:
            return state;
    }
    
}



export default movieReducer;


