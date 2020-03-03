import './App.css';
import React from 'react';
import Navbar from './Components/Navbar';
import Main from './Components/Main';
import { Route, Switch} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import MoviesItem from './Components/MoviesItem';
import Form from './Components/Form';
import MoviesContainer from './Components/MoviesContainer';
import { addUser } from './Actions/userActions';
import { addGenre, getMovies } from './Actions/movieActions';
import Profile from './Components/Profile'
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
// import axios from 'axios';
// import searchYoutube from 'youtube-api-v3-search';

class App extends React.Component {
    

  showMovie = (routerProps) => {
    // console.log(routerProps)

    let videoId = routerProps.match.params.videoId
    // this.props.history.push(`/watch/${videoId}`)
// console.log(this.props.movies)
  
    return <MoviesItem videoId ={videoId} />
}

  loginSubmit = (userInfo) => {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
          "content-type": "application/json"
      },
      body: JSON.stringify(
        userInfo
      )
    })
    .then(r => r.json())
    .then(user => {
        console.log(user);
        if (!user.error) {
            localStorage.setItem("token", user.token)
            this.props.addUser(user)    
            this.props.history.push("/profile")
        }
    })
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token")

      fetch("http://localhost:3000/persist", {
        headers: {
            "Authorization": `bearer ${token}`
        }
      })
      .then(r => r.json())
      .then((user) => {
  console.log('USER', user)
          if (user.token) {
              localStorage.setItem("token", user.token)
              localStorage.setItem('user', user)
              this.props.addUser(user)
        }
      })
    
    }
  
    
  
    fetch(`http://localhost:3000/movies`)
        .then( r => r.json() )
        .then( movieData => {

             console.log("2ND FETCH", movieData)
             this.props.getMovies(movieData)

        })
    }//COMPONENTDIDMOUNT
  
  
  
  

  signupSubmit = (user) => {
   
    fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
          user
      })
    })
    .then (r => r.json())
    .then( user => {

      if (user.token){
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', user);
          this.props.addUser(user);
          this.showProfile(user);
        } 

    })
  }

  renderForm = (routerProps) => {
      if (routerProps.location.pathname === '/login')
          return <Form formName='Log into your account' handleSubmit={this.loginSubmit} />
      else if (routerProps.location.pathname === '/signup')
          return <Form formName='Sign up for a free account' handleSubmit={this.signupSubmit} />

  }

  showProfile = (user) => {

      this.props.history.push('/profile')
  }

  
  render() {

    return (
        <div className="panel-list">
          <Container>
              <Navbar />
              
              <Switch>
                {/* <Route path="/" render={(routerProps) => <Navbar user ={this.state.user} {...routerProps} handleSearch={this.handleSearch} logout={this.logout}/>} /> */}
                
                <Route path='/login' render={this.renderForm}/>
                <Route path='/signup' render={this.renderForm}/>
                <Route path='/profile' component={Profile}/>
                <Route path='/logout' component={Main}/>
                <Route path='/watch/:videoId' render={this.showMovie}/>
                {/* <Route path='/:genre' render={routerProps => (<MoviesContainer newGenre = {routerProps.match.url.split('/')[1]}/>)}/> */}
                <Route path='/action' render={routerProps => (<MoviesContainer newGenre = 'action' />)}/>
                <Route path='/animation' render={routerProps => (<MoviesContainer newGenre = {routerProps.match.url.split('/')[1]}/>)} />
                <Route path='/comedy' render={routerProps => (<MoviesContainer newGenre = {routerProps.match.url.split('/')[1]}/>)}/>
                
                {/* <Route path='/comedy' component={MoviesContainer}/> */}
                <Route path='/' component={Main} />
              </Switch>
          </Container>
        </div>
    )
}
}

export default connect(state => ({movies: state.movies.movies}), { addUser, addGenre, getMovies }) (withRouter(App));