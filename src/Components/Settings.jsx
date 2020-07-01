import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addUser, deleteUser } from '../Actions/userActions';
import { Grid, Icon, Input } from 'semantic-ui-react';
import swal from 'sweetalert';
import firebase from 'firebase/app';
import 'firebase/storage';


export class Settings extends Component {

    state = {
        name: '',
        username: '',
        picture: '',
        password: '',
        email: '',
        picUrl: '',
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
        let fileName = fileObj.name;

        let fileReader = new FileReader();
        fileReader.readAsDataURL(fileObj);
        fileReader.onload = function () {
            let result = fileReader.result;
            let img = document.querySelector('#preview');
            img.setAttribute('src', result);
        }

    
        let firebaseConfig = {
            apiKey: "AIzaSyA9JDcpEbQ4291Sc7AWeYnoa7sfr4ZIj3g",
            authDomain: "muvue-70e6c.firebaseapp.com",
            databaseURL: "https://muvue-70e6c.firebaseio.com",
            projectId: "muvue-70e6c",
            storageBucket: "muvue-70e6c.appspot.com",
            messagingSenderId: "443959109626",
            appId: "1:443959109626:web:40b23d1ba1a1b31efc6643",
            measurementId: "G-3Y21XEJ3LL"  
          };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        // Create a root reference
        let storageRef = firebase.storage().ref(`/images/${fileName}`);  

        // // Create a reference to the image
        // let imageRef = storageRef.child(fileName);
        // // Create a reference to 'images/fileName'
        // let bucketRef = storageRef.child(fileName);

        let uploadTask = storageRef.put(fileObj);



        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
        }, function(error) {
            // Handle unsuccessful uploads
            console.log("ERROR")
        }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then( (downloadURL) => {
            console.log('File available at', downloadURL);
            
            this.setState({
                defaultPic: false,
                picUrl: downloadURL 
            })
            });
        });


        

    }


    handleSubmit = (e) =>{
        e.preventDefault();
        const user = this.getUser().user
        let theirToken = localStorage.token
        let {name, username, email, picUrl} = this.state
// console.log('HERE:', username)

        fetch(`http://localhost:3000/users/${user.id}`, {
            method: "PATCH",
            headers: {
                        'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                    name: name,
                    username: username,
                    picture: picUrl,
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
        let { name, username, email, defaultPic } = this.state
        // let {usersName, usersUsername} = foundUser?.user
        console.log(foundUser)
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
                            <img id='profilePic' src={this.state.picUrl} alt='profile pic' width='70px' height='70px'/>
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
                                        <Input size='small' type="file" id="fileInput" name='picture' accept="image/*" title=" " onChange={this.handlePic}/>
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
