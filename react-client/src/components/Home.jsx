import React from 'react';
import axios from 'axios';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    componentDidMount() {

        document.getElementById('video').play();

    }


    render() {
        console.log(React.version);
        return (

            <div className="home">

                <div className="home-img">

                    {/* <video src="home.mp4" muted loop autoplay></video> */}
                    <video id="video" autoPlay muted loop controls="controls">
                        <source src="home.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="overlay"></div>
                <div className="text">
                    <h1> New Way of accomodation</h1>
                    <h2>is waiting for you!</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae quaerat illo sequi incidunt sit modi consectetur perferendis, aspernatur cumque vero dolorem molestias sed veniam, debitis nesciunt harum ex exercitationem libero.</p>
                    <div className="persons">

                        <div className="card-person">
                            <img src="hana.jpg"></img>
                            <div>
                                <h6>Hana Jarraya</h6>
                                <b>hanaa@gmail.com</b>
                            </div>
                        </div>
                        <div className="card-person">
                            <img src="raoui.jfif"></img>
                            <div>
                                <h6>Raoui</h6>
                                <b>raoui@gmail.com</b>
                            </div>
                        </div>
                        <div className="card-person">
                            <img src="majdi.jpg"></img>
                            <div>
                                <h6>Majdi</h6>
                                <b>majdi@gmail.com</b>
                            </div>
                        </div>
                        <div className="card-person">
                            <img src="nidhal.jpg"></img>
                            <div>
                                <h6>Nidhal</h6>
                                <b>nidhal@gmail.com</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }

}

export default Home;
