import React, { Component } from 'react';
import MoviePoster from './MoviePoster';
import { connect } from 'react-redux';
import { getMovies } from '../Actions/movieActions'; 
import { withRouter } from 'react-router';


export class MoviesContainer extends Component {

    // state = {
    //     movies: []
    // }
    componentDidUpdate(prevProps) {
        if (prevProps.newGenre !== this.props.newGenre) {
            // console.log("Props changed", this.props.newGenre)

        let genre = this.props.newGenre
        console.log('genre:', this.props.location.pathname)
                if (!genre)
                    genre = 'action'
                else
                    genre = this.props.newGenre
                    console.log(genre)     
                // this.props.passGenre ? 'action' : this.props.history.location.pathname.split('/')[1];
         
                fetch(`http://localhost:3000/genres/${genre}`)
                .then( r => r.json() )
                .then( movieData => {
        
                    console.log(movieData)
                    this.props.getMovies(movieData)
          
                })
        } else 
                return null
        
    }

    componentDidMount() {
        // Video format: https://www.youtube.com/embed/tgbNymZ7vqY
        // Playlist URL: https://www.googleapis.com/youtube/v3/playlists?part=contentDetails&id=PLOU2XLYxmsIIM9h1Ybw2DuRw6o2fkNMeR&key=[YOUR_API_KEY]
        // `https://www.googleapis.com/youtube/v3/playlists?part=contentDetails&id=kgEmCGQSIlBMSFBUeFR4dEMwaWJWWnJUMl9XS1dVbDJTQXhzS3VLd3iiBQIoAg&key=${{KEY}`
        // Youtube Movies (Free with ads) Playlist ID: PLHPTxTxtC0ibVZrT2_WKWUl2SAxsKuKwx
        //GENRES:
        // action+adventure
        // drama
        // comedy
        // sci+fi
        // horror
        // independent
        // documentary
        // fantasy
        // animation
        //Set document title

// let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${KEY}&type=video&q=youtube+movies+free+with+ads+${genre}&maxResults=50`;
//https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&key=${KEY}&type=video&q=youtube+movies+free+with+ads+${genre}
        // let {videoId} = movieData.items[1].id
        // let {title} = movieData.items[1].snippet
        
        let genre = this.props.newGenre
// console.log('genre:', this.props.location.pathname)
        if (!genre)
            genre = 'action'
        else
            genre = this.props.newGenre

        // this.props.passGenre ? 'action' : this.props.history.location.pathname.split('/')[1];
 
        fetch(`http://localhost:3000/genres/${genre}`)
        .then( r => r.json() )
        .then( movieData => {

            console.log(movieData)
            this.props.getMovies(movieData)
  
        })
    }

    movieMapper = () => {
      
        let movies = this.props.moviesProps.movies
        let {videoId} = movies
        return movies.map( movie => <MoviePoster key={videoId} movie={movie} /> )   
    }

    render() {
        document.title = 'Muvue: Movies that move you!'

        return (
                <div className = "ui container"> 
                  <div class="ui grid">
                     {this.movieMapper()}  
                  </div>
                </div> 
                
        )
    }
}

   const mapStateToProps = (state) =>{
    // console.log(state)
        return {moviesProps: state.movies}
    }


export default connect(mapStateToProps, {getMovies} ) (withRouter(MoviesContainer))
// state => ({moviesProps: state.movies, newGenre: state})