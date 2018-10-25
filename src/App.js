import React, { Component } from 'react';
import './App.css';
//https://api.github.com/?access_token=223d78c2f7638d6de3588a13723919ffbd1e2635

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


/*
axios.delete("https://api.github.com/repos/rolandc5/Redux-Mini-Sprint", {headers: { "Authorization": "bearer 223d78c2f7638d6de3588a13723919ffbd1e2635"}})
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });

            <input type='text' placeholder='40 digit access token'/>
*/