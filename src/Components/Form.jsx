import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';




export default class Form extends Component {

    state = {
        username: "",
        password: ""
    }

    handleChange = (e) =>{
        let {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        this.props.handleSubmit(this.state)
    }

    render() {
        let {username, password} = this.state

        return (
               <div class='ui divided two column grid'>
                <div className='form column'>
                <form onSubmit = {this.handleSubmit}>
                    <h1>{this.props.formName}</h1>
                    <label htmlFor='username'>Username:</label> <br />
                    <input type='text' name='username' value={username} onChange={this.handleChange}/> <br />
                    <label htmlFor='password'>Password:</label> <br />
                    <input type='password' name='password' value={password} onChange={this.handleChange} /> <br />
                    <br />
                    <input type='submit' value='submit'/>
                </form>
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
            </div>
            <div class ='form column'>
                <h1>Why you should sign up </h1>
                <br />
                As a signed user you can:
                <ul>
                    <li>like a movie</li>
                    <li>save your favorite movies</li>
                    <li>view a list of recommended movies</li>
                    <li>have access to 24hr technical support</li>
                    <li>And much more!</li>
                </ul>
            </div>
            </div>
        )
    }
}
