import React, { Component } from 'react';
import { Icon, Input } from 'semantic-ui-react';
import swal from 'sweetalert';


export default class Form extends Component {

    state = {
        name: "",
        username: "",
        email: "",
        password: "",
        isValidEmail: false,
        isValidName: false,
        isValidUName: false,
        isValidPassword: false
    }

    handleChange = (e) =>{
        let {name, value} = e.target
        let validEmailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        let validateEmail = this.state.email.match(validEmailPattern)
        let validateName = this.state.name.length >= 2;
        let validateUName = this.state.username.length >= 3;
        let validatePass = this.state.password.length > 1;


        this.setState({
            [name]: value,
            isValidEmail: validateEmail,
            isValidName: validateName,
            isValidUName: validateUName,
            isValidPassword: validatePass
        })

       
    }

    handleSubmit = (e) =>{
        e.preventDefault();

        if (this.validInput()){
            e.preventDefault()
            this.props.handleSubmit(this.state)
        }
        else
            return null;
    }

    validInput = () =>{
        let status  = false;
        let { isValidName, isValidUName, isValidEmail, isValidPassword } = this.state
        
        if (!isValidName)
            swal("Invalid Name!", "Name must be at least 4 letters long. Please try again.", "warning")
        else if (!isValidUName)
            swal("Invalid Username!", "Username must be at least 4 letters long. Please try again.", "warning")
        else if (!isValidEmail)
            swal("Invalid Email!", "Email address is invalid. Please try again.", "warning")
        else if (!isValidPassword)
            swal("Invalid Password!", "Password must be at least 3 characters long. Please try again", "warning")
        else
            status = true;

        return status;
    }

    handleFocus = (e) =>{
        console.log(e.target)
      
    }
    render() {
        let {name, username, email, password} = this.state
        let { isValidName, isValidUName, isValidEmail, isValidPassword } = this.state
        let {formType} = this.props
        let formTitle = this.props.formName
        
        return (
               <div class='ui divided two column grid'>
                {/* <div className='form column'> */}
                <div className='form column'>

                <form class='ui inverted form' onSubmit = {this.handleSubmit}>
                    <h1>{ formTitle }</h1>
                  
                    {formType === 'signup' 
                     ? 
                     <>
                     <label htmlFor='name'>Name:</label> <br />
                     <Input size='large' type='text' name='name' value={name} onChange={this.handleChange} onSelect={this.handleChange} /> 
                     &nbsp; { isValidName ? <Icon name='check' /> : <Icon name='cancel' color = 'red' /> }
                     <br />
                     </>
                     : 
                     <>
                   
                     </>
                    }
                    <label htmlFor='username'>Username:</label> <br />
                    <Input size='large' type='text' name='username' value={username} onChange={this.handleChange} onSelect={this.handleChange} /> 
                    &nbsp; { isValidUName ? <Icon name='check' /> : <Icon name='cancel' color = 'red' /> }
                    <br />

                    {formType === 'signup' 
                     ? 
                     <>
                     <label htmlFor='email'>Email:</label> <br />
                     <Input size='large' type='text' name='email' value={email} onChange={this.handleChange} onSelect={this.handleChange} />  
                     <span className='emailVal'> &nbsp; { isValidEmail ? <Icon name='check' /> : <Icon name='cancel' color = 'red' /> }</span> <br />
                     </>
                     : 
                     <>
                   
                     </>
                    }
                    <label htmlFor='password'>Password:</label> <br />
                    <Input size='large' type='password' name='password' value={password} onChange={this.handleChange} onSelect={this.handleChange} /> 
                    &nbsp; { isValidPassword ? <Icon name='check' /> : <Icon name='cancel' color = 'red' /> }
                    <br />
                    <br />
                    <Input type='submit' value='submit'/>
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
