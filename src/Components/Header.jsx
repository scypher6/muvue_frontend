import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';


export class Header extends Component {
    render() {
        return (
                <NavLink to='/' exact >
                 <div className='header'>
                  <svg viewBox="0 0 960 300">
                    <symbol id="s-text">
                        <text text-anchor="middle" x="50%" y="70%">Muvue</text>                     
                    </symbol>
                    <g class = "g-ants">
                        <use xlinkHref="#s-text" class="text-copy"></use>
                        <use xlinkHref="#s-text" class="text-copy"></use>
                        <use xlinkHref="#s-text" class="text-copy"></use>
                        <use xlinkHref="#s-text" class="text-copy"></use>
                        <use xlinkHref="#s-text" class="text-copy"></use>
                    </g>                        
                  </svg>
                        <span><h2><em>Movies that move you!</em></h2></span>
                    </div>
                </NavLink>
        )
    }
}

export default Header
