import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';


export default class Form extends Component {

    state = {
        name: "",
        username: "",
        email: "",
        password: "",
        isValidEmail: false
    }

    handleChange = (e) =>{
        let {name, value} = e.target
        let validEmailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        let emailValidation = this.state.email.match(validEmailPattern)

        this.setState({
            [name]: value,
            isValidEmail: emailValidation
        })

       
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        this.props.handleSubmit(this.state)
    }

    render() {
        let {name, username, email, password} = this.state
        let {formType} = this.props
        let formTitle = this.props.formName
        
        return (
               <div class='ui divided two column grid'>
                <div className='form column'>
                <form onSubmit = {this.handleSubmit}>
                    <h1>{ formTitle }</h1>
                  
                    {formType === 'signup' 
                     ? 
                     <>
                     <label htmlFor='name'>Name:</label> <br />
                     <input type='text' name='name' value={name} onChange={this.handleChange}/> <br />
                     </>
                     : 
                     <>
                   
                     </>
                    }
                    <label htmlFor='username'>Username:</label> <br />
                    <input type='text' name='username' value={username} onChange={this.handleChange}/> <br />

                    {formType === 'signup' 
                     ? 
                     <>
                     <label htmlFor='email'>Email:</label> <br />
                     <input type='text' name='email' value={email} onChange={this.handleChange} onFocus={this.handleFocus}/>  
                     <span className='emailVal'> &nbsp; { this.state.isValidEmail ? <Icon name='check' /> : <Icon name='cancel' color = 'red' /> }</span> <br />
                     </>
                     : 
                     <>
                   
                     </>
                    }
                    <br />
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
