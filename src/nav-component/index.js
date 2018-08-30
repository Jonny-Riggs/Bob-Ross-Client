import React, { Component } from 'react'
import './nav.css';


export default class Nav extends Component {

    displayRegister(){
        this.props.setAuthState({
            register: true,
            showUserForm: true,
        })
    }

    displayLogin(){
        this.props.setAuthState({
            register: false,
            showUserForm: true
        })
    }

    render() {
        const isAuth = this.props.isAuth
        return(
            <nav>
                <h3>This is a Nav Bar</h3>
                { isAuth &&
                    <h1>Welcome {this.props.user}</h1>
                }
                <ul>
                    <li>
                        <button onClick = {() => isAuth ? this.logOut() : this.displayLogin()}>
                        Log {isAuth ? "out" : "in"}</button>
                        <button onClick={() => this.displayRegister()}>Register</button>
                    </li>
                </ul>
            </nav>
        )
    }
}