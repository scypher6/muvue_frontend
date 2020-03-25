export const addUser = (user) => {
    return {type: 'ADD_USER', user: user }
}

export const updateUser = (movie) => {
    return {type: 'UPDATE_USER', payload: movie}
}

export const logout = (user) => {
    return {type: 'LOGOUT'}
}

export const deleteUser = (user) => {
    return {type: 'DELETE_USER'}
}

export const addLikes = (user) => {
    return {type: 'ADD_LIKES', payload: user}
}


