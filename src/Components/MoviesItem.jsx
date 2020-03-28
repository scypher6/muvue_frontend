import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { addLikes, addUser, updateUser } from '../Actions/userActions';
import { addLike , removeLike, addFavMovie, removeFav} from '../Actions/movieActions';
import { Link, withRouter } from 'react-router-dom';
import {Icon} from 'semantic-ui-react';
import swal from 'sweetalert';


export class MoviesItem extends PureComponent {

    state = {
            liked: false,
            faved: false,
            clickedThumb: false,
            clickedStar: false
        }
    
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
        // console.log(foundUser)
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
                this.props.addUser(foundUser)
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
                    this.setState({
                        liked: false,
                        clickedThumb: true
                    })
                    this.props.removeLike(movie)
                    console.log(foundUser.user.likedMovies)
                    let index = foundUser.user.likedMovies.findIndex(likedMovie => likedMovie.videoId === movie.videoId)
                    let newArr = foundUser.user.likedMovies
                    newArr.splice(index, 1)
            //   console.log("NEWARR", newArr)                     
                    foundUser.user.likedMovies = newArr
            // console.log("UPDATEd", foundUser)
                    this.props.updateUser(foundUser);
                    
                })
                    
               }
               else{
                    this.setState({
                        liked: true,
                        clickedThumb: true
                    })
                    this.props.addLike(movie)
                    foundUser.user.likedMovies.push(movie)
                    this.props.updateUser(foundUser)
                }
                    
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
                this.props.addUser(foundUser)

                    if (!movie.faved){
                        this.setState({
                            faved: true,
                            clickedStar: true
                        })
                        this.props.addFavMovie(movie)
                        foundUser.user.favorites.push(movie)
                        this.props.updateUser(foundUser)
                    }
                    else{//Unfav
                        fetch(`http://localhost:3000/users/favorites/${movie.favID}`, {
                            method: 'DELETE',
                            headers: {
                                "Authorization": `bearer ${token}`
                        }
                })
                .then(r => r.json())
                .then( movie => {
                        this.setState({
                            faved: false,
                            clickedStar: true
                        })
                        this.props.removeFav(movie)
                        let index = foundUser.user.favorites.findIndex(favorite => favorite.movie.videoId === movie.videoId)
                        let newArr = foundUser.user.favorites
                        newArr.splice(index, 1)
                //   console.log("NEWARR", newArr)                     
                        foundUser.user.favorites = newArr
                // console.log("UPDATEd", foundUser)
                        this.props.updateUser(foundUser);
                })
             }
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
        let foundMovie = this.props.movies.movies.find( movie => movie.videoId === videoId )
        let foundUser = this.getUser();
        let liked = this.state.liked;
        let faved = this.state.faved;
        let clickedThumb = this.state.clickedThumb;
        let clickedStar = this.state.clickedStar;

        if (!clickedThumb || !clickedStar){
            let clickedMovie = foundUser?.user?.likedMovies.find( movie => movie?.videoId === foundMovie?.videoId )
            let favedMovie = foundUser?.user?.favorites.find( movie => movie?.videoId === foundMovie?.videoId )

            if (clickedMovie){

                this.setState({
                    liked: true
                })
                liked = true
            }

            if (favedMovie){

                this.setState({
                    faved: true
                })
                faved = true;
            }
   
            
        }


        
        return (
            <div className='mvItem'>
                    <h1>{foundMovie?.title}</h1>
   
                    <iframe className='videoFrame' title='movieContainer'
                        src={`https://www.youtube.com/embed/${videoId}`} frameborder="0" allow='encrypted-media' allowFullScreen>
                    </iframe>
                        <br />
                        <Link onClick={this.handleLike}>
                            <Icon name='thumbs up' color = {liked ? 'green' : ''} />
                            {foundMovie?.likes.length}
                        </Link>
                        <Link onClick={this.handleFav}>
                            &nbsp; 
                            <Icon name='star' color = {faved ? 'green' : ''}/>
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

export default connect( state => ({loggedIn: state, movies: state.movies}), { addLikes, addLike, removeLike, addFavMovie, removeFav, addUser, updateUser })(withRouter(MoviesItem))

    // Array.prototype.remove = function() {
    //     let what, a = arguments, L = a.length, ax;
    //     while (L && this.length) {
    //         what = a[--L];
    //         while ((ax = this.indexOf(what)) !== -1) {
    //             this.splice(ax, 1);
    //         }
    //     }
    //     return this;
    // }