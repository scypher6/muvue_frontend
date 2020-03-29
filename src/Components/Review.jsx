import React, { Component } from 'react'
import { Comment } from 'semantic-ui-react';

export default class Review extends Component {

    
    render() {
        console.log(this.props)
        let { content } = this.props.movie;
        let { username } = this.props.userInfo.user
        return (
            <div>
                    <Comment>
                      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                        <Comment.Content>
                            <Comment.Author as='a'>Joe Henderson</Comment.Author>
                            <Comment.Metadata>
                            <div><em>5 days ago</em></div>
                            </Comment.Metadata>
                            <Comment.Text> { content } </Comment.Text>
                        </Comment.Content>
                    </Comment>
                    <br />
            </div>
        )
    }
}
