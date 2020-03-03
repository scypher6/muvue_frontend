import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { addUser, logout } from '../Actions/userActions';
import { addGenre } from '../Actions/movieActions';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Header from './Header';

const token = localStorage.token;

class Navbar extends Component {

    state = { activeItem: 'active' }
    
      handleItemClick = (e, { name }) => {	        // console.log(name)
          // console.log(name)	        // console.log(this.props)
          // let route = `/${name.toLowerCase()}`	       
          this.setState({ activeItem: name }) //, () => this.props.history.push(route))	
                   
      }	    
    
            
    getUser = () => {
        const user = this.props?.loggedIn.users.user;

        if (this.props.loggedIn.users.user){              
            return user
            this.props.addUser(user);
        }   // user.find( (user) => user.token === token)
        else
            return null
  }


    logout = () => {
      // console.log("HERE")
        localStorage.clear();
        this.props.logout();
        this.props.history.push('/')
  }



    render() {
      // console.log(this.props.loggedIn.users.users)

        const { activeItem } = this.state
        const foundUser = this.getUser()

        // console.log(this.props.loggedIn)
        return (
            
             <div className='navBar'>
                <Header />
                <div>
                 <Menu fluid widths={3}>
                    <Menu.Item
                      as={ Link }
                      to='/action'
                      name='Action'
                      active={activeItem === 'Action'}
                      onClick={this.handleItemClick}
                    />
                    <Menu.Item
                      as={ Link }
                      to='/animation'
                      name='Animation'
                      active={activeItem === 'Animation'}
                      onClick={this.handleItemClick}
                    /> 
                    <Menu.Item
                      as = { Link }
                      to='/comedy'
                      name='Comedy'
                      active={activeItem === 'Comedy'}
                      onClick={this.handleItemClick}
                    />
                 </Menu>

                 {foundUser ? 'Logged in as: ' + foundUser.user.username : ""}
                  <br />
                  <Link to='/signup'>
                    Signup
                  </Link>
                  {
                    foundUser ?
                    <>
                    .:.
                          <Link to='/profile'>
                            Profile
                          </Link>
                    </>
                    :

                    ""

                  }
                  <>
                  </>
                  
                  { foundUser ?                      
                      <>
                  .:.
                        <Link to='/logout' onClick={this.logout}>
                          Log out
                        </Link>
                      </>
                      :
                      <>
                  .:.
                        <Link to='/login' >
                          Log in
                        </Link>
                      </>
                  }
                  
                </div>
            </div>
            
        )
    
}

}



 export default connect(state => ({loggedIn: state}), { addUser, addGenre, logout }) (withRouter(Navbar))
