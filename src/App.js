import './App.css';
import React from 'react';
import Navbar from './Components/Navbar';
import Main from './Components/Main';
import { Route, Switch} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import MoviesItem from './Components/MoviesItem'
import MoviesContainer from './Components/MoviesContainer';
// import axios from 'axios';
// import searchYoutube from 'youtube-api-v3-search';

// const KEY = 'AIzaSyClQEe2YFSdU3uUvnsQqmoUpkDAkohrRiI';

class App extends React.Component {
    

  showMovie = (routerProps) => {
    console.log(routerProps)
    console.log('iuho')
    let videoId = routerProps.match.params.videoId
    // this.props.history.push(`/watch/${videoId}`)

    return <MoviesItem videoId ={videoId} />
}

  handleGenre = () => {
    return ""
  }
  
  render() {

    return (
        <div className="panel-list">
          <Container>
              <Navbar />


              <Switch>
                <Route exact path='/' component={Main} />
                <Route exact path='/:genre' component={MoviesContainer}/>
                <Route path='/watch/:videoId' render={this.showMovie}/>
              </Switch>
          </Container>
        </div>
    )
}
}

export default App;