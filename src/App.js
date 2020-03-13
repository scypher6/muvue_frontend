import './App.css';
import React, {PureComponent} from 'react';
import Navbar from './Components/Navbar';
import Main from './Components/Main';
import { Route, Switch} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import MoviesItem from './Components/MoviesItem';
import Form from './Components/Form';
import { addUser } from './Actions/userActions';
import { getMovies } from './Actions/movieActions';
import Profile from './Components/Profile'
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import About from './Components/About'
import ChartJS from './Components/ChartJS'

// import axios from 'axios';
// import searchYoutube from 'youtube-api-v3-search';

class App extends React.PureComponent {
    

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

  renderChart = () => {

    return ChartJS
  }
  
  render() {

    return (
        <div className="panel-list bg" >
          <Container>
              <Navbar />
              
              <Switch>
                <Route path='/login' render={this.renderForm}/>
                <Route path='/signup' render={this.renderForm}/>
                <Route path='/profile' component={Profile}/>
                <Route path='/logout' component={Main}/>
                <Route path='/watch/:videoId' render={this.showMovie}/>
                {/* <Route path="/" render={(routerProps) => <Navbar user ={this.state.user} {...routerProps} handleSearch={this.handleSearch} logout={this.logout}/>} /> */}
                {/* <Route path='/:genre' render={routerProps => (<MoviesContainer newGenre = {routerProps.match.url.split('/')[1]}/>)}/> */}
                {/* <Route path='/horror' render={routerProps => (<MoviesContainer newGenre = {routerProps.match.url.split('/')[1]}/>)} /> */}
                {/* <Route path='/comedy' component={MoviesContainer}/> */}
                <Route path='/stats' component={ChartJS}/>
                <Route path='/about' component={About}/> 
                <Route path='/' component={Main} />
              </Switch>
          </Container>
        </div>
    )
}
}

export default connect(state => ({movies: state.movies.movies}), { addUser, getMovies }) (withRouter(App));