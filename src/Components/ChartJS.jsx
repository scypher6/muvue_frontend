import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getMovies } from '../Actions/movieActions'; 

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
        // console.log(top10Liked)
        return top10Liked.map( movie => movie.title + `(${movie.likes.length})`)
    }

    render() {

        let top10Liked = this.moviesByLikes();
        console.log(top10Liked)
        return (
        
            <div className='profile'>
                    CHART JS
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
}

export default connect( state => ({movies: state.movies}), { getMovies })(withRouter(ChartJS))

