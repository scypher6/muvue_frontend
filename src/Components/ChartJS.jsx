import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getMovies } from '../Actions/movieActions'; 
import { Grid } from 'semantic-ui-react';


const chartStyles = {
    color: '#7a2fc0',
    textShadow: '1px 1px #230242'
}

export class ChartJS extends Component {
    
    // getTop5movies = () => {
        
        //     const topFive = return fetch(http://localhost/topmovies)
        // }
    
    moviesByLikes = () => { 
        let moviesInState = this.props.movies;
        let mostLiked = moviesInState.movies.sort( (a, b) => b.likes.length - a.likes.length ).slice(0, 10)

        return mostLiked.map( movie => <div> {movie.title + ` (${movie.likes.length})`} <br /> </div> )
    }

    moviesByFavs = () => {
        let moviesInState = this.props.movies;
        let mostFaved = moviesInState.movies.sort( (a , b) => b.favorites.length - a.favorites.length ).slice(0, 10)
        return mostFaved.map( movie => <div> {movie.title + ` (${movie.likes.length})`} <br /> </div> )
    }

    moviesByReviews = () => {
        let moviesInState = this.props.movies;
        let mostReviewd = moviesInState.movies.sort( (a , b) => b.reviews.length - a.reviews.length ).slice(0, 10)
        return mostReviewd.map( movie => <div> {movie.title + ` (${movie.likes.length})`} <br /> </div> )
    }

    render() {

        let top10Liked = this.moviesByLikes();
        let top10Faved = this.moviesByFavs();
        let top10Reviewed = this.moviesByReviews();

        // console.log(top10Liked)
        return (
        
            <div className='profile'>
                    <h1 style={chartStyles}> Trends </h1>
                <br />
                <Grid columns={3} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <h3 style={chartStyles}>Most Liked Movies</h3>
                            { top10Liked }
                        </Grid.Column>
                        <Grid.Column>
                            <h3 style={chartStyles}>Most Favorited Movies</h3>
                            { top10Faved }
                        </Grid.Column>
                        <Grid.Column>
                            <h3 style={chartStyles}>Most Reviewed Movies</h3>
                            { top10Reviewed }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
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
}

export default connect( state => ({movies: state.movies}), { getMovies })(withRouter(ChartJS))

