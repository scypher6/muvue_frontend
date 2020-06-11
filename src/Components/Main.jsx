import React, { Component } from 'react';
import MoviesContainer from './MoviesContainer';


export class Main extends Component {





    render() {
    

        

        return (
                
                    <div className='main'>
                       <MoviesContainer scrollRef = { this.props.scrollRef }/>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        {/* <span ref={this.props.scrollRef}></span>  */}
                    </div>
                
        )
    }
}

export default Main
