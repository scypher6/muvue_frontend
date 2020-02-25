import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {Card, Image, Icon} from 'semantic-ui-react';

export class MoviePoster extends Component {




    render() {
        let {videoId} = this.props.movie.id
        let {title} = this.props.movie.snippet
   
        return (

            <div>
            <NavLink to={`/watch/${videoId}`} > 
                
                <Card.Group>
                    <Card color='green'>
                        <Image src={`https://i.ytimg.com/vi_webp/${videoId}/movieposter.webp`} alt={title} wrapped ui={false} />
                        <Card.Content extra>
                        <a>
                        <Icon name='thumbs up' />
                            22 Likes
                        </a>
                        <a>
                            &nbsp; 
                        <Icon name='star' />
                        4
                        </a>
                        </Card.Content>
                    </Card>
                </Card.Group>

            </NavLink>
            </div>
        )
    }
}

export default MoviePoster
