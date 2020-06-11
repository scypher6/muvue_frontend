import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getMovies } from '../Actions/movieActions'; 
import { Grid } from 'semantic-ui-react';

export class ChartJS extends Component {

    // getTop5movies = () => {

    //     const topFive = return fetch(http://localhost/topmovies)
    // }

    // componentDidMount(){
    //     fetch('http://localhost/topmovies')
    //     .then(r => r.json())
    //     .then(console.log)

    // }

    moviesByLikes = () => {
        let moviesInState = this.props.movies
        let top10Liked = moviesInState.movies.sort( (a, b) => b.likes.length - a.likes.length ).slice(0, 10)

        return top10Liked.map( movie => <div> {movie.title + ` (${movie.likes.length})`} <br /> </div> )
    }

    render() {

        let top10Liked = this.moviesByLikes();
        console.log(top10Liked)
        return (
        
            <div className='profile'>
                    <h1> Trends </h1>
                <br />
                <br />
                <Grid columns={3} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <h3>Most Liked Movies</h3>
                            { top10Liked }
                        </Grid.Column>
                        <Grid.Column>
                            <h3>Most Favorited Movies</h3>
                        </Grid.Column>
                        <Grid.Column>
                            <h3>Most Reviewed Movies</h3>
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

