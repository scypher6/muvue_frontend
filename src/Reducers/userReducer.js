const initialState = {
    user: '',
    token: '',
    likes: 0
  }


const userReducer = (state = initialState, action) => {

    switch(action.type){
        case 'ADD_USER':
            return {
                    user: action.user,
                    token: action.user.token,
                    likes: action.user.likes
            }
        case 'DELETE_USER':
            return initialState;
        case 'LOGOUT':
            return initialState;
        case 'ADD_LIKES':
            
            return {
                    user: action.user,
                    token: action.user.token,
                    likes: action.user.likes + 1
            }
            // {...state,
            //         //  users: [...state.users, likes: action.user.likes]
            // }
        default:
            return state;
    }
}

export default userReducer;