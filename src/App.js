import './App.css';
import React from 'react';
import Navbar from './Components/Navbar'

// import axios from 'axios';
// import searchYoutube from 'youtube-api-v3-search';

const KEY = 'AIzaSyClQEe2YFSdU3uUvnsQqmoUpkDAkohrRiI';

class App extends React.Component {

//  axios = require('axios');

  state = {
      movies: [],
      videoId: "",
      title: ""
  }



  componentDidMount(){
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


      fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${KEY}&type=video&q=youtube+movies+free+with+ads&maxResults=50`)
      .then( r => r.json() )
      .then( movieData => {

        let {videoId} = movieData.items[2].id
        let {title} = movieData.items[2].snippet
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
  
    // let {firstmovie} = this.state.movies[0];
    let {videoId} = this.state
    let {title} = this.state

    return (
        <div className="panel-list">
            <Navbar />

            <iframe width="420" height="315" title='movieContainer'
              src={`https://www.youtube.com/embed/${videoId}`} allow='encrypted-media' >
            </iframe>
            
            <img src={`https://i.ytimg.com/vi_webp/${videoId}/movieposter.webp`} alt={title} />
        </div>
    )
}
}

export default App;