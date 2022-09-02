import React from 'react';
import $ from 'jquery';

import axios from 'axios';
var host = false;
class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            phone: "",
            cardId: "",

        }

    }
    componentDidMount(){
        let image = document.getElementById('imagesignup')
        let images = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg"]
        setInterval(function () {
          let random = Math.floor(Math.random() * 5)
          image.src = images[random]
        }, 2000)
      
    }
    
    handleChangeUsername(e) {
        this.setState({ username: e.target.value })
    }
    handleChangePassword(e) {
        this.setState({ password: e.target.value })
    }
    // handleChangeRepeatPassword(e) {
    //     this.setState({ password: e.target.value })
    // }
    handleChangePhone(e) {
        this.setState({ phone: e.target.value })
    }
    handleChangeEmail(e) {
        this.setState({ email: e.target.value })
    }
    handleChangeCard(e) {
        this.setState({ cardId: e.target.value })
    }
    // addUser() {
    //     if ($('#host').is(':checked') ) {
    //         axios.post('/api/renting/signup/host', {
    //             username: this.state.username, password: this.state.password, email: this.state.email,
    //             phone: this.state.phone, cardId: this.state.cardId
    //         }).then((data) => {

    //             this.props.changeId(data[0]._id)
    //             this.props.changeView('create');

    //         })

    //     } else {
    //         axios.post('/api/renting/signup/visitor', {
    //             username: this.state.username, password: this.state.password, email: this.state.email,
    //             phone: this.state.phone, cardId: this.state.cardId
    //         }).then((data) => {

    //             this.props.changeId(data[0]._id)
    //             this.props.changeView('search');

    //         })
    //     }

    // }
    addUser() {
        if ($('#host').is(':checked')) {
            axios.post('/api/renting/signup/host', {
                username: this.state.username, password: this.state.password, email: this.state.email,
                phone: this.state.phone, cardId: this.state.cardId
            }).then(({data}) => {
                console.log(data);
                if (data.message === 'already exist') {
                    alert('Host already exist')
                } else {
                    this.props.changeId(data._id)
                    this.props.changeView('create');
                }
            })
        } else {
            axios.post('/api/renting/signup/visitor', {
                username: this.state.username, password: this.state.password, email: this.state.email,
                phone: this.state.phone, cardId: this.state.cardId
            }).then(({data}) => {
                console.log(data);
                if (data.message === 'already exist') {
                    alert('Host already exist')
                } else {
                    this.props.changeId(data._id)
                    this.props.changeView('search');
                }
            })
        }
        this.props.changeIsLogin();
    }

    render() {

        return (
            <div>
<div className="left-side">
<img id="imagesignup" className="image-login" src="./image1.jpg" ></img>
</div>
<div className="right-side">
                <h2>Create an account</h2>
                <div className="input-container">
                    <i className="fa fa-user icon"></i>
                    <input className="input-field" type="text" placeholder="Username" name="usrnm" onChange={this.handleChangeUsername.bind(this)} />
                </div>

                <div className="input-container">
                    <i className="fa fa-envelope icon"></i>
                    <input className="input-field" type="text" placeholder="Email" name="email" onChange={this.handleChangeEmail.bind(this)} />
                </div>
                <div className="input-container">
                    <i className="fa fa-phone icon"></i>
                    <input className="input-field" type="text" placeholder="Phone" name="phone" onChange={this.handleChangePhone.bind(this)} />
                </div>
                <div className="input-container">
                    <i className="fa fa-id-card icon"></i>
                    <input className="input-field" type="text" placeholder="CardId" name="cardId" onChange={this.handleChangeCard.bind(this)} />
                </div>
                <div className="input-container">
                    <i className="fa fa-key icon"></i>
                    <input className="input-field" type="password" placeholder="Password" name="psw" onChange={this.handleChangePassword.bind(this)} />
                </div>
                <div className='checkboxes'>
                    <input type="checkbox" id="host" name="host"
                        />
                    <label htmlFor="host">Host</label>
                </div>
                

                <button type="submit" className="btn" onClick={() => { this.addUser() }} >Register</button>

                </div>
            </div>


        )
    }

}

export default Signup;
