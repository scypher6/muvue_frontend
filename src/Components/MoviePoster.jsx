import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {Card, Image, Icon} from 'semantic-ui-react';
import { connect } from 'react-redux';

const token = localStorage.token;

export class MoviePoster extends Component {

    getUser = () => {
        const user = this.props.loggedIn.users.user;
   
        if (user)               
            return user
            // user.find( (user) => user.token === token)
        else
            return null
    }


    render() {
        let {videoId} = this.props.movie
        let {title} = this.props.movie
        const foundUser = this.getUser()

        return (

            <div class="five wide column">
             <NavLink to={`/watch/${videoId}`} > 
                
                    <Card color='green'>
                        <Image src={`https://i.ytimg.com/vi_webp/${videoId}/movieposter.webp`} alt={title} wrapped ui={false} />
                        <Card.Content extra>
                        <a>
                        <Icon name='thumbs up' onClick={this.handleLike}/>
                            {foundUser ? foundUser.user.likes : 0} Likes
                        </a>
                        <a>
                            &nbsp; 
                        <Icon name='star' />
                        4
                        </a>
                        </Card.Content>
                    </Card>

             </NavLink>
            </div>
        )
    }
}

export default connect(state => ({loggedIn: state}))(MoviePoster)

