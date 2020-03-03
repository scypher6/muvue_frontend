import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addLikes } from '../Actions/userActions';
import { Link, withRouter } from 'react-router-dom';
import {Card, Icon} from 'semantic-ui-react';




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
        console.log('inside handleLike', this.props.clickedMovie)
        let foundUser = this.getUser();
        if (foundUser){
            this.props.addLikes(foundUser)
        }
        else
        return null
    }

    renderMovieId = () =>{
        let videoId = this.props?.videoId
        if(this.props.movies.movies){
            console.log(this.props.movies)
            let foundMovie = this.props.movies.movies.find( movie => movie.videoId === videoId)
            console.log(foundMovie)
            localStorage.setItem('movieID', foundMovie?.id)
            // console.log(foundMovie)
            return foundMovie
        }
        else
            return null

    }

    render() {
        console.log(this.props)
    
        const foundUser = this.getUser()
        let videoId = this.props.videoId
// console.log(this.props.movies)
        let clickedMovie = this.renderMovieId();
        
        console.log(clickedMovie)
   
        return (
            <div>
                {/* <h1>{title}</h1> */}
                <Card color='green'>
                    <iframe width="420" height="315" title='movieContainer'
                        src={`https://www.youtube.com/embed/${videoId}`} allow='encrypted-media' >
                    </iframe>
       
                        <Link>
                            <Icon name='thumbs up' onClick={this.handleLike}/>
                            {foundUser ? foundUser.user.likes : 0} Likes
                        </Link>
                        <Link>
                            &nbsp; 
                        <Icon name='star' />
                        4
                        </Link>
                </Card>
            </div>
        )
    }
}

export default connect( state => ({loggedIn: state, movies: state.movies}), { addLikes })(withRouter(MoviesItem))
