import React, { Component } from 'react';
import MoviePoster from './MoviePoster';
import { Grid } from 'semantic-ui-react';


const KEY = 'AIzaSyClQEe2YFSdU3uUvnsQqmoUpkDAkohrRiI';

export class MoviesContainer extends Component {

    state = {
        movies: [],
        genre: "",
        videoId: "",
        title: ""
    }

    handleFetch = () => {
        // Video format: https://www.youtube.com/embed/tgbNymZ7vqY
        // Query URL: https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyClQEe2YFSdU3uUvnsQqmoUpkDAkohrRiI&type=video&maxResults=10
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
        document.title = 'Muvue: Movies that move you!'

        
         let genre = 'action';

        console.log(this.props)
        // if (genre === undefined) genre = 'action';
        // else 
        //     genre = this.props.match.url.split('/')[1];

// let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${KEY}&type=video&q=youtube+movies+free+with+ads+${genre}&maxResults=50`;
// console.log(url)
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&key=${KEY}&type=video&q=youtube+movies+free+with+ads+${genre}`)
        .then( r => r.json() )
        .then( movieData => {
  
          let {videoId} = movieData.items[1].id
          let {title} = movieData.items[1].snippet
          // console.log(movieData.items[0])
          this.setState({
              movies: movieData.items,
              videoId,
              title
          })
  
          // movieData.items[0].id.videoId
          //  console.log(title)
        })
    }

    render() {
        //fetch all movies
        this.handleFetch();
        // let {firstmovie} = this.state.movies[0];
        let {videoId} = this.state
        let movieMapper = this.state.movies.map( movie => 
            <Grid>
                <Grid.Column>
                    <MoviePoster key={videoId} movie={movie} />
                </Grid.Column>  
            </Grid>
            )
           
        return (
                
                <div>   
                     {movieMapper}  
                </div>
                
        )
    }
}

export default MoviesContainer
