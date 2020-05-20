import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { addLikes, addUser, updateUser } from '../Actions/userActions';
import { addLike , removeLike, addFavMovie, removeFav, addReview, removeReview } from '../Actions/movieActions';
import { Link, withRouter } from 'react-router-dom';
import {Icon, Button, Comment, Form, Header} from 'semantic-ui-react';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import Review from './Review';


export class MoviesItem extends PureComponent {

    state = {
            liked: false,
            faved: false,
            clickedThumb: false,
            clickedStar: false,
            review: ''
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
                 console.log("LIKE", movie)
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
            // console.log("UPDATEd User", foundUser)
                    this.props.updateUser(foundUser);
                    
                })
                    
               }
               else{ //Like a movie
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

    handleChange = (e) =>{
        let {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleReview = (e) =>{
        e.preventDefault();
        let {review} = this.state;
        let movie = this.findMovie();
        let user = this.getUser().user;
        let token = localStorage.getItem('token');
       
        if(user){
            fetch(`http://localhost:3000/users/${user.id}/reviews`, {
                method: "POST",
                headers: {'Content-type' : 'application/json',
                        'Authorization': `bearer ${token}`},
                body: JSON.stringify({
                    movie_id: movie?.id, 
                    user_id: user?.id,
                    content: review,
                })
            })
            .then(r => r.json())
            .then( review => {
                console.log("CREATE", review);
                movie.reviews.push(review);
                this.props.addReview(movie);
                user.reviewedMovies.push(review);
                this.props.updateUser(this.getUser());                            
            }) 
        }
        else
            swal("Not logged in!", "Please sign in to favorite a movie!", "info")
    }

    deleteReview = (review) =>{
         console.log(review)
       let movie = this.findMovie()
       let user_id = review.user_id
       let foundUser = this.getUser();
       let foundUserID = foundUser?.user?.id
       let token = localStorage.getItem('token');

       if (foundUser && foundUserID === user_id){
           fetch(`http://localhost:3000/users/reviews/${review.id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `bearer ${token}`
        }
    })
    .then (r => r.json())
    .then (deletedReview => {
            //make sure user is updated in the state (IMPORTANT)
            this.props.addUser(foundUser)
            //Remove the review from the movie's list of reviews
            let tempArray = movie.reviews.filter( review => review.id !== deletedReview.id)
            movie.reviews = tempArray
            removeReview(movie);
            //Remove the review from the user's reviews and update the user in memory
            let newUserReviews = foundUser.user.reviews.filter (review => review.id !== deletedReview.id)
            foundUser.user.reviews = newUserReviews;
            this.props.updateUser(foundUser);
    })
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
// console.log(foundMovie?.reviews)
        const reviewMapper = foundMovie?.reviews?.slice(0).reverse().map( movie => <Review deleteReview = {this.deleteReview} movie = {movie} /> )
        
        return (
            <div className='mvItem'>
                    <h1>{foundMovie?.title}</h1>

                        <iframe className='videoFrame' title='movieContainer'
                            src={`https://www.youtube.com/embed/${videoId}`} frameborder="0" allow='encrypted-media' allowFullScreen>
                        </iframe>

                        <br />
                        <Link onClick={this.handleLike}>
                            <Icon name='thumbs up' color = {liked ? 'green' : ''} />
                            {foundMovie?.likes?.length}
                        </Link>
                        <Link onClick={this.handleFav}>
                            &nbsp; 
                            <Icon name='star' color = {faved ? 'green' : ''}/>
                            {foundMovie?.favorites?.length}
                        </Link>
                        <br />
                        <br />
                        <strong>Description:</strong> {foundMovie?.description}
                        <Comment.Group>
                            <Header as='h3' dividing color='green'>
                             Reviews 
                            </Header>
                            <Form onSubmit={this.handleReview}>
                                <Form.TextArea placeholder='Please leave a comment ...' className='styling' name='review' value={this.state.review} onChange={this.handleChange}/>
                                <Button content='Write a review' labelPosition='left' icon='edit' primary />
                            </Form>
                        </Comment.Group>
                        <br />
                        { reviewMapper }
                        <br />
            </div>
        )
    }
}

export default connect( state => ({loggedIn: state, movies: state.movies}), { addLikes, addLike, removeLike, addFavMovie, removeFav, addReview, removeReview, addUser, updateUser })(withRouter(MoviesItem))

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