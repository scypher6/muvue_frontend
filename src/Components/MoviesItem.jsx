import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { addLikes } from '../Actions/userActions';
import { addLike , removeLike, addFavMovie} from '../Actions/movieActions';
import { Link, withRouter } from 'react-router-dom';
import {Icon} from 'semantic-ui-react';
import swal from 'sweetalert';




export class MoviesItem extends PureComponent {
    
    getUser = () => {
        const user = this.props.loggedIn.users.user;
    
        if (user)               
            return user
            // user.find( (user) => user.token === token)
        else
            return null
    }


    handleLike = () =>{
        let foundUser = this.getUser();
        console.log(foundUser)
        if (foundUser){
            this.props.addLikes(foundUser)
            let clickedMovie = this.findMovie()
            let vidID = clickedMovie?.videoId
            let userID = foundUser.user.id
            let token = localStorage.getItem('token');

            
            fetch(`http://localhost:3000/users/${userID}/likes`, {
                method: "POST",
                headers: {
                        'Content-type' : 'application/json',
                        "Authorization": `bearer ${token}`
                },
                body: JSON.stringify({
                     id: userID,
                     videoId: vidID
                     
                })
            })
            .then( r => r.json())
            .then( movie => {
                // console.log(movie.liked)
                
                if (movie.liked){
                    // console.log(movie.likeID)
                    fetch(`http://localhost:3000/users/likes/${movie.likeID}`, {
                        method: 'DELETE',
                        headers: {
                            "Authorization": `bearer ${token}`
                    }
                })
                .then(r => r.json())
                .then(movie => {
                    // console.log(movie)
                    this.props.removeLike(movie)
                })
                    
               }
               else
                    this.props.addLike(movie)
            })
        }
        else
        return swal("Not logged in!", "Please sign in to like a movie!", "info")
    }

    handleFav = (e) =>{
        // console.log("HandleFav", foundUser)
        let foundUser = this.getUser();
        if (foundUser){
            console.log(foundUser)
            this.props.addLikes(foundUser)
            let clickedMovie = this.findMovie()
            let vidID = clickedMovie?.videoId
            let userID = foundUser.user.id
            let token = localStorage.getItem('token');

            fetch(`http://localhost:3000/users/${userID}/favorites`, {
                method: "POST",
                headers: {
                        'Content-type' : 'application/json',
                        "Authorization": `bearer ${token}`
                },
                body: JSON.stringify({
                     id: userID,
                     videoId: vidID
                     
                })
            })
            .then(r => r.json())
            .then( movie => {
                    this.props.addFavMovie(movie)
            })
        }
        else
            return swal("Not logged in!", "Please sign in to favorite a movie!", "info")
        
    }

    findMovie = () =>{
        let videoId = this.props?.videoId
        if(this.props.movies.movies){

            let foundMovie = this.props.movies.movies.find( movie => movie.videoId === videoId)
            localStorage.setItem('movieID', foundMovie?.id)

            return foundMovie
        }
        else
            return null

    }

    render() {
        // console.log(this.props)
        let videoId = this.props.videoId
        let foundMovie = this.props.movies.movies.find( movie => movie.videoId === videoId)
console.log(foundMovie)

        return (
            <div className='mvItem'>
                    <h1>{foundMovie?.title}</h1>
   
                    <iframe className='videoFrame' title='movieContainer'
                        src={`https://www.youtube.com/embed/${videoId}`} allow='encrypted-media' >
                    </iframe>
                        <br />
                        <Link onClick={this.handleLike}>
                            <Icon name='thumbs up' />
                            {foundMovie?.likes.length}
                        </Link>
                        <Link onClick={this.handleFav}>
                            &nbsp; 
                            <Icon name='star' />
                            {foundMovie?.favorites.length}
                        </Link>
                        <br />
                        <br />
                        <strong>Description:</strong> {foundMovie?.description}
                        <br />
                        <br />
                        <br />
                        <br />
            </div>
        )
    }
}

export default connect( state => ({loggedIn: state, movies: state.movies}), { addLikes, addLike, removeLike, addFavMovie })(withRouter(MoviesItem))
