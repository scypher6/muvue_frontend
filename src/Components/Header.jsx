import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';


export class Header extends Component {
    render() {
        return (
                <NavLink to='/' exact >
                    <div className='header'>
                        <h1>MuVue</h1>
                        <span><h3><em>Movies that move you</em></h3></span>
                    </div>
                </NavLink>
        )
    }
}

export default Header
