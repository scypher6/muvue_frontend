import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Comment, Container, Segment } from 'semantic-ui-react';

class Review extends Component {

    
    render() {
        console.log("REVIEW", this.props.movie)
        let { content } = this.props.movie;
        let username  = this.props.movie.user?.username
        let timestamp  = this.props.movie?.created_at
        let date = timestamp?.slice(0, 10)
        let time = timestamp?.slice(11, 19)

        return (
            <div>
                <Segment inverted>
                <Comment>
                    <Container textAlign='right'><Icon name='close' className='close'/></Container>
                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                    <Comment.Content>
                        <Comment.Author as='a'> { username } </Comment.Author>
                        <Comment.Metadata>
                        <div><small><em>{ date } at { time }</em></small></div>
                        </Comment.Metadata>
                        <Comment.Text> { content } </Comment.Text>
                    </Comment.Content>
                </Comment>
                </Segment>
                <br />
            </div>
        )
    }
}

export default Review