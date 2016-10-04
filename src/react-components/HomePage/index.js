import React from 'react';
import ProductList from '../Product/ProductList';
import Firebase from 'firebase';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      productList: []
    }

    var firebase = require("firebase");
    var config = {
      apiKey: "AIzaSyDLNouRXsPnQJJDw7EUDOWf6GYug15QlVw",
      authDomain: "codehunt-demo-698b7.firebaseapp.com",
      databaseURL: "https://codehunt-demo-698b7.firebaseio.com/",
      storageBucket: "481512294216"
    }
    firebase.initializeApp(config);

    var firebaseRef = firebase.database().ref("/products");

    firebaseRef.on('value', (snapshot) => {
      var products = snapshot.val();

      this.setState({
        productList: products
      })
    });
  }

  render() {
    return (
      <section>
        <header>
          <img src="/img/banner.jpeg" width="100%" />
        </header>

        <section>
          <section className="container">
            {
              this.state.productList
              ?
              <ProductList productList={this.state.productList}/>
              :
              null
            }
          </section>
        </section>
      </section>
    );
  }
}

export default HomePage;
