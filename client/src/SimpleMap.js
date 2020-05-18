import React, {Component} from 'react';
import {Circle, Map, Marker, Popup, TileLayer} from "react-leaflet";
import API from './ExternalApiList';
import axios from 'axios';

class SimpleMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: props.lat,
            lng: props.lng,
            zoom : props.zoom,
            state_data : [],
            state_loc : [],
        }
    }

    index = -1

    componentDidMount() {
        this.updateMap()
        this.getCurrentLoc()

        this.intervalID1 = setInterval(() => {
            console.log("Rendering updated map")
            this.updateMap()
        }, 600000)

        this.intervalID2 = setInterval( () => {
            console.log("Updating current Location")
            this.getCurrentLoc()
        }, 120000)
    }

    UNSAFE_componentWillMount(){
        clearInterval(this.intervalID1)
        clearInterval(this.intervalID2)
    }

    getCurrentLoc = () =>{
        navigator.geolocation.getCurrentPosition(position => {
                this.setState({ lat: position.coords.latitude, lng: position.coords.longitude });
            }, err => console.log(err)
        )
    }

    updateMap = () => {
        axios.get(API.STATES_INFO)
            .then(res => this.setState({state_data : res.data}))

        axios.get(API.STATE_LOC)
            .then(res => this.setState({state_loc : res.data.data}))
    }

    render(){
        return (
            <Map
                center={[this.state.lat, this.state.lng]}
                zoom={this.state.zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={[this.state.lat, this.state.lng]} on>
                    <Popup>
                        Current Location
                    </Popup>

                </Marker>

                <div>
                    {this.state.state_loc.map(elm =>
                        <Circle
                            key = {++this.index}
                            center={[elm.lat, elm.lng]}
                            stroke = {false}
                            fillOpacity={0.7}
                            fillColor="red"
                            radius={5000}>
                            <Popup>
                                Cases = {elm.Total}
                                <br/><i>Source: CDC</i>
                            </Popup>
                        </Circle>)}
                </div>
            </Map>
        );
    }
}

export default SimpleMap;
