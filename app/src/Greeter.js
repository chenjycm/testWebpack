import React, {Component} from 'react'
import config from './config.json'

import './Greeter.scss';

class Greeter extends Component {
    render() {
        return (
            <div className="root">
                {
                    config.greetText
                }
            </div>
        )
    }
}

export default Greeter;
