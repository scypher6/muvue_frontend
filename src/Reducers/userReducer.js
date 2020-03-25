const initialState = {
    user: '',
    token: '',
    likes: 0, 
    movies: []
  }


const userReducer = (state = initialState, action) => {

    switch(action.type){
        case 'ADD_USER':
            // console.log("USER RED", action.user)
            return { ...state,
                    user: action.user,
                    token: action.user.token,
                    likes: action.user.likes,
                    movies: action.user.movies
            }
        case 'DELETE_USER':
            return initialState;
        case 'LOGOUT':
            return initialState;
        case 'UPDATE_USER':
            let newLikedMovies = [...state.user.movies.likedMovies, action.payload] 
            state.user.movies.likedMovies = newLikedMovies
            return {...state
            }
        case 'ADD_LIKES':

            return {...state,
                    user: action.user,
                    token: action.payload.token,
                    likes: action.payload.likes + 1
            }
 
        default:
            return state;
    }
}

export default userReducer;