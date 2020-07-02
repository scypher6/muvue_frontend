import React, { Component } from 'react';
import { Icon, Comment, Container, Segment } from 'semantic-ui-react';

class Review extends Component {

    state = {
        username: '',
    
    }
    
    handleClose = (e) =>{
        let username  = this.props.movie.user?.username
        this.setState({
            username: username
        })
        this.props.deleteReview(this.props.movie)
    }

    render() {
        console.log("REVIEW", this.props.movie)
        let movie = this.props.movie
        let { content } = movie;
        let username  = movie.user?.username
        let timestamp  = movie?.created_at
        let date = timestamp?.slice(0, 10)
        let time = timestamp?.slice(11, 19)
        let picUrl = movie.user?.picture;
        let hasPic = (picUrl !== null)

        return (
            <div>
                <Segment inverted>
                <Comment>
                    <Container textAlign='right'><Icon name='close' className='close' color='blue' onClick={this.handleClose}/></Container>
                    <Comment.Content>
                        { hasPic ? 
                                <img id='profilePic' src={picUrl} alt='profile pic' width='30px' height='30px'/>
                                :
                                <Icon.Group size='medium'>
                                    <Icon loading size='big' name='circle notch' />
                                    <Icon name='user' />
                                </Icon.Group>
                        }  
                        &nbsp;
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