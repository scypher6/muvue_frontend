const initialState = {
    movies: [],
    genre: ''
  }
  
const movieReducer = ( state = initialState, action) => {
    
    let newGenre = '';
    switch(action.type){
        case 'GET_MOVIES':
             console.log(action.movies)
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
                    movies: [...state.movies],
                    genre: newGenre
            }

        default:
            return state;
    }
    
}



export default movieReducer;


