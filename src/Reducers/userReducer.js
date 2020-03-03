const initialState = {
    user: '',
    token: '',
    likes: 0
  }


const userReducer = (state = initialState, action) => {

    switch(action.type){
        case 'ADD_USER':
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
        case 'ADD_LIKES':
            
            return {...state,
                    user: action.user,
                    token: action.user.token,
                    likes: action.user.likes + 1
            }
 
        default:
            return state;
    }
}

export default userReducer;