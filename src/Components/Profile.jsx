import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser, deleteUser } from '../Actions/userActions';
import { withRouter } from 'react-router';

const token = localStorage.token;

export class Profile extends Component {
    
    getUser = () => {
        const user = this.props.loggedIn.user;
   
        if (user)               
            return user
            // user.find( (user) => user.token === token)
        else
            return null
    }

    handleDelete = () => {
        const foundUser = this.getUser()

        if (foundUser){
            console.log('user', foundUser.user.id)
            fetch(`http://localhost:3000/users/${foundUser.user.id}`, {
                  method: "DELETE",
                  headers: {
                          "Authorization": `bearer ${token}`
                  }
            })
            .then(r => r.json())
            .then( data => {
                  this.props.deleteUser();
                  this.props.history.push('/');
             })
        }//IF
        
    }

    state = {
        name: '',
        username: '',
        password: ''
    }


    handleChange = (e) => {
        let {name, value} = e.target

        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        const user = this.getUser().user
        let theirToken = localStorage.token
        let {name, username} = this.state
// console.log('HERE:', username)
        fetch(`http://localhost:3000/users/${user.id}`, {
            method: "PATCH",
            headers: {
                        'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                    name: name,
                    username: username,
                    token: theirToken
            })
        })
        .then( r => r.json())
        .then(user => {
            this.props.addUser(user)
        })    

    }

    // likedMovies = () => 


    render() {
        const foundUser = this.getUser()
        let {name, username} = this.state

        // console.log(foundUser)

        if(foundUser) {
            return (
                <div className='profile'> 
                    Welcome {foundUser.user.username}!
                    <br /><br /><br />


                    <br /><br /><br />
                    <h1>Update Your profile</h1>
                        <form class="ui form" onSubmit={this.handleSubmit}>
                            <div class="field">
                                <label>Name</label>
                                <input placeholder="Name" name='name'  value={name} onChange={this.handleChange}/>
                            </div>
                            <div class="field">
                                <label>Username</label>
                                <input placeholder="username" name='username' value={username} onChange={this.handleChange}/>
                            </div>
                            <div class="field">
                                <div class="ui checkbox">
                                <input type="checkbox" class="hidden" readonly="" tabindex="0" />
                                <label>I agree to the Terms and Conditions</label>
                                </div>
                            </div>
                            
                            <button type="submit" class="ui button">Submit</button>
                        </form>
                        <br/>
                    <button name='button' onClick={this.handleDelete}>Delete my account</button>
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
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                </div>
            )
        }
        return null
    }
}

       
export default connect(state => ({loggedIn: state.users}), {addUser, deleteUser} ) (withRouter(Profile))
