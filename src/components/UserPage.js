import React, { Component } from 'react'
import database, { firebase } from '../firebase/firebase'

class UserInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            changeStatus: '',
        }
    }


    handleChange = (e) => {
        this.setState({ name: e.target.value })
    }

    handleNameChange = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                return database.ref(`users/${user.uid}`).update({
                    name: this.state.name
                })
            }
        })
        this.setState({ changeStatus: 'Done' })
    }

    resetChangeName = () => {
        this.setState({ changeStatus: '' })
    }

    render() {
        return (
            <div>
                Change your name:
                <input type="text" name="userName" onChange={this.handleChange} onFocus={this.resetChangeName} />
                <button onClick={this.handleNameChange}>Ok</button>
                {this.state.changeStatus === 'Done' ? this.state.changeStatus : null}
            </div>
        )
    }
}

export default UserInfo
