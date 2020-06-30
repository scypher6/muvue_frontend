import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addUser, deleteUser } from '../Actions/userActions';
import { Grid, Icon, Input } from 'semantic-ui-react';
import swal from 'sweetalert';


export class Settings extends Component {

    state = {
        name: '',
        username: '',
        picture: '',
        password: '',
        email: '',
        defaultPic: true
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
        console.log(e.target)

    }


    handlePic = e => {
        let fileObj = e.target.files[0];
        let imgName = fileObj.name;

        let fileReader = new FileReader();
        fileReader.readAsDataURL(fileObj);
        fileReader.onload = function () {
            let result = fileReader.result;
            let img = document.querySelector('#preview');
            img.setAttribute('src', result);
        }

        console.log("HERE", e.target.title)
    }


    handleSubmit = (e) =>{
        e.preventDefault();
        const user = this.getUser().user
        let theirToken = localStorage.token
        let {name, username, email, picture} = this.state
// console.log('HERE:', username)

        fetch(`http://localhost:3000/users/${user.id}`, {
            method: "PATCH",
            headers: {
                        'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                    name: name,
                    username: username,
                    picture: picture,
                    email: email,
                    token: theirToken
            })
        })
        .then( r => r.json())
        .then(user => {
            this.props.addUser(user)
        })    

    }

    handleDelete = () => {

        swal({
            title: "Are you sure you want to delete your account?",
            text: "Once deleted, you will not be able to recover it!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((stillDelete) => {
            if (stillDelete) {

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

              swal("Sorry to see you go :(", {
                icon: "success",
              });
            } else 
                swal("Phew!", "Wise choice!")
        })
        
    }

    
    render() {
        const foundUser = this.getUser()
        let { name, username, email, picture, defaultPic } = this.state
        // let {usersName, usersUsername} = foundUser?.user
        if(foundUser){
            return (
                <div className='profile'>
                    <h1>My Profile</h1>
                        { defaultPic ? 
                            <Icon.Group size='huge'>
                                <Icon loading size='big' name='circle notch' />
                                <Icon name='user' />
                            </Icon.Group>
                            : 
                            <img id='profilePic' scr='' alt='profile pic' />
                        }         
                    <span><h3>
                        Name: <em>{ foundUser.user.name }</em>
                        <br />
                        Username: <em>{ foundUser.user.username }</em>
                        <br />
                        Email: <em>{ foundUser.user.email }</em>
                    </h3></span>
                    <br />
                    <h2>Update Your profile</h2>
                        <Grid celled inverted>
                          <Grid.Row>
                            <Grid.Column width={11}>
                                <form class="ui inverted form"  onSubmit={this.handleSubmit}>
                                    <div class="field">
                                        <label>Name</label>
                                        <Input size='small' placeholder="Name" name='name'  value={name} onChange={this.handleChange}/>
                                    </div>
                                    <div class="field">
                                        <label>Username</label>
                                        <Input size='small' placeholder="username" name='username' value={username} onChange={this.handleChange}/>
                                    </div>
                                    <div class="field">
                                        <label>Email</label>
                                        <Input size='small' placeholder="email" name='email' value={email} onChange={this.handleChange}/>
                                    </div>
                                    <div class="field">
                                        <label for="img">Select image:</label>
                                        <br />
                                        <Input size='small' type="file" id="fileInput" name='picture' accept="image/*" value={picture} onChange={this.handlePic}/>
                                        <br />
                                        <br />
                                    </div>
                                    
                                    <button type="submit" class="ui button">Submit</button>
                                </form>
                            </Grid.Column>
                            <Grid.Column width={5}>
                            <br />
                            <br />
                            <br />
                                <img id='preview' alt='' height='300' width='300'/>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
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
