import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import Header from './Header';


export class Navbar extends Component {

    state = { activeItem: 'active' }
    
    handleItemClick = (e, { name }) => {
        
        this.setState({ activeItem: name })
        this.handleNav(name)
        
    };

    handleNav = (name) =>{
        name = name.toLowerCase();
// console.log(this.props)
        switch(name){

            default:
                return 
        }
    }
    
    render() {
        const { activeItem } = this.state
        
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
                </div>
            </div>
            
        )
    }
}

export default withRouter(Navbar)
