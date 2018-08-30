import React, { Component } from 'react'
import './App.css';
import Auth from './auth_component'
import Nav from './nav-component'

class App extends Component {

  state = {
    username:  "",
    password: "",
    isAuth: false,
    register: false,
    showUserForm: false,
    email: "",
    first_name: "",
    last_name: "",
    city: "",
    state: "",
    zip: "",
    user: "",
}

setAuthState(authObj) {
  this.setState(authObj)
}

  render() {
    return (
          <div className="App">
          <Nav
          isAuth={this.state.isAuth}
          setAuthState={(obj) => this.setAuthState(obj)}
          />
          <h1 className="App-title">This is Bangazon, Bob Ross Style</h1>
          {this.state.showUserForm ? <Auth
          authState={this.state}
          user={this.state.user}
          setAuthState={(obj) => {
            this.setAuthState(obj)
          }}
          /> : null}
          </div>
    );
  }
}

export default App;
