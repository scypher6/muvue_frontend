import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { addUser, logout } from '../Actions/userActions';
import { addGenre } from '../Actions/movieActions';
import { Menu, Button, Icon} from 'semantic-ui-react';
import { connect } from 'react-redux';
import Header from './Header';
import ColorInvertedMenu from './NavMenu'

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
                 {/* <Menu fluid widths={3}>
                    <Menu.Item
                      as={ Link }
                      to='/stats'
                      name='Trends'
                      active={activeItem === 'stats'}
                      onClick={this.handleItemClick}
                    />
                    <Menu.Item
                      as={ Link }
                      to='/action'
                      name='Movies'
                      active={activeItem === 'action'}
                      onClick={this.handleItemClick}
                    /> 
                    <Menu.Item
                      as = { Link }
                      to='/about'
                      name='About'
                      active={activeItem === 'about'}
                      onClick={this.handleItemClick}
                    />
                 </Menu> */}

                <ColorInvertedMenu />
                 <span class='signDiv'>
                    {foundUser ? 'Signed in as: ' + foundUser.user.username : ""}
                 </span>
                 <br />
                 <br />
 
                 {
                  foundUser ?
                  <div className = 'signDiv' >
                  <Link to='/myMovies'>
                    <Button positive animated>
                      <Button.Content visible>My Movies</Button.Content>
                      <Button.Content hidden>
                        <Icon name='tv' />
                      </Button.Content>
                    </Button>
                  </Link>
                  <Link to='/profile'>
                    <Button positive animated='vertical'>
                      <Button.Content visible>Profile</Button.Content>
                      <Button.Content hidden>
                        <Icon name='user circle' />
                      </Button.Content>
                    </Button>
                  </Link>
                  <Link to='/logout' onClick={this.logout}>
                    <Button primary animated>
                      <Button.Content visible>Log out</Button.Content>
                      <Button.Content hidden>
                        <Icon name='sign out' />
                      </Button.Content>
                    </Button>
                  </Link>
                  </div>
                  :
                  <div className = 'signDiv'>
                  <Link to='/signup'>
                    <Button primary animated='vertical'>
                      <Button.Content visible>Sign up</Button.Content>
                      <Button.Content hidden>
                        <Icon name='play' />
                      </Button.Content>
                    </Button>       
                  </Link>
                  <Link to='/login'>
                    <Button positive animated>
                      <Button.Content visible>Log in</Button.Content>
                      <Button.Content hidden>
                        <Icon name='sign in' />
                      </Button.Content>
                    </Button>
                  </Link>
                  </div>            
                 }
                  <br />
                  <br />
                </div>

            </div>
            
        )
    
}

}



 export default connect(state => ({loggedIn: state}), { addUser, addGenre, logout }) (withRouter(Navbar))
