import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addLikes } from '../Actions/userActions';
import { addLikedMovie } from '../Actions/movieActions';
import { Link, withRouter } from 'react-router-dom';
import {Icon} from 'semantic-ui-react';




export class MoviesItem extends Component {
    
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
                  this.props.addLikedMovie(movie)
            })
        }
        else
        return null
    }

    handleFav = (e) =>{
        console.log("HandleFav")
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

// console.log(foundMovie)
        return (
            <div className='mvItem'>
                    <h1>{foundMovie?.title}</h1>
   
                    <iframe width="100%" height="715" title='movieContainer'
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
                        4
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

export default connect( state => ({loggedIn: state, movies: state.movies}), { addLikes, addLikedMovie })(withRouter(MoviesItem))
