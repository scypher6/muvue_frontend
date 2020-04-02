import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser, deleteUser } from '../Actions/userActions';
import { getMovies } from '../Actions/movieActions';
import { withRouter } from 'react-router';
import { Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const token = localStorage.token;

export class Profile extends Component {
    
    getUser = () => {
        const user = this.props.loggedIn.user;
   
        if (user)               
            return user
            // user.find( (user) => user.token === token)
        else
            return null
    }


    likedMovies = (user) => { 
        // console.log("LIKEDMOVS", user?.likedMovies)  
            return user?.likedMovies.map(movie => {
            return (
                <NavLink to={`/watch/${movie.videoId}`} > 
                    <Image src={`https://i.ytimg.com/vi_webp/${movie.videoId}/movieposter.webp`} alt={movie.title} wrapped ui={false} />
                </NavLink>
                )
              }
            )
    }

    favedMovies = (user) => { 
        // console.log("FAVED", user?.favorites)  
            return user?.favorites.map(movie => {
                // console.log(movie.movie)
            return (
                <NavLink to={`/watch/${movie.movie.videoId}`} > 
                    <Image src={`https://i.ytimg.com/vi_webp/${movie.movie.videoId}/movieposter.webp`} alt={movie.title} wrapped ui={false} />
                </NavLink>
                )
              }
            )
    }

    myReviews = (user) =>{
        return user?.reviews.map(review => {
            //  console.log(user)
            let movie = user?.reviewedMovies.find( movie => movie.id === review.movie_id)
            console.log(review)
        return (
        
            <NavLink  to={`/watch/${movie.videoId}`} > 
              <span className='reviewNav'> [ { review.content.slice(0, 35) } ]</span> 
            </NavLink>
             
            )
          }
        )        
    }


    render() {
        const foundUser = this.getUser()

        // console.log(this.likedMovies(foundUser?.user))

        if(foundUser) {
            return (
                <div className='profile'> 
                    <h3>Welcome {foundUser.user.username}!</h3>
                    <br />

                    <h2>My Favorites</h2>

                    <div className='scrollmenu'>
                        <a href="#movie"> 
                            {this.favedMovies(foundUser.user)}
                        </a>                     
                    </div>
                    <br /><br /><br />
                    <h2>Movies I Liked</h2>

                    <div className='scrollmenu'>
                        <a href="#movie"> 
                            {this.likedMovies(foundUser.user)}
                        </a>                     
                    </div>
                    <br /><br /><br />
                    <h2>My Reviews</h2>

                    <div className='scrollmenu review'>
                        <a href="#movie"> 
                            {this.myReviews(foundUser.user)}
                        </a>                  
                    </div>

                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                </div>
            )
        }
        return null
    }
}

       
export default connect(state => ({loggedIn: state.users}), {addUser, deleteUser, getMovies} ) (withRouter(Profile))
