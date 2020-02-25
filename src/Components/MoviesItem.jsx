import React, { Component } from 'react'

export class MoviesItem extends Component {
    render() {

        let videoId = this.props.videoId
        // let {title} = this.props.movie.snippet
        return (
            <div>
                {/* <h1>{title}</h1> */}
                <iframe width="420" height="315" title='movieContainer'
                    src={`https://www.youtube.com/embed/${videoId}`} allow='encrypted-media' >
                </iframe>
            </div>
        )
    }
}

export default MoviesItem
