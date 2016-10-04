import alt from '../alt';
import firebase from 'firebase';

class Actions {


	initSession() {
		return (dispatch) => {
			var firebase = require("firebase");
		    var config = {
  				apiKey: "AIzaSyDLNouRXsPnQJJDw7EUDOWf6GYug15QlVw",
  				authDomain: "codehunt-demo-698b7.firebaseapp.com",
		    	databaseURL: "https://codehunt-demo-698b7.firebaseio.com/",
		    	storageBucket: "481512294216"
		    }
			firebase.initializeApp(config);

			var user;

			firebase.auth().onAuthStateChanged((current) => {
				if (current) {
					user = {
						id: current.uid,
						name: current.displayName,
						avatar: current.photoURL
					}
				} else {
					user = null;
				}
				setTimeout(() => dispatch(user));
			});
		}
	}

	login() {
		return (dispatch) => {
		    var firebase = require("firebase");

		    var provider = new firebase.auth.FacebookAuthProvider();

		    firebase.auth().signInWithPopup(provider).then(function(result) {
			    // facebook access token
			    var token = result.credential.accessToken;
			    // signed in user info
			    var user = {
			    	id: result.user.uid,
			    	name: result.user.displayName,
			    	avatar: result.user.photoURL
			    }

			    firebase.database().ref().child("users").child(result.user.uid).set(user);
			    console.log('Login success!', user);
			    dispatch(user);
		    }).catch(function(error) {
			    // handle errors here
			    var errorCode = error.code;
			    var errorMessage = error.message;

			    //email of the user's account
			    var email = error.email;

			    // firebase.auth.AuthCredential type that was used
			    var credential = error.credential;
			    console.log('Fuck', errorMessage);
			    return;
		    })
		}
	}

	logout() {
		return(dispatch) => {
			var firebase = require("firebase");
			firebase.unauth();
			setTimeout(() => dispatch(null));
		}
	}
}

export default alt.createActions(Actions);