
const initialState = {
    movies: []
    
  }
  

const movieReducer = ( state = initialState, action) => {

    switch(action.type){
        case 'ACTION':
            return

        default:
            return state;
    }
    
}



export default movieReducer;