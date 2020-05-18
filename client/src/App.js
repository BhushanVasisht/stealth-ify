import React, {Component} from 'react';
import axios from 'axios';
import API from './ExternalApiList';

class App extends Component {

    state = {
        us_data: {}
    }

    componentDidMount() {
        this.getUSCurrent()
        this.intervalID = setInterval( () => {
            console.log("Calling US Current API. Updating the data")
            this.getUSCurrent()
        }, 36000000)
    }

    getUSCurrent = () => {
        axios.get(API.US_CURRENT)
            .then(res => {
                this.setState({us_data : res.data[0]})
            })
    }

    UNSAFE_componentWillMount() {
        clearInterval(this.intervalID)
    }

    render(){
        return (
            <div className="App">
                <h4 align='center'>US Statistics Current</h4>
                <table width= "100%" border="1px" align="center">
                    <tbody>
                        <tr>
                            <th>Positives</th>
                            <th>Recovered</th>
                            <th>Deaths</th>
                        </tr>
                        <tr>
                            <th>{this.state.us_data.positive}</th>
                            <th>{this.state.us_data.recovered}</th>
                            <th>{this.state.us_data.death}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;
