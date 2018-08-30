import React, { Component } from 'react';
import "./auth.css";

class Auth extends Component {

    onChange(e) {
        const user = {...this.props.authState}
        user[e.target.name] = e.target.value
        this.props.setAuthState(user, () => {
            console.log("state", this.props.authState)
        })
    }

    postAuth(route, user) {
        console.log("register called")
        console.log("user?", user)
        return fetch(`http://127.0.0.1:8000/${route}/`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then((response) => {
            console.log('auth', response)
            return response.json()
        })
        .then((responseToken) => {
            console.log('converted token', responseToken.token)
            localStorage.setItem("token", responseToken.token)
            return this.props.setAuthState({
                user: this.props.authState.username,
                token: responseToken.token,
                username: "",
                password: "",
                isAuth: true,
            })
        }).catch((error) => {
          console.log("auth no like you", error)
        })
    }

   login(){
    const user = {
        username: this.props.authState.username,
        password: this.props.authState.password,
    }
    this.postAuth("api-token-auth", user)
    .then( () => {
        console.log("user logged in")
    })
   }

   register(){
       const user = {...this.props.authState}
       this.postAuth("register", user)
       .then( () => {
           console.log("new user created")
           this.setAuthState({showUserForm: false})
       })
   }

    render() {
        const { username, password, register, email, first_name, last_name, street, city, state, zip } = this.props.authState
        return (
        <div>
            {register &&
            <div>
                <input
                type="text"
                placeholder="first_name"
                name="first_name"
                value={first_name}
                onChange={e => this.onChange(e)}
                />
                <input
                type="text"
                placeholder="last_name"
                name="last_name"
                value={last_name}
                onChange={e => this.onChange(e)}
                />
                <input
                type="email"
                placeholder="email"
                name="email"
                value={email}
                onChange={e => this.onChange(e)}
                />
                <input
                type="text"
                placeholder="street"
                name="street"
                value={street}
                onChange={e => this.onChange(e)}
                />
                <input
                type="text"
                placeholder="city"
                name="city"
                value={city}
                onChange={e => this.onChange(e)}
                />
                <input
                type="text"
                placeholder="state"
                name="state"
                value={state}
                onChange={e => this.onChange(e)}
                />
                <input
                type="text"
                placeholder="zip"
                name="zip"
                value={zip}
                onChange={e => this.onChange(e)}
                />
                </div>
        }
        <div>
        <input
            type="text"
            name="username"
            placeholder="username"
            value={username}
            onChange={e => this.onChange(e)}
            />
            <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={e => this.onChange(e)}
            />
        </div>
        <button onClick= {() => register ? this.register() : this.login()}>Submit</button>
        </div>
        )
    }
}
export default Auth