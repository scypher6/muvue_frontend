import React, { Component } from 'react'



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
            <form onSubmit = {this.handleSubmit}>
                <h1>{this.props.formName}</h1>
                <label htmlFor='username'>Username:</label> <br />
                <input type='text' name='username' value={username} onChange={this.handleChange}/> <br />
                <label htmlFor='password'>Password:</label> <br />
                <input type='password' name='password' value={password} onChange={this.handleChange} /> <br />
                <input type='submit' value='submit'/>
            </form>
        )
    }
}
