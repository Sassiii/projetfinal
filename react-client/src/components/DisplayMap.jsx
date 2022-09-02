import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React from 'react';
import axios from 'axios';


class DisplayMap extends React.Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         stores: [{ lat: 47.49855629475769, lng: -122.14184416996333 },
    //         { latitude: 47.359423, longitude: -122.021071 },
    //         { latitude: 47.2052192687988, longitude: -121.988426208496 },
    //         { latitude: 47.6307081, longitude: -122.1434325 },
    //         { latitude: 47.3084488, longitude: -122.2140121 },
    //         { latitude: 47.5524695, longitude: -122.0425407 }]
    //     }
    // }
    // displayMarkers() {
    //     return this.state.stores.map((store, index) => {
    //         return <Marker key={index} id={index} position={{
    //             lat: store.latitude,
    //             lng: store.longitude
    //         }}
    //             onClick={() => console.log("You clicked me!")} />
    //     })
    // }



    render() {
       
        return (

            <div>
                <Map google={this.props.google} zoom={14}>

                    <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />

                    <InfoWindow onClose={this.onInfoWindowClose}>
                        {/* <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div> */}
                    </InfoWindow>
                    {/* {this.displayMarkers()} */}
                </Map>
            </div>
        );

    }

}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyBTgWwJMiUmTyoy-EVTy3lHKrcii0IcGvQ'

})(DisplayMap);
// const mapStyles = {
//     width: '100%',
//     height: '100%',
// };
