import React, { Component } from 'react';
import './App.css';

import * as Pages from './Components';

class App extends Component {
    handleForm = (e) => {
        let name = e.target.name;
        this.setState({ [name]: e.target.value });
    }
    render() {
        return (
            <div className="container">
                <div><h1 className='title'> giteasy </h1></div>
                <Pages.listRepo/>
            </div>
        );
    }
}

export default App;
