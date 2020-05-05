import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addUser, deleteUser } from '../Actions/userActions';
import swal from 'sweetalert';


export class Settings extends Component {

    state = {
        name: '',
        username: '',
        password: ''
    }

    getUser = () => {
        const user = this.props.loggedIn.user;
   
        if (user)               
            return user
            // user.find( (user) => user.token === token)
        else
            return null
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

    handleDelete = () => {
        const foundUser = this.getUser()
        let token = localStorage.token

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

    render() {
        const foundUser = this.getUser()
        let {name, username} = this.state
        // let {usersName, usersUsername} = foundUser?.user
        if(foundUser){
            return (
                <div className='profile'>
                    <h1>Settings</h1>
                    <h4>
                        Name: <em>{ foundUser.user.name }</em>
                        <br />
                        Username: <em>{ foundUser.user.username }</em>
                    </h4>
                    <h1>Update Your profile</h1>

                        <form class="ui inverted form"  onSubmit={this.handleSubmit}>
                            <div class="field">
                                <label>Name</label>
                                <input placeholder="Name" name='name'  value={name} onChange={this.handleChange}/>
                            </div>
                            <div class="field">
                                <label>Username</label>
                                <input placeholder="username" name='username' value={username} onChange={this.handleChange}/>
                            </div>
                            
                            <button type="submit" class="ui button">Submit</button>
                        </form>
                        <br/>
                    <button name='button' onClick={this.handleDelete}>Delete my account</button>
                    <br />
                <br />
                <br />
                </div>
            )
        }
        else
            return null
    }
}

export default connect(state => ({loggedIn: state.users}), { addUser, deleteUser })(Settings);
